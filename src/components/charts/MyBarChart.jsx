import { useState, useEffect } from 'react'
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts'
import dayjs from 'dayjs'
import MyDatePicker from '../ui/MyDatePicker'
import budgetsService from '../../services/budgets'

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
      const budgetRes = await budgetsService.getBudgetByMonth(date.startDate.split('-')[0], date.startDate.split('-')[1])
      if (budgetRes.status === 200) {
        if (budgetRes.data != null) {
          setData(budgetRes.data.categories.map(budget => (
            {
              name: budget.categoryName.charAt(0) + budget.categoryName.slice(1).toLowerCase(),
              spent: budget.spentAmount || 0,
              limit: budget.limitAmount || 0
            }
          )))
        }
      }
    } catch (err) {
      console.log('fail to get data by categories', err)
    }
  }

  const CustomeTooltip = ({active, payload}) => {
    if (active && payload && payload.length) {
      const { name, spent, limit } = payload[0].payload
      return (
        <div className='bg-white/80 backdrop-blur-md p-4 border border-gray-50 shadow-sm rounded-xl text-sm'>
          <p className='pb-1 font-bold text-gray-600 flex items-center gap-2'>{name}</p>
          <div className='flex items-center gap-2 text-gray-500'>
            <span className='w-2 h-2 rounded-full' style={{ backgroundColor: '#A8E6CF'}}></span>
            budget: € {limit.toFixed(2)}
          </div>
          <div className='flex items-center gap-2 text-gray-500'>
            <span className='w-2 h-2 rounded-full' style={{ backgroundColor: '#B39DDB'}}></span>
            spent: € {spent.toFixed(2)}
          </div>
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
              <Bar dataKey="limit" fill="#A8E6CF" radius={[4, 4, 0, 0]} name='Budgets'/>
              <Bar dataKey="spent" fill="#B39DDB" radius={[4, 4, 0, 0]} name="Expenses" />
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