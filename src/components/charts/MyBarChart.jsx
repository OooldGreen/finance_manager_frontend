import { useState, useEffect } from 'react'
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts'
import dayjs from 'dayjs'
import MyDatePicker from '../ui/MyDatePicker'
import dashboardService from '../../services/dashboard'

const MyBarChart = () => {
  const [date, setDate] = useState({
    startDate: dayjs().startOf('month').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DD')
  })
  const [data, setData] = useState([])

  const onDatePickerChange = (date) => {
    setDate({ 
      startDate: dayjs(date).startOf('month').format('YYYY-MM-DD'), 
      endDate: dayjs(date).endOf('month').format('YYYY-MM-DD')
    }) 
  }

  useEffect(() => {
    getData()
  }, [date.startDate, date.endDate])

  const getData = async () => {
    setData([])
    try {
      const response = await dashboardService.getDataByCat('EXPENSE', date.startDate, date.endDate)
      if (response.status === 200) {
        if (response.data.length > 0) {
          const data = response.data.map(i => ({
            name: i.name.charAt(0) + i.name.slice(1).toLowerCase(),
            value: Math.abs(i.value)
          }))
          console.log(data)
          setData(data)
        } 
      }
    } catch (err) {
      console.log('fail to get data by categories', err)
    }
  }

  const CustomeTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload
      console.log(payload)
      return (
        <div className='bg-white/80 backdrop-blur-md p-4 border border-gray-50 shadow-sm rounded-xl '>
          <p className='text-sm font-bold text-gray-600 flex items-center gap-2'>
            {name}: € {value.toFixed(2)} 
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <div className="p-4 bg-white border border-gray-200 shadow-2xs rounded-xl w-full h-[600px]">
        {/* date picker */}
        <div className='flex justify-end p-4'><MyDatePicker mode='month' onChange={onDatePickerChange}/></div>
        <div className='w-full p-4'>
          <ResponsiveContainer width="100%" height={480}>
            <BarChart key={data.length} data={data} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" label={{ value: 'Categories', position: 'insideBottom' }} axisLine={{ stroke: '#E5E7EB' }} height={85} interval={0} tick={{ fontSize: 12, fill: '#9CA3AF', angle: -45, textAnchor: 'end' }}/>
              <YAxis label={{ value: 'Amount (€)', angle: -90, position: 'insideLeft' }} axisLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <Bar dataKey="value" fill="#9caae8ff" radius={[4, 4, 0, 0]} name="Expenses" />
              {/* <Bar dataKey="income" nameKey='name' fill="#82ca9d"/> */}
              <Tooltip content={<CustomeTooltip />} cursor={{ fill: '#f3f4f6', opacity: 0.5 }}/>
              <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px'}} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default MyBarChart