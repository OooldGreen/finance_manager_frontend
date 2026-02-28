import { useState, useEffect } from 'react'
import { Cell, Pie, PieChart, Tooltip, Legend } from 'recharts'
import { ConfigProvider, Select, Segmented } from 'antd'
import dayjs from 'dayjs'
import MyDatePicker from '../ui/MyDatePicker'
import dashboardService from '../../services/dashboard'

// 切换年月要自动chong x重新请求
// 没有请求时候的显示
// 怎么把饼图的指示优化一下

const ExpensePieChart = ({ defaultIndex }) => {
  const [dateType, setDateType] = useState('month')
  const [type, setType] = useState('EXPENSE')
  const [date, setDate] = useState({
    startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD')
  })
  const [data, setData] = useState([])

  const onDatePickerChange = (date) => {
    let startDate, endDate
    
    if (dateType === 'year') {
      startDate = dayjs(date).startOf('year').format('YYYY-MM-DD')
      endDate = dayjs(date).endOf('year').format('YYYY-MM-DD')
    } else if (dateType === 'month') {
      startDate = dayjs(date).startOf('month').format('YYYY-MM-DD') 
      endDate = dayjs(date).endOf('month').format('YYYY-MM-DD')
    } else {
      startDate = null
      endDate = null
    }
    setDate({ startDate, endDate }) 
  }

  useEffect(() => {
    getData()
    console.log(data)
  }, [date.startDate, date.endDate, type, dateType])

  const getData = async () => {
    try {
      const response = await dashboardService.getDataByCat(type, date.startDate, date.endDate)
      if (response.status === 200) {
        if (response.data.length > 0) {
          const data = response.data.map(i => ({
            name: i.name.charAt(0) + i.name.slice(1).toLowerCase(),
            value: Math.abs(i.value)
          }))
          setData(data)
        } 
      }
    } catch (err) {
      console.log('fail to get data by categories', err)
    }
  }

  const getColor = (name) => {
    const colorMap = {
      'Food_drink': '#A8E6CF', 
      'Shopping': '#FFD3B6',
      'Transport': '#B39DDB',
      'Daily': '#FFF176',
      'Rent': '#FF8A80',
      'Social': '#81D4FA', 
      'Subscription': '#DCE775',
      'Salary': '#4DB6AC',
      'Investment': '#FFB74D',
      'Sideline': '#F06292'
    }
    return colorMap[name] || '#CFD8DC'
  }
  
  return (
    <div className="p-4 bg-white border border-gray-200 shadow-2xs rounded-xl">
      <div className='flex items-center justify-between p-4 text-gray-700'>
        {/* select */}
        <div className="relative inline-block text-sm">
          <ConfigProvider theme={{
            components: {
              Select: {
                optionSelectedBg: '#eff6ff',
                optionSelectedColor: '#2563eb',
                colorPrimary: '#2563eb'
              }
            }
          }}>
            <Select 
              className="rounded-lg border-gray-200"
              style={{ width: '120px' }}
              options={[
                { value: 'month', label: 'month' },
                { value: 'year', label: 'year' },
                { value: 'total', label: 'total' }
              ]}
              defaultValue={'month'}
              onChange={value => setDateType(value)}> 
            </Select>
          </ConfigProvider>
        </div>

        {/* date picker */}
        <div>
          {dateType === 'month' && <MyDatePicker mode='month' onChange={onDatePickerChange}/>}
          {dateType === 'year' && <MyDatePicker mode='year' onChange={onDatePickerChange}/>}
        </div>
      </div>

      <div className='w-full h-[450px]'>
        {/* expense chart  */}
        {data && data.length >= 0 ? (
          <div>
            {type === 'EXPENSE' && <PieChart 
              style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1, boxShadow: '5px' }}
              responsive
              key="data.length"
            >
              <Pie
                data={data}
                nameKey='name'
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius="60%"
                label={({ name, percent }) => {
                  const shortName = name.length > 4 ? `${name.slice(0, 4)}...` : name
                  return `${shortName}: ${(percent * 100).toFixed(0)}%`
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={getColor(entry.name)} />
                ))}
              </Pie>
              <Legend  layout='horizontal' verticalAlign='bottom' align='center' formatter={(value) => <span>{value}</span> } />
            </PieChart>}

            {/* income chart */}
            {type === 'INCOME' && <PieChart 
              style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
              responsive
              key='data.length'
            >
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius="60%"
                label={({ name, percent }) => {
                  const shortName = name.length > 4 ? `${name.slice(0, 4)}...` : name
                  return `${shortName}: ${(percent * 100).toFixed(0)}%`
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={getColor(entry.name)} />
                ))} 
              </Pie>
              <Legend  layout='horizontal' verticalAlign='bottom' align='center' formatter={(value) => <span>{value}</span> } />
            </PieChart>}
          </div>
        ) : (<div>loading...</div>)}
      </div>

      <div className='text-center justify-center m-4'>
        <Segmented 
          size='small'
          shape='round'
          options={[{value: 'EXPENSE', label: 'Exp'}, {value: 'INCOME', label: 'Inc'}]}
          value={type}
          onChange={(value) => {setType(value)}}>
        </Segmented>
      </div>
    </div>
  )
}
export default ExpensePieChart