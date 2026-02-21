import { useState, useEffect, useContext } from "react"
import { toast } from 'react-hot-toast'
import { CloseIcon } from "../ui/Icon"
import RecordContext from "../context/RecordContext"
import recordsService from '../../services/records'
import accountsService from "../../services/accounts"

const RecordCreateForm = ({showRecordForm, setShowRecordForm, mode, recordId}) => {
  const { onSuccess, formatAdapteur } = useContext(RecordContext)
  const [formData, setFormData] = useState({
    title: '',
    amount: 0,
    description: '',
    date: new Date().toLocaleDateString('en-CA'),
    type: 'EXPENSE',
    status: 'PENDING',
    category: '',
    accountId: '',
    accountName: ''
  })

  const [loading, setLoading] = useState(true)
  const [accounts, setAccounts] = useState([])
  const status = ['PENDING', 'COMPLETED', 'CANCELLED']
  const [categories, setCategories] = useState([])
  const [activeTab, setActiveTab] = useState('EXPENSE')
  const currentCat = categories.filter(category => category.group === activeTab || category.group === 'GENERAL')

  useEffect(() => {
    const getData =  async() => {
      const categoriesResponse = await recordsService.getRecordCategories()
      const accounts = await accountsService.getAllAccounts()
      setCategories(categoriesResponse.data)
      setAccounts(accounts.data)
      if (mode === 'modify') {
        getRecord(recordId)
      }
      setLoading(!loading)
    }
    getData()
  }, [])

  const getRecord = async (id) => {
    try {
      const response = await recordsService.getRecord(id)
      const recordData = response.data
      if (response.status === 200) {
        setFormData({
          title: recordData.title,
          amount: recordData.amount,
          description: recordData.description,
          date: recordData.ticketCompletionDate.substring(0,10),
          type: formatAdapteur(recordData.transactionType),
          status: formatAdapteur(recordData.transactionStatus),
          category: formatAdapteur(recordData.transactionCategory),
          accountId: recordData.accountId,
          accountName: recordData.accountName
        })
        setActiveTab(recordData.transactionType)
      }
    } catch (err) {
      toast.error('Fail to get record info')
      console.log(err)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const payload = {
      title: formData.title,
      amount: formData.type === 'EXPENSE' ? -Math.abs(formData.amount) : Math.abs(formData.amount),
      description: formData.description,
      ticketCompletionDate: formData.date + 'T00:00:00',
      transactionType: formData.type.toUpperCase(),
      transactionCategory: formData.category ? formData.category.toUpperCase() : categories[0].name.toUpperCase(),
      transactionStatus: formData.status.toUpperCase(),
      account: {
        id: formData.accountId ? formData.accountId : accounts[0].id,
      }
    }
    try {
      const response = mode === 'create' ? 
          await recordsService.createRecord(payload) : 
          await recordsService.updateRecord(recordId, payload)
      if (response.status == 200) {
        setShowRecordForm(!showRecordForm)
        onSuccess(mode)
      }
    } catch (err) {
      toast.error(mode === 'create' ? 'Create record failed' : 'Update record failed')
      console.log(err)
    }
  }

  const handleChange = (event) => {
    const { name, value} = event.target
    if (name === 'account') {
      setFormData({ ...formData, accountId: value })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleTypeChange = (type) => {
    setFormData({
      ...formData, 
      type: type
    })
  }

  if(loading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div>
      <div className="flex items-center hs-overlay size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none bg-neutral-900/50" role="dialog" tabIndex="-1">
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 ease-out transition-all sm:max-w-lg sm:w-full sm:mx-auto mt-10">
          <div className="max-h-full overflow-hidden flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-800">
              {/* expense or income */}
              <nav className="flex gap-x-2" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                <button 
                  type="button"
                  onClick={() => {
                    setActiveTab('EXPENSE')
                    handleTypeChange('EXPENSE')
                  }} 
                  className={`
                    ${activeTab === 'EXPENSE' ? "font-semibold border-blue-600 border-b-2 text-blue-600" : "border-transparent text-gray-500"}
                    py-4 px-6 inline-flex items-center gap-x-2 text-sm whitespace-nowrap hover:text-blue-600 focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500 dark:focus:text-blue-500 active`}
                  id="basic-tabs-item-1" 
                  aria-selected={activeTab === 'EXPENSE'} 
                  data-hs-tab="#basic-tabs-1" 
                  aria-controls="basic-tabs-1" 
                  role="tab"
                >
                  Expense
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setActiveTab('INCOME')
                    handleTypeChange('INCOME')
                  }} 
                  className={`
                    ${activeTab === 'INCOME' ? "font-semibold border-blue-600 border-b-2 text-blue-600" : "border-transparent text-gray-500"}
                    py-4 px-6 inline-flex items-center gap-x-2 text-sm whitespace-nowrap hover:text-blue-600 focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500 dark:focus:text-blue-500 active`}
                  id="basic-tabs-item-2" 
                  aria-selected={activeTab === 'INCOME'} 
                  data-hs-tab="#basic-tabs-2" 
                  aria-controls="basic-tabs-2" 
                  role="tab"
                >
                  Income
                </button>
              </nav>
              <button type="button" onClick={() => { setShowRecordForm(!showRecordForm) }} className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close">
                <CloseIcon />
              </button>
            </div>

            {/* form */}
            <div className="p-4 sm:p-7">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* title */}
                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">Title</label>
                  <div className="mt-2">
                    <input 
                      type="text"
                      name="title"
                      onChange={handleChange}
                      value={formData.title}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></input>
                  </div>
                </div>

                {/* amount and date */}
                <div className="mt-6 grid gap-4 lg:gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    {/* amount */}
                    <div>
                      <label className="block text-sm/6 font-medium text-gray-900">Amount</label>
                      <div className="mt-2 flex gap-2 text-center items-center">
                        €<input 
                          type="number"
                          step="0.01"
                          min="0"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          required
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></input>
                      </div>
                    </div>

                    {/* date */}
                    <div>
                      <label className="block text-sm/6 font-medium text-gray-900">Date</label>
                      <div className="relative mt-2 w-full">
                        <input onChange={handleChange} value={formData.date} name="date" className="z-50 py-3 px-4 block w-full appearance-none bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700 py-3 px-4 pr-10 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer" type="date" placeholder=""></input>
                      </div>
                    </div>
                  </div>
                </div>

                {/* status and category */}
                <div className="mt-6 grid gap-4 lg:gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    {/* status: pending, completed, cancelLed */}
                    <div>
                      <label className="block text-sm/6 font-medium text-gray-900">Status</label>
                      <div className="relative mt-2 w-full">
                        <select onChange={handleChange} name='status' value={formData.status ? formData.status : 'PENDING'} className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700 py-3 px-4 pr-10 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer">
                          {status.map((type) => (
                            <option key={type}>{formatAdapteur(type)}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* category */}
                    <div>
                      <label className="block text-sm/6 font-medium text-gray-900">Category</label>
                      <div className="relative mt-2 w-full">
                        <select 
                          name='category'
                          value={formData.category ? formData.category : currentCat[0].name}
                          onChange={handleChange}
                          className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700 py-3 px-4 pr-10 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer">
                          {currentCat.map((category) => (
                            <option key={category.name}>{formatAdapteur(category.name)}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* account select */}
                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">Account</label>
                  <div className="relative mt-2 w-full">
                    <select 
                      name="account"
                      onChange={handleChange}
                      value={formData.accountId}
                      className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700 py-3 px-4 pr-10 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer">
                      {accounts.map((account) => (
                        <option key={account.id} value={account.id}>{account.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* description */}
                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">Description</label>
                  <div className="mt-2">
                    <input 
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    ></input>
                    </div>
                </div>
                
                <div className="flex gap-2">
                  <button onClick={() => { setShowRecordForm(!showRecordForm) }} className="flex w-full justify-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm/6 font-semibold shadow-xs hover:bg-gray-100">
                    Cancel
                  </button>
                  <button type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>     
        </div>
      </div>
    </div>
 )
}

export default RecordCreateForm