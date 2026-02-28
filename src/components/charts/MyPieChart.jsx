import { useState, useEffect } from 'react'
import { Cell, Pie, PieChart, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ConfigProvider, Select, Segmented } from 'antd'
import dayjs from 'dayjs'
import MyDatePicker from '../ui/MyDatePicker'
import dashboardService from '../../services/dashboard'

const MyPieChart = () => {
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

  const handleTypeChange = (type) => {
    setDateType(type)
    onDatePickerChange(dayjs())
  }

  useEffect(() => {
    getData()
  }, [date.startDate, date.endDate, type, dateType])

  const getData = async () => {
    setData([])
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

  const CustomeTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload
      const totalAmount = data.reduce((sum, item) => sum + item.value, 0)
      const percent = totalAmount > 0 ? (value / totalAmount) : 0
      console.log(payload)
      return (
        <div className='bg-white/80 backdrop-blur-md p-4 border border-gray-50 shadow-sm rounded-xl '>
          <p className='text-sm font-bold text-gray-600 flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full' style={{ backgroundColor: payload[0].payload.fill}}></span>
            {name}: {(percent * 100).toFixed(1)}%, € {value.toFixed(2)} 
          </p>
        </div>
      )
    }
    return null
  }
  
  return (
    <div className="p-4 bg-white border border-gray-200 shadow-2xs rounded-xl w-full h-[600px]">
      <div className='flex items-center justify-between p-4 text-gray-700 w-full'>
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
              onChange={(value) => handleTypeChange(value)}> 
            </Select>
          </ConfigProvider>
        </div>

        {/* date picker */}
        <div>
          {dateType === 'month' && <MyDatePicker mode='month' onChange={onDatePickerChange}/>}
          {dateType === 'year' && <MyDatePicker mode='year' onChange={onDatePickerChange}/>}
        </div>
      </div>

      {/* pie chart  */}
      <div className='w-full '>
        {(data && data.length > 0) && (
          <ResponsiveContainer width="100%" height={450}>
            <PieChart key={data.length}>
              {/* expense chart */}
              {type === 'EXPENSE' && 
                <Pie
                  data={data}
                  nameKey='name'
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius="60%"
                  label={({ _, percent }) => {
                    return `${(percent * 100).toFixed(0)}%`
                  }}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={getColor(entry.name)} />
                  ))}
                </Pie>
              }

              {/* income chart */}
              {type === 'INCOME' && <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius="60%"
                label={({ _, percent }) => {
                  return `${(percent * 100).toFixed(0)}%`
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={getColor(entry.name)} />
                ))} 
              </Pie>
              }
              
              <Tooltip cursor={false} content={<CustomeTooltip />}></Tooltip>
              <Legend  layout='horizontal' verticalAlign='bottom' align='center' formatter={(value) => <span>{value}</span> } />
            </PieChart>
          </ResponsiveContainer>
        )}
        {(!data || data.length === 0) && (
            <div className='w-full h-[450px] relative justify-center items-center'>
              <div className="w-65 h-65 rounded-full bg-gray-50 flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="text-gray-400 font-medium">No data yet...</span>
              </div>
            </div>
          )}
      </div>

      {/* exp / inc */}
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
export default MyPieChart