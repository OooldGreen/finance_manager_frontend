import { useState, useEffect } from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import { ConfigProvider, Select, Segmented } from 'antd'
import dayjs from 'dayjs'
import MyDatePicker from '../ui/MyDatePicker'
import dashboardService from '../../services/dashboard'

const ExpensePieChart = ({ defaultIndex }) => {
  const [dateType, setDateType] = useState('month')
  const [type, setType] = useState('EXPENSE')
  const [date, setDate] = useState({
    startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD')
  })
  const [data, setData] = useState([])
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const income = [
    { name: 'Salary', value: 600 },
    { name: 'investment', value: 200 },
  ]

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
  }, [date.startDate, date.endDate, type])

  const getData = async () => {
    try {
      const response = await dashboardService.getDataByCat(type, date.startDate, date.endDate)
      const data = response.data.map(i => ({
        name: i.name.charAt(0) + i.name.slice(1).toLowerCase(),
        value: Math.abs(i.value)
      }))
      if (response.status === 200) {
        setData(data)
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

      <div className='w-full h-[400px]'>
        {/* expense chart  */}
        {data && data.length >= 0 ? (
          <div>
            {type === 'EXPENSE' && <PieChart 
              style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
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
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={getColor(entry.name)} />
                ))}
              </Pie>
              <Tooltip defaultIndex={defaultIndex} />
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
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={getColor(entry.name)} />
                ))} 
              </Pie>
              <Tooltip defaultIndex={defaultIndex} />
            </PieChart>}
          </div>
        ) : (<div>loading...</div>)}
      </div>

      <div className='w-full text-center justify-center m-4 mb-8'>
        <Segmented 
          size='small'
          shape='round'
          options={[{value: 'EXPENSE', label: 'Exp'}, {value: 'INCOME', label: 'Inc'}]}
          value={type}
          onChange={(value) => {setType(value)}}>
        </Segmented>
      </div>

      chart 1 收入支出 分类饼图（月度，年度，总），按月度筛选/按年度筛选
    </div>
  )
}
export default ExpensePieChart