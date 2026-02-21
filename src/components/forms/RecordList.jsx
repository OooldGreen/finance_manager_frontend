import { useState, useContext} from "react"
import { toast } from 'react-hot-toast'
import RecordContext from '../../components/context/RecordContext'
import RecordForm from '../forms/RecordForm'
import { SortIcon } from "../ui/Icon"
import recordsService from "../../services/records"
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal"

const RecordList = ({ handleDelete, showConfirmDelete, setShowConfirmDelete, showModifyForm, setShowrModifyForm }) => {
  const { query, setQuery, totalPages, records, getRecords, formatAdapteur } = useContext(RecordContext)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedIds, setSelectedIds] = useState([])
  const [showConfirmBatchDelete, setShowConfirmBatchDelete] = useState(false)

  const handleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const handleBatchDelete = async () => {
    if (selectedIds.length === 0) return
    try {
      const response = await recordsService.deleteRecords(selectedIds)
      if (response.status === 204) {
        toast.success('Delete records success.')
        setSelectedIds([])
        getRecords()
        setShowConfirmBatchDelete(!showConfirmBatchDelete)
      }
    } catch {
      setShowConfirmBatchDelete(!showConfirmBatchDelete)
      toast.error('Fail to delete records')
    }
  }

  const handlePageChange = (newPage) => {
    console.log('pagechange', totalPages, query)
    if (newPage >= 0 && newPage < totalPages) {
      setQuery({
        ...query,
        page: newPage
      })
    }
  }

  const handleSort = (key) => {
    setQuery(query => {
      let nextDirection = 'ASC'
      let nextKey = key;
      if (query.sort.key === key) {
        if (query.sort.direction === 'ASC') {
          nextDirection = 'DESC'
        } else {
          nextKey = 'ticketCompletionDate'
          nextDirection = 'DESC'
        }
      }

      return {
        ...query,
        page: 0,
        sort: {
          key: nextKey,
          direction: nextDirection
        }
      }
    })
  }

  return (
    <div className="min-w-full px-8 rounded-xl block bg-white bg-layer focus:outline-hidden divide-y divide-gray-200 dark:divide-neutral-800">
      <div className="py-5 overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb">
        <table className="min-w-full divide-y divide-table-line divide-gray-200">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th scope="col" className="px-6 py-3 text-start font-medium text-muted-foreground-1"></th>
              <th scope="col">
                <div onClick={() => handleSort('title')} className="my-2 mx-2 px-4 py-2 inline-flex items-center border border-transparent text-sm rounded-md hover:border-gray-200 dark:text-neutral-500 dark:hover:border-neutral-700">
                  Title <SortIcon/>
                </div>
              </th>
              <th scope="col">
                <div onClick={() => handleSort('amount')} className="my-2 mx-2 px-4 py-2 inline-flex items-center border border-transparent text-sm rounded-md hover:border-gray-200 dark:text-neutral-500 dark:hover:border-neutral-700">
                  Amount
                  <SortIcon/>
                </div>
              </th>
              <th scope="col">
                <div onClick={() => handleSort('transactionCategory')} className="my-2 mx-2 px-4 py-2 inline-flex items-center border border-transparent text-sm rounded-md hover:border-gray-200 dark:text-neutral-500 dark:hover:border-neutral-700">
                  Category
                  <SortIcon/>
                </div>
              </th>
              <th scope="col">
                <div onClick={() => handleSort('ticketCompletionDate')} className="my-2 mx-2 px-4 py-2 inline-flex items-center border border-transparent text-sm rounded-md hover:border-gray-200 dark:text-neutral-500 dark:hover:border-neutral-700">
                  Date
                  <SortIcon/>
                </div>
              </th>
              <th scope="col">
                <div onClick={() => handleSort('description')} className="my-2 mx-2 px-4 py-2 inline-flex items-center border border-transparent text-sm rounded-md hover:border-gray-200 dark:text-neutral-500 dark:hover:border-neutral-700">
                  Description
                  <SortIcon/>
                </div>
              </th>
              <th scope="col">
                <div onClick={() => handleSort('transactionStatus')} className="my-2 mx-2 px-4 py-2 inline-flex items-center border border-transparent text-sm rounded-md hover:border-gray-200 dark:text-neutral-500 dark:hover:border-neutral-700">
                  Status
                  <SortIcon/>
                </div>
              </th>
              <th scope="col">
                <div onClick={() => handleSort('account.id')} className="my-2 mx-2 px-4 py-2 inline-flex items-center border border-transparent text-sm rounded-md hover:border-gray-200 dark:text-neutral-500 dark:hover:border-neutral-700">
                  Account
                  <SortIcon/>
                </div>
              </th>
              <th scope="col">
                <div className="my-2 mx-2 px-4 py-2 inline-flex items-center border border-transparent text-sm rounded-md hover:border-gray-200 dark:text-neutral-500 dark:hover:border-neutral-700">
                  Action
                  <SortIcon/>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {records.map(record => (
              <tr 
                className="hover:bg-gray-50"
                key={record.id}
                onClick={() => {
                  setSelectedId(record.id)
                  setShowrModifyForm(!showModifyForm)
                }} 
              >
                {/* checkbox */}
                <th scope="col" className="py-3 px-4 pe-0">
                  <div className="flex items-center h-5">
                    <input 
                      id="hs-table-search-checkbox-all"
                      type="checkbox"
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => handleSelect(record.id)}
                      checked={selectedIds.includes(record.id)}
                      className={`shrink-0 size-4 bg-transparent border-line-3 rounded-sm shadow-2xs text-white checked:bg-rose-600 focus:ring-0 focus:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none`} />
                  </div>
                </th>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{record.title}</td>
                <td className={`${record.transactionType === 'EXPENSE' ? 'text-rose-600' : 'text-emerald-600'} px-6 py-4 whitespace-nowrap text-sm text-foreground`}>{record.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{formatAdapteur(record.transactionCategory)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{record.ticketCompletionDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-foreground text-sm font-medium">{record.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-foreground text-sm font-medium">
                  <div className={`${record.transactionStatus === 'COMPLETED' ? 'bg-emerald-100 text-teal-700' : record.transactionStatus === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'text-slate-500 bg-slate-100'} p-2 rounded-md text-center`}>{formatAdapteur(record.transactionStatus)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-foreground text-sm font-medium">{record.accountName}</td>
                <td className="text-center">
                  <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowConfirmDelete(!showConfirmDelete)
                        setSelectedId(record.id)
                      }} 
                      className="py-4 px-5 inline-flex items-center gap-x-2 text-sm font-sm rounded-md border border-transparent text-blue-600  hover:text-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* paginate */}
      <div className="flex py-5 text-gray-400">
        <div className="flex w-full">
          {selectedIds.length > 0 && 
            <div className="flex">
              <button onClick={() => setShowConfirmBatchDelete(!showConfirmBatchDelete)} className="flex mx-2 justify-center items-center rounded-md bg-rose-600 px-3 py-1.5 text-sm/6 text-white font-semibold shadow-xs hover:bg-rose-700">Delete Selected</button>
              <button onClick={() => setSelectedIds([])} className="flex mx-2 justify-center items-center rounded-md text-gray-500 border border-gray-100 px-3 py-1.5 text-sm/6 font-semibold shadow-xs hover:bg-gray-100">Deselect</button>
            </div>
          }
        </div>
        <nav className="flex w-full justify-end items-center space-x-1" aria-label="Pagination">
          <button type="button" onClick={() => handlePageChange(query.page - 1)} className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-foreground hover:text-blue-600 focus:outline-hidden rounded-full disabled:opacity-50 disabled:pointer-events-none" aria-label="Previous">
            <span aria-hidden="true">«</span>
            <span className="sr-only">Previous</span>
          </button>

          { Array.from({ length: totalPages }, (_, i) => i).map(index => (
            <button 
              type="button"
              key={index}
              onClick={() => handlePageChange(index)}
              className={`${index === query.page ? 'bg-gray-100 rounded-full' : ''} min-w-10 flex justify-center items-center py-2.5 text-sm text-foreground hover:text-blue-600 focus:outline-hidden focus:bg-muted-focus rounded-full disabled:opacity-50 disabled:pointer-events-none`}
              aria-current="page"
            >{index + 1}</button>
          )) }

          <button type="button" onClick={() => handlePageChange(query.page + 1)} className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-foreground hover:text-blue-600 focus:outline-hidden rounded-full disabled:opacity-50 disabled:pointer-events-none" aria-label="Next">
            <span className="sr-only">Next</span>
            <span aria-hidden="true">»</span>
          </button>
        </nav>
      </div>

      {/* delete record */}
      {showConfirmDelete && (
        <div>
          <ConfirmDeleteModal
            showConfirmDelete={showConfirmDelete}
            setShowConfirmDelete={setShowConfirmDelete}
            message='Determined to delete this record?'
            onConfirm={() => handleDelete(selectedId)}
          />
        </div>
      )}

      {/* delete records */}
      {showConfirmBatchDelete && (
        <div>
          <ConfirmDeleteModal
            showConfirmDelete={showConfirmBatchDelete}
            setShowConfirmDelete={setShowConfirmBatchDelete}
            message='Determined to delete all of these records?'
            onConfirm={() => handleBatchDelete(selectedIds)}
          />
        </div> 
      )}

      {showModifyForm && 
        <RecordForm 
          mode="modify"
          recordId={selectedId} 
          showRecordForm={showModifyForm}
          setShowRecordForm={setShowrModifyForm}
        />
      }
    </div>
  )
} 

export default RecordList