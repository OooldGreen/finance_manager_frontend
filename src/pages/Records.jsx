import { useState, useContext } from "react"
import { toast } from 'react-hot-toast'
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "../components/ui/Icon"
import RecordList from "../components/forms/RecordList"
import RecordForm from "../components/forms/RecordForm"
import recordsService from '../services/records'
import RecordContext from "../components/context/RecordContext"
import { RecordProvider } from "../components/context/RecordContext"

const Records = () => {
  return (
    <RecordProvider>
      <RecordsContent/>
    </RecordProvider>
  )
}

export default Records

const RecordsContent = () => {
  const { query, setQuery, getRecords, loading, monthlyBalance } = useContext(RecordContext)
  
  const [showRecordForm, setShowRecordForm] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showModifyForm, setShowrModifyForm] = useState(false)

  const handleDelete = async (id) => {
    try {
      const response = await recordsService.deleteRecord(id)
      if (response.status == 204) {
        setShowConfirmDelete(!showConfirmDelete)
        toast.success('Record deleted.')
        getRecords()
      }
    } catch {
      toast.error('Fail to delete record')
    }
  }

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const formatMonth = () => monthNames[query.month - 1]

  if(loading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 gap-6 pt-8 md:pt-12 mx-6 md:mx-20">
        <div className="flex flex-col bg-white bg-card rounded-xl">
          {/* header */}
          <div className="p-4 relative z-10 bg-card rounded-xl md:p-10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground">Monthly Balance</h3>
                <div className="mt-3">
                  <span className="text-4xl font-bold text-foreground">{monthlyBalance.total > 0 ? `€${Math.abs(monthlyBalance.total)}` : `-€${Math.abs(monthlyBalance.total)}`}</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 ">
                <div className="font-bold">{formatMonth()}, {query.year}</div>
                <ChevronLeftIcon 
                  onClick={() => setQuery(prev => ({...prev, month: prev.month <= 1 ? 12 : prev.month - 1, year: prev.month <= 1 ? prev.year - 1 : prev.year}))} 
                  className="size-6 p-1 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full"/>
                <ChevronRightIcon 
                  onClick={() => setQuery(prev => ({...prev, month: prev.month >= 12 ? 1 : prev.month + 1, year: prev.month >= 12 ? prev.year + 1 : prev.year}))}
                  className="size-6 p-1 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full"/>
              </div>
            </div>

            {/* income and expense */}
            <div className="mt-7 grid grid-cols-2 gap-4 sm:gap-6 md:gap-4 lg:gap-12">
              <div className="flex gap-4">
                <div className="grow">
                  <p className="text-gray-600 dark:text-neutral-400">
                    <span className="mr-4">Income</span> 
                    <span className="text-emerald-600">€{monthlyBalance.income}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="grow">
                  <p className="text-gray-600 dark:text-neutral-400">
                    <span className="mr-4">Expense</span>
                    <span className="text-rose-600">-€{Math.abs(monthlyBalance.expense)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RecordList 
          handleDelete={handleDelete}
          showConfirmDelete={showConfirmDelete}
          setShowConfirmDelete={setShowConfirmDelete}
          showModifyForm={showModifyForm}
          setShowrModifyForm={() => setShowrModifyForm(!showModifyForm)}
        />
      </div>

      <button type="button" onClick={() => setShowRecordForm(!showRecordForm)} className="fixed bottom-10 right-8 size-11 md:bottom-15 md:right-15 py-3 px-4 z-50 flex justify-center items-center md:size-13 text-sm font-medium rounded-full bg-blue-600 hover:bg-blue-700">
        <PlusIcon className="shrink-0 size-6 text-white"/>
      </button>

      {showRecordForm && 
        <RecordForm 
          showRecordForm={showRecordForm}
          setShowRecordForm={setShowRecordForm}
          mode="create"
          recordId="-1"
        />
      }
    </div>
  )
}