import { createContext, useState, useEffect } from "react"
import { toast } from 'react-hot-toast'
import recordsService from "../../services/records"

const RecordContext = createContext()

export const RecordProvider = ({children}) => {
  const [query, setQuery] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    page: 0,
    size: 10,
    sort: { key: 'ticketCompletionDate', direction: 'DESC'}
  })

  const [records, setRecords] = useState(null)
  const [monthlyBalance, setMonthlyBalance] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  const getRecords = async () => {
    try {
      const params = {
        year: query.year,
        month: query.month,
        page: query.page,
        size: query.size,
        sort: query.sort.key ? `${query.sort.key},${query.sort.direction}` : ''
      }
      const recordsResponse = await recordsService.getRecords(params) 
      const data = recordsResponse.data.content.map(record => {
        return ({
            ...record,
            amount: record.transactionType === 'EXPENSE' ? '-€' + Math.abs(record.amount).toFixed(2) : '€' + Math.abs(record.amount).toFixed(2),
            ticketCompletionDate: record.ticketCompletionDate ? record.ticketCompletionDate.split('T')[0] : ''
        })})

      if (recordsResponse.status === 200) {
        setRecords(data)
        setTotalPages(recordsResponse.data.totalPages)
      }
    } catch (err) {
      console.log('Fail to get records', err)
    }
  }

  const getMonthlyBalance = async () => {
    try {
      const monthlyBalanceReponse = await recordsService.getMonthlyBalance()
      if (monthlyBalanceReponse.status === 200) {
        setMonthlyBalance(monthlyBalanceReponse.data)
      }
    } catch (err) {
      console.log('Fail to get monthly total balance', err)
    }
  }

  const onSuccess = (mode) => {
    toast.success(mode === 'create' ? 'Create record success.' : 'Update record success')
    getRecords()
  }

  const formatAdapteur = (s) => (
    s.charAt(0) + s.slice(1).toLowerCase()
  )

  useEffect(() => {
    getData()
  }, [query])

  const getData = async () => {
    try {
      await Promise.all([
        getRecords(),
        getMonthlyBalance()
      ])
      setLoading(false)
    } catch {
      toast.error('Fail to initial data')
    }
  }

  return (
    <RecordContext.Provider value={{ query, setQuery, records, monthlyBalance, totalPages, onSuccess, formatAdapteur, loading, setLoading, getRecords, getMonthlyBalance }}>
      {!loading && children}
    </RecordContext.Provider>
  )
}

export default RecordContext
