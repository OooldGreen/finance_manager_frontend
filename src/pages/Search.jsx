import { useEffect, useState } from "react"
import { Select, ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import { SortIcon } from "../components/ui/Icon"
import MyDatePicker from "../components/ui/MyDatePicker"
import debounce from "../services/utils/debounce"
import recordsService from "../services/records"
import accountsService from "../services/accounts"
import tagsService from "../services/tags"

const Search = () => {
  const [dateType, setDateType] = useState('all')
  const [baseDate, setBaseDate] = useState()
  const [filters, setFilters] = useState({
    keyword: '',
    startDate: null,
    endDate: null,
    types: '',
    status: [],
    categories: [],
    selections: [],
    sort: {
      key: 'ticketCompletionDate',
      direction: 'DESC'
    },
    page: 0,
    size: 10
  })
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [pages, setPages] = useState()

  const [categories, setCategories] = useState()
  const [accounts, setAccounts] = useState()
  const [tags, setTags] = useState()

  const debounceKeyword = debounce(filters.keyword, 500)

  useEffect(() => {
    const getData = async () => {
      try {
        const [categoriesRes, accountsRes, tagsRes] = await Promise.all([
          recordsService.getRecordCategories(),
          accountsService.getAllAccounts(),
          tagsService.getAllTags()
        ])

        setCategories(categoriesRes.data.map(category => ({ value: category.name, label: category.name.charAt(0) + category.name.slice(1).toLowerCase()})))
        setAccounts(accountsRes.data.map(account => ({ value: 'acc_' + account.id, label: account.name, disabled: !account.isActive })))
        setTags(tagsRes.data.map(tag => ({ value: 'tag_' + tag.id, label: tag.name })))
      } catch (err) {
        console.log('Fail to get data', err)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const isEmptySearch = !debounceKeyword.trim() && !filters.startDate && filters.status.length === 0 && filters.categories.length === 0 && filters.selections.length === 0
    if (isEmptySearch) {
      setRecords([])
      return
    }
    getRecords()
  }, [debounceKeyword, filters.startDate, filters.endDate, filters.categories, filters.status, filters.selections, filters.sort, filters.page, filters.types])

  const getRecords = async () => {
      setLoading(true)
      try {
        const response = await recordsService.searchRecord({
          ...filters,
          sortKey: filters.sort.key,
          sortDirection: filters.sort.direction
        })
        console.log('res', response.data)
        if (response.status === 200) {
          setRecords(response.data.content)
          setPages(response.data.page)
        }
      } catch (err) {
        console.log('fail to search records', err)
      } finally {
        setLoading(false)
      }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pages.totalPages) {
      setFilters({
        ...filters,
        page: newPage
      })
    }
  }

  const handleSort = (key) => {
    setFilters(prev => {
      let nextDirection = 'ASC'
      let nextKey = key;
      if (prev.sort.key === key) {
        if (prev.sort.direction === 'ASC') {
          nextDirection = 'DESC'
        } else {
          nextKey = 'ticketCompletionDate'
          nextDirection = 'DESC'
        }
      }

      return {
        ...prev,
        page: 0,
        sort: {
          key: nextKey,
          direction: nextDirection
        }
      }
    })
  }

  const handleChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === undefined ? '' : value,
      page: 0
    }))
  }

  useEffect(() => {
    const date = baseDate ? dayjs(baseDate) : dayjs()
    const startDate = dateType === 'all' ? null : date.startOf(dateType).format('YYYY-MM-DD')
    const endDate = dateType === 'all' ? null : date.endOf(dateType).format('YYYY-MM-DD')
    setFilters({...filters, startDate: startDate, endDate: endDate, page: 0 })
  }, [baseDate, dateType])

  const onDatePickerChange = (date) => {
    if (!date) {
      setFilters(prev => ({...prev, startDate: null, endDate: null, page: 0}))
      return
    }

    if (dateType === 'all') {
      const [start, end] = date
      setFilters(prev => ({...prev, startDate: start, endDate: end}))
    } else {
      setBaseDate(date)
    }
  }

  const handleDateTypeChange = (type) => {
    setDateType(type)
    onDatePickerChange(dayjs())
  }

  const formatAdapteur = (string) => {
    return string.charAt(0) + string.slice(1).toLowerCase()
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 gap-6 p-8 md:p-12 max-w-5xl mx-auto">
        {/* search */}
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
            <svg className="shrink-0 size-4 text-muted-foreground text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <input onChange={e => setFilters({...filters, keyword: e.target.value})} className="bg-gray-100 border-gray-300 py-2.5 py-3 ps-10 pe-4 block w-full rounded-lg sm:text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary-focus focus:ring-primary-focus disabled:opacity-50 disabled:pointer-events-none" type="text" placeholder="Enter keywords" />
        </div>

        {/* search history */}
        <div className="flex gap-4">
          <div className="text-gray-600 dark:text-neutral-400 bg-white px-2 py-1 rounded-md">
            income
          </div>
        </div>

        {/* search result list */}
        {records.length === 0 ? '' : 
          <div>
            <div className="min-w-full px-8 rounded-xl block bg-white bg-layer focus:outline-hidden divide-y divide-gray-200 dark:divide-neutral-800">
              <div className="py-5 overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb">
                {/* filters */}
                {/* tags, categories, date, types, accounts, status  */}
                <div className="mb-4">
                  <ConfigProvider theme={{
                    components: {
                      Select: {
                        optionSelectedBg: '#eff6ff',
                        optionSelectedColor: '#2563eb',
                        colorPrimary: '#2563eb'
                      }
                    }
                  }}>
                    {/* date */}
                    <div className='flex items-center justify-between text-gray-700 w-full mb-4'>
                      {/* select */}
                      <div className="flex gap-4">
                        <Select 
                          className="rounded-lg border-gray-200"
                          style={{ width: '150px' }}
                          options={[
                            { value: 'all', label: 'All' },
                            { value: 'month', label: 'Month' },
                            { value: 'year', label: 'Year' }
                          ]}
                          defaultValue={'all'}
                          onChange={(value) => handleDateTypeChange(value)}> 
                        </Select>

                        {/* date picker */}
                        <div>
                          {dateType === 'all' && <MyDatePicker mode='range' onChange={onDatePickerChange}/>}
                          {dateType === 'month' && <MyDatePicker mode='month' onChange={onDatePickerChange}/>}
                          {dateType === 'year' && <MyDatePicker mode='year' onChange={onDatePickerChange}/>}
                        </div>
                      </div>
                      
                    </div>

                    <div className="grid grid-cols-3 gap-4 justify-center items-center flex">
                      {/* types and status */}
                      <div className="grid grid-cols-2 gap-4 ">
                        {/* types */}
                        <Select 
                          onChange={(value) => handleChange('types', value)}
                          placeholder='Types'
                          allowClear
                          maxTagCount="responsive"
                          options={[
                            { value: 'EXPENSE', label: 'Expense' },
                            { value: 'INCOME', label: 'Income' }
                          ]} />
                        
                        {/* status */}
                        <Select
                          mode="multiple"
                          placeholder='Status'
                          allowClear
                          maxTagCount="responsive"
                          onChange={(value) => handleChange('status', value)}
                          options={[
                            { value: 'COMPLETED', label: 'Completed' },
                            { value: 'PENDING', label: 'Pending' },
                            { value: 'CANCELED', label: 'Canceled' }
                          ]} />
                      </div>
                      
                      {/* categories */}
                      <Select
                        mode="multiple"
                        placeholder='Categories'
                        allowClear
                        maxTagCount="responsive"
                        onChange={(value) => handleChange('categories', value)}
                        options= {categories} />

                      {/* tags and accounts */}
                      <Select
                        mode="multiple"
                        placeholder="More"
                        maxTagCount="responsive"
                        allowClear
                        onChange={(value) => handleChange('selections', value)}
                        options={[
                          {
                            label: 'Tags',
                            options: tags
                          },
                          {
                            label: 'Accounts',
                            options: accounts
                          }
                        ]}>

                      </Select>
                    </div>
                  </ConfigProvider> 
                </div>
            
                {loading ? <div>loading...</div> : 
                <table className="min-w-full divide-y divide-table-line divide-gray-200">
                  <thead>
                    <tr className="text-gray-400 text-sm">
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
                    </tr>
                  </thead>

                  <tbody>
                    {records.map(record => (
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{record.title}</td>
                        <td className={`${record.transactionType === 'EXPENSE' ? 'text-rose-600' : 'text-emerald-600'} px-6 py-4 whitespace-nowrap text-sm text-foreground`}>{record.amount >= 0 ? '€' + record.amount : '-€ ' + Math.abs(record.amount)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{formatAdapteur(record.transactionCategory)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{record.ticketCompletionDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-foreground text-sm font-medium">{record.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-foreground text-sm font-medium">
                          <div className={`${record.transactionStatus === 'COMPLETED' ? 'bg-emerald-100 text-teal-700' : record.transactionStatus === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'text-slate-500 bg-slate-100'} p-2 rounded-md text-center`}>{formatAdapteur(record.transactionStatus)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-foreground text-sm font-medium">{record.accountName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                }
              </div>

              
            </div>

            {/* paginator */}
            <nav className="mt-7 flex w-full justify-center items-center space-x-1" aria-label="Pagination">
              <button type="button" onClick={() => handlePageChange(filters.page - 1)} className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-foreground hover:text-blue-600 focus:outline-hidden rounded-full disabled:opacity-50 disabled:pointer-events-none" aria-label="Previous">
                <span aria-hidden="true">«</span>
                <span className="sr-only">Previous</span>
              </button>

              { Array.from({ length: pages.totalPages || 0 }, (_, i) => i).map(index => (
                <button 
                  type="button"
                  key={index}
                  onClick={() => handlePageChange(index)}
                  className={`${index === pages.number ? 'bg-white/70 hover:bg-white rounded-full text-blue-600' : ''} min-w-10 flex justify-center items-center py-2.5 text-sm text-foreground focus:outline-hidden focus:bg-muted-focus rounded-full disabled:opacity-50 disabled:pointer-events-none`}
                  aria-current="page"
                >{index + 1}</button>
              )) }

              <button type="button" onClick={() => handlePageChange(filters.page + 1)} className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-foreground hover:text-blue-600 focus:outline-hidden rounded-full disabled:opacity-50 disabled:pointer-events-none" aria-label="Next">
                <span className="sr-only">Next</span>
                <span aria-hidden="true">»</span>
              </button>
            </nav>
          </div>}
      </div>
    </div>
  )
}

export default Search