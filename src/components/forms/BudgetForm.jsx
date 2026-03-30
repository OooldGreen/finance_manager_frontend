import { useEffect, useState } from "react"
import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import { Flex, Progress, Tooltip } from 'antd'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import MyDatePicker from "../ui/MyDatePicker"
import { ArcIcon, CreditCardIcon } from "../ui/Icon"
import { CloseButton } from "../ui/Button"
import recordsService from "../../services/records"
import budgetsService from "../../services/budgets"
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal"

const BudgetForm = ({ setShowBudgetForm, showBudgetForm }) => {
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [noBudget, setNoBudget] = useState(true)
  const [categories, setCategories] = useState([])
  const [showBudgetDetail, setShowBudgetDetail] = useState(false)
  const [showDeleteBudget, setShowDeleteBudget] = useState(false)

  const [date, setDate] = useState({
    year: dayjs().year(),
    month: dayjs().month() + 1
  })

  const [budgetData, setBudgetData] = useState({
    total: {
      total: 0,
      expense: 0,
      pending: 0
    },
    currency: 'EUR',
    categories: []
  })

  useEffect(() => {
    getData()
  }, [date.year, date.month])

  const getData = async () => {
    setNoBudget(true)
    setLoading(true)
    setShowBudgetDetail(false)
    try {
      const [catResponse, budgetResponse] = await Promise.all([
        recordsService.getRecordCategories(),
        budgetsService.getBudgetByMonth(date.year, date.month)
      ]
)
      if (catResponse.status === 200) {
        const categoryData = catResponse.data.filter((category) => category.group === 'EXPENSE' || category.group === 'GENERAL')
        setCategories(categoryData)
        if (budgetResponse.status === 200) {
          const budgetData = budgetResponse.data
          setNoBudget(false)

          const fullCategories = categoryData.map(category => {
            const existingCat = budgetData.categories.find(c => c.categoryName === category.name)
            return {
              categoryName: category.name,
              limit: existingCat?.limitAmount || 0,
              spent: existingCat?.spentAmount || 0,
              pending: existingCat?.pendingAmount || 0
            }
          })

          setBudgetData({
            total: {
              total: budgetData.totalBudget || 0,
              expense: budgetData.totalExpense || 0,
              pending: budgetData.totalPending || 0
            },
            currency: budgetData.currency || 'EUR',
            categories: fullCategories
          })
        }
      }
    } catch (err) {
      if (err.response.status === 400) {
        const emptyCat = categories.map(cat => ({ categoryName: cat.name, limit: 0, spent: 0, pending: 0 }))
        setBudgetData({ 
          total: {total: 0, expense: 0, pending: 0},
          currency: 'EUR',
          categories: emptyCat
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const onDatePickerChange = (date) => {
    setDate({ 
      year: dayjs(date).year(), 
      month: dayjs(date).month() + 1
    })
  }

  const handleInputChange = (name, value) => {
    setBudgetData(prev => {
      if (name === 'total') {
        return {
          ...prev,
          total: {
            ...prev.total,
            total: value
          }
        }
      }

      const updatedCategories = prev.categories.map(cat => {
        if (cat.categoryName === name) {
          return { ...cat, limit: value }
        }
        return cat
      })

      return {
        ...prev,
        categories: updatedCategories
      }
    })
  }

  const handleSaveBudget = async () => {
    const sum = budgetData.categories.reduce((sum, cat) => sum = sum + (Number(cat.limit) || 0), 0)
    const total = budgetData.total.total;

    if (sum > total) {
      toast.error('Sum of categories is greater than total budget.')
      return
    }

    const formttedDate = dayjs().year(date.year).month(date.month).startOf('month').format('YYYY-MM-DD')
    const payload = {
      budgetDate: formttedDate,
      currency: budgetData.currency,
      totalBudget: budgetData.total.total,
      categories: budgetData.categories.map(cat => ({
        categoryName: cat.categoryName,
        limitAmount: cat.limit,
      })),
    }

    try {
      const response = await budgetsService.saveBudget(payload)
      if (response.status === 200) {
        toast.success('Budget saved successfully')
        setIsEditing(!isEditing)
      }
    } catch (err) {
      toast.error('Save budget failed.')
      console.log('save budget failed', err)
    }

  } 

  const handleSync = async () => {
    try {
      const response = await budgetsService.syncBudget(date.year, date.month)
      if (response.status === 200) {
        getData()
        toast.success('Sync data successfully!')
        setNoBudget(false)
      }
    } catch (err) {
      toast.error('Fail to sync data.')
      console.log(err)
    }
  }

  const handleCreateBudget = () => {
    setNoBudget(false)
    setShowBudgetDetail(true)
    setIsEditing(true)
  }

  const isPastMonth = () => {
    const selectedDate = dayjs().year(date.year).month(date.month - 1).startOf('month')
    const currentMonth = dayjs().startOf('month')
    return selectedDate.isBefore(currentMonth)
  }

  const handleDeleteBudget = async () => {
    try {
      const response = await budgetsService.deleteBudget(date.year, date.month)
      if (response.status === 200) {
        toast.success('Delete budget successfully.')
        setShowDeleteBudget(false)
        setShowBudgetDetail(false)
        setBudgetData({
          total: {
            total: 0,
            expense: 0,
            pending: 0
          },
          currency: 'EUR',
          categories: []
        })
        setNoBudget(true)
        getData()
      }
    } catch (err) {
      if (err.response.status === 404) {
        toast.success('There is no budget for this month')
        setShowDeleteBudget(false)
        setShowBudgetDetail(false)
        setNoBudget(true)
      } else {
        toast.error('Fail to delete this budget.')
      }
    }
  }

  return (
   <div className="fixed inset-0 z-1000 bg-neutral-900/50">
     <div className="fixed top-0 end-0 transition-all duration-300 transform h-full max-w-lg w-full z-100 overflow-x-hidden overflow-y-auto bg-white dark:bg-neutral-800 shadow-xl" role="dialog" aria-labelledby="hs-ai-offcanvas-label">
      <div className="relative overflow-hidden min-h-32 bg-gray-900 text-center rounded-t-xl dark:bg-neutral-950">
        <div className="absolute top-2 end-2">
          <CloseButton onClick={() => setShowBudgetForm(!showBudgetForm)}/>
        </div>

        <figure className="absolute inset-x-0 bottom-0 -mb-px">
          <ArcIcon/>
        </figure>
      </div>
      <div className="relative z-10 -mt-12">
        <span className="mx-auto flex justify-center items-center size-15.5 rounded-full border border-gray-200 bg-white text-gray-700 shadow-2xs dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
          <CreditCardIcon />
        </span>
      </div>

      {/* body */}
      <div className="p-4 sm:p-4 overflow-y-auto">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200 text-gray-800">
            Budgets
          </h3>
        </div>

        {/* date picker */}
        <div className="pt-7"><MyDatePicker mode='month' onChange={onDatePickerChange}/></div>

        <div className={`p-4 mt-4 w-full data-panel ${loading ? 'opacity-50 pointer-events-none' : '' }`}>
          {/* summary */}
          <div className="grid grid-cols-4 mt-5">
            <div>
              <div className="text-gray-600 pb-2 text-sm">Budget </div>
              <div className="text-2xl font-bold text-blue-600">€ {budgetData.total.total}</div>
            </div>
            <div>
              <div className="text-gray-600 pb-2 text-sm">Remaining </div>
              <div className="text-2xl font-bold text-emerald-600">€ {budgetData.total.total - budgetData.total.expense - budgetData.total.pending}</div> 
            </div>
            <div>
              <div className="text-gray-600 pb-2 text-sm">Expense </div>
              <div className="text-2xl font-bold text-rose-600">€ {budgetData.total.expense}</div> 
            </div>
            <div>
              <div className="text-gray-600 pb-2 text-sm">Pending </div>
              <div className="text-2xl font-bold text-gray-500">€ {budgetData.total.pending}</div> 
            </div>
          </div>

          {/* if there is no budget */}
          {noBudget && (
            <div className="my-10 w-full">
              <span className="items-center justify-center w-full text-gray-600 flex">No budget for this month. </span>
              {!isPastMonth() && (
                <div>
                  <span className="items-center pt-1 justify-center w-full text-gray-600 flex">Wish to create a new one ?</span>
                  <div className="gap-2 flex py-2 items-center justify-center">
                    <button type='primary' onClick={handleSync} className="h-10 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white  hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sync Previous</button>
                    <button onClick={handleCreateBudget} className="h-10 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">Create Manually</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* more details button */}
          {!showBudgetDetail && !noBudget && (
            <div className="mt-10 text-gray-400">
              <div className="items-center flex w-full justify-center">more details</div>
              <button className="items-center flex w-full justify-center" onClick={() => setShowBudgetDetail(!showBudgetDetail)} ><CaretDownOutlined /></button>
            </div>
          )}

          {/* progress */}
          {showBudgetDetail &&  (
            <div className="mt-10 md:mt-10 mb-10 md:mb-15">
              <Flex gap="large" vertical>
                <div>
                  <span>Total</span>
                  {isEditing ? (
                    <div className="w-full flex items-center justify-center mt-2">
                      € <input type='number' value={budgetData.total.total} onChange={(e) => handleInputChange('total', e.target.value)} className="w-full border border-gray-200 rounded-md focus:border-blue-600 p-2 ml-2" />
                    </div>
                  ) : (
                    <Tooltip title={`budget: € ${budgetData.total.total} / spent: € ${budgetData.total.expense} / pending: € ${budgetData.total.pending}`}>
                      <Progress 
                        percent={budgetData.total.total !== 0 ? Number((budgetData.total.expense + budgetData.total.pending) * 100 / budgetData.total.total).toFixed(2) : 0} 
                        strokeColor='#ccc'
                        success={{ 
                          percent: budgetData.total.total !== 0 ? Number(budgetData.total.expense * 100 / budgetData.total.total).toFixed(2) : 0,
                          strokeColor: '#2563eb'
                        }}
                        format={(percent) => {
                          const n = Number(percent)
                          return `${n.toFixed(0)}%`
                        }}
                      />
                    </Tooltip>
                  )}
                </div>

                {budgetData.categories.map(item => (
                  <div key={item.categoryName}>
                    <span className="text-gray-800">{item.categoryName.charAt(0) + item.categoryName.slice(1).toLowerCase()}</span>
                    {isEditing ? (
                      <div className="w-full flex items-center justify-center mt-2">
                        € <input 
                            type='number' 
                            onChange={(e) => handleInputChange(item.categoryName, e.target.value)}
                            value={item.limit}
                            className="w-full border border-gray-200 rounded-md focus:border-blue-600 p-2 ml-2" />
                      </div>
                    ) : (
                      <Tooltip title={`budget: € ${item.limit} / spent: € ${item.spent} / pending: € ${item.pending}`}>
                        <Progress 
                          percent={item.limit !== 0 ? Number((item.pending + item.spent) * 100 / item.limit).toFixed(2) : 0} 
                          strokeColor='#ccc'
                          success={{ 
                            percent: item.limit !== 0 ? Number(item.spent * 100 / item.limit).toFixed(2) : 0,
                            strokeColor: '#2563eb'
                          }} 
                          format={(percent) => {
                            const n = Number(percent)
                            return `${n.toFixed(0)}%`
                          }}
                        />
                      </Tooltip>
                    )}
                  </div>
                ))}
              </Flex>

              {isEditing ? (
                <div className="w-full mt-4 flex gap-2 justify-end">
                  <button onClick={() => { setIsEditing(!isEditing) }} className="h-10 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">Cancel</button>
                  <button onClick={handleSaveBudget} className="h-10 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-blue-600 text-white  hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Save</button> 
                </div>
              ) : (
                <div className="w-full mt-4 flex gap-2 justify-end">
                  <button onClick={() => setIsEditing(!isEditing)} className="h-10 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white  hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">modify</button>
                  <button onClick={() => setShowDeleteBudget(!showDeleteBudget)} className="h-10 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white  hover:bg-red-700 focus:outline-hidden focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">delete</button>
                </div>
              )}

              {showBudgetDetail && (
                <div className="mt-10 text-gray-400">
                  <button className="items-center flex w-full justify-center" onClick={() => setShowBudgetDetail(!showBudgetDetail)} ><CaretUpOutlined /></button>
                  <div className="items-center flex w-full justify-center">hide details</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>

    {showDeleteBudget && (
      <ConfirmDeleteModal 
        setShowConfirmDelete={setShowDeleteBudget}
        message="Confirm to delete this budget?"
        onConfirm={handleDeleteBudget}
      />
    )}
   </div> 
  )
}

export default BudgetForm