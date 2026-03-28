import { useState, useEffect } from 'react'
import { ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, Bar, Line, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs'
import MyDatePicker from '../ui/MyDatePicker'
import dashboardService from '../../services/dashboard'

const OverviewChart = () => {
  const [date, setDate] = useState({
    startDate: dayjs().startOf('year').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('year').format('YYYY-MM-DD')
  })
  const [data, setData] = useState([])

  const onDatePickerChange = (date) => {
    if (!date) {
      setDate({
        startDate: dayjs().startOf('year').format('YYYY-MM-DD'),
        endDate: dayjs().endOf('year').format('YYYY-MM-DD') 
      })
    } else {
      setDate({ 
        startDate: date[0] ? dayjs(date[0]).startOf('month').format('YYYY-MM-DD') : null, 
        endDate: date[1] ? dayjs(date[1]).endOf('month').format('YYYY-MM-DD') : null
      })
    }
  }

  useEffect(() => {
    getData()
  }, [date.startDate, date.endDate])

  const getData = async () => {
    setData([])
    try {
      const response = await dashboardService.getData(date.startDate, date.endDate)
      if (response.status === 200) {
        if (response.data.length > 0) {
          const data = response.data.map(i => ({
            name: i.name.charAt(0) + i.name.slice(1).toLowerCase(),
            income: Math.abs(i.value1),
            expense: Math.abs(i.value2),
            savingRate: i.value1 > 0 ? parseFloat((i.value1 + i.value2) / i.value1 * 100).toFixed(4) : 0
          }))
          setData(data)
        } 
      }
    } catch (err) {
      console.log('fail to get data by categories', err)
    }
  }

  const CustomeTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
      const { name, expense, income, savingRate } = payload[0].payload
      return (
        <div className='text-sm text-gray-600 bg-white/80 backdrop-blur-md p-4 border border-gray-50 shadow-sm rounded-xl '>
          <p className='font-bold'>{name}</p>
          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full' style={{ backgroundColor: '#A8E6CF'}}></span>
            Income: € {income.toFixed(2)}
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full' style={{ backgroundColor: '#B39DDB'}}></span>
            Expense: -€ {expense.toFixed(2)}
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-2 h-2 rounded-full' style={{ backgroundColor: '#FFB74D'}}></span>
            Saving Rate: {parseFloat(savingRate).toFixed(2)} %
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="p-4 bg-white border border-gray-200 shadow-2xs rounded-xl w-full">
      {/* date picker */}
      <div className='flex justify-end p-4'><MyDatePicker mode='monthRange' onChange={onDatePickerChange}/></div>
      <div>
        <ResponsiveContainer width="100%" height={480}>
          <ComposedChart data={data} barCategoryGap="20%">
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" label={{ value: 'Categories', position: 'insideBottom' }} axisLine={{ stroke: '#E5E7EB' }} height={85} interval={0} tick={{ fontSize: 12, fill: '#9CA3AF', angle: -45, textAnchor: 'end' }}/>
            <YAxis yAxisId="left" orientation='left' label={{ value: 'Amount (€)', angle: -90, position: 'insideLeft' }} axisLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
            <YAxis yAxisId="right" orientation="right" unit="%" domain={[0, 100]} axisLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />

            <Bar dataKey="income" fill="#A8E6CF" radius={[4, 4, 0, 0]} name="Income" maxBarSize={40} yAxisId="left"/>
            <Bar dataKey="expense" fill="#B39DDB" radius={[4, 4, 0, 0]} name="Expenses" maxBarSize={40} yAxisId="left"/>
            <Line type="monotone" dataKey="savingRate" yAxisId='right' stroke="#FFB74D" name="Saving Rate" />

            <Tooltip content={<CustomeTooltip />}/>
            <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px'}}/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default OverviewChart