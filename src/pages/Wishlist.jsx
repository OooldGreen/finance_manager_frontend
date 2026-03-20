import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { CloseIcon } from "../components/ui/Icon"
import { EditOutlined, DeleteOutlined, PauseCircleOutlined, StarOutlined, StarFilled } from '@ant-design/icons'
import { Dropdown, Flex, Progress, Tooltip, Space } from 'antd'
import { PlusIcon } from "../components/ui/Icon"
import { getCategoryById } from "../services/utils/colorMap"
import WishForm from "../components/forms/WishForm"
import ConfirmDeleteModal from "../components/ui/ConfirmDeleteModal"
import DepositForm from "../components/forms/DepositForm"
import wishlistsService from "../services/wishlists"

const Wishlist = () => {
  const [loading, setLoading] = useState(true)
  const [showWishForm, setShowWishForm] = useState(false)
  const [wishFormMode, setWishFormMode] = useState('create')
  const [showDeleteForm, setShowDeleteForm] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [depositForm, setDepositForm] = useState({
    show: false,
    wishId: '',
    remaining: 0
  })

  const [seletedId, setSelectedId] = useState()
  const [selectedWish, setSeletedWish] = useState()

  const [summary, setSummary] = useState({ totalWishes: 0, achieved: 0} )
  const [wishes, setWishes] = useState()
  const [pagination, setPagination] = useState({
    total: 0,
    current: 0,
    pageSize: 5
  })

  useEffect(() => {
    getData()
  }, [pagination.current, pagination.total])

  const getData = async () => {
    try {
      const [summaryResponse, wishListResponse] = await Promise.all([
        wishlistsService.getSummary(),
        wishlistsService.getAllGoals(pagination.current, pagination.pageSize)
      ])
      if (summaryResponse.status === 200 && wishListResponse.status === 200) {
        setSummary({ totalWishes: summaryResponse.data.totalGoals, achieved: summaryResponse.data.achievedGoals })
        setWishes(wishListResponse.data.content)
        setPagination({
          ...pagination,
          total: wishListResponse.data.totalPages,
          current: wishListResponse.data.number
        })
      }
      setLoading(false)
    } catch (err) {
      console.log('Fail to get wishlist', err)
    }
  }

  const onSuccess = () => {
    getData()
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pagination.total) {
      setPagination({
        ...pagination,
        current: newPage
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleMenuClick = async (action, id) => {
    switch (action) {
      case 'star':
        try {
          const response = await wishlistsService.updatePriority(id)
          if (response.status === 200) {
            getData()
          }
        } catch (err) {
          console.log(err)
        }
        break
      case 'pause':
        try {
          const response = await wishlistsService.updateActive(id)
          if (response.status === 200) {
            getData()
          }
        } catch (err) {
          console.log(err)
        }
        break
      case 'edit':
        setWishFormMode('edit')
        const wish = wishes.find(wish => wish.id === id)
        if (wish) {
          setSeletedWish(wish)
          setShowWishForm(true)
        }
        console.log(wish)
        break
      case 'delete':
        setShowDeleteForm(true)
    }
  }

  const handleConfirmDelete = async () => {
    try {
      const response = await wishlistsService.deleteGoal(seletedId)
      console.log(response.status)
      if (response.status === 204) {
        setShowDeleteForm(false)
        toast.success('Delete wish successfully')
        getData()
      }
    } catch (err) {
      toast.error('Fail to delete wish')
    }
  }

  if (loading) { return (<div>loading...</div>) }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 gap-6 p-8 md:p-12 max-w-3xl mx-auto w-full">
        <div className="flex flex-col bg-white rounded-xl md:p-10 p-7">
          <div className="grid grid-cols-2 gap-4 md:gap-4 lg:gap-8">
            {/* summary */}
            <div>
              <h3 className="text-xl font-bold text-foreground">Total Wishes</h3>
              <div className="mt-3">
                <span className="text-4xl font-bold text-foreground">{summary.totalWishes}</span>
              </div>
            </div>
            <div className="text-emerald-600">
              <h3 className="text-xl font-bold text-foreground ">Achieved</h3>
              <div className="mt-3">
                <span className="text-4xl font-bold text-foreground">{summary.achieved}</span>
              </div>
            </div>
          </div>
        </div>

        {/* wish list */}
        <div className="w-full px-8 rounded-xl block bg-white bg-layer focus:outline-hidden divide-y divide-gray-200 dark:divide-neutral-800">
          {wishes.map(wish => (
            <div className="w-full flex items-center py-6" key={wish.id}>
              <div className="w-full text-left grow h-full">
                <div className="w-full flex justify-between">
                  {/* wish details */}
                  <div className="grid gap-2 w-full">
                    <div className="flex gap-2">
                      {wish.isPriority && <StarFilled style={{ color: '#fadb14' }}/>}
                      <h3 className={`font-semibold  dark:text-neutral-200 ${wish.isActive ? 'text-gray-800' : 'text-gray-400'}`}>{wish.title}</h3>
                      {!wish.isActive && <span className="text-sm items-center flex justify-center px-2 py-1 bg-gray-200 rounded-md text-gray-500">pause</span>}
                      {wish.isReached && <span className="text-sm items-center flex justify-center px-2 py-1 bg-emerald-100 rounded-md text-emerald-600">completed</span>}
                    </div>
                    {wish.description && <p className={`mb-1 text-sm text-gray-500 dark:text-neutral-500 ${wish.isActive ? 'text-gray-500' : 'text-gray-400'}`}>{wish.description}</p>}
                    <div className="w-full flex justify-between items-center">
                      <div className="flex gap-2">
                        <div className="text-sm bg-gray-100 rounded-md py-1 px-2 text-gray-500 dark:text-neutral-500">{wish.createdAt}</div>
                        <div className="text-sm py-1 px-2 rounded-md" style={{backgroundColor: `${getCategoryById(wish.category).color}40`, color: `${getCategoryById(wish.category).color}`}}>{getCategoryById(wish.category).icon} {getCategoryById(wish.category).label}</div>
                      </div>
                      <div>
                        {!wish.isReached && (
                          <button 
                            disabled={!wish.isActive}
                            onClick={() => setDepositForm({
                              show: true,
                              wishId: wish.id,
                              remaining: wish.targetAmount - wish.currentAmount
                            })}
                            className={`text-white py-1 px-2 rounded-md  ${wish.isActive ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'}`}
                          >deposit</button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* functions */}
                  <div className="relative">
                    <Dropdown menu={{
                      items: [
                        { key: 'star', label: wish.isPriority ? 'unfavorite' : 'favorite', icon: <StarOutlined />},
                        { key: 'pause', label: wish.isActive ? 'pause' : 'resume', icon: <PauseCircleOutlined /> },
                        { key: 'edit', label: 'edit', icon: <EditOutlined /> },
                        { type: 'divider' },
                        { key: 'delete', label: 'delete', danger: true, icon: <DeleteOutlined /> }
                      ],
                      onClick: ({key}) => {
                        setSelectedId(wish.id)
                        handleMenuClick(key, wish.id)
                      }}}
                      trigger={['click']}
                    >
                      <button className="absolute right-1 z-10 text-sm text-gray-500 hover:text-blue-600  items-center rounded-md">
                        <Space>
                          ...
                        </Space>
                      </button>
                    </Dropdown>
                  </div>
                </div>
                
                {/* progress */}
                <div className="w-full mt-4 items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">
                  <Flex gap='small' vertical>
                    <Tooltip title={`${wish.progress} %`}>
                      <Progress 
                        percent={wish.progress}
                        format={() => {
                          return `€ ${wish.currentAmount} / € ${wish.targetAmount}`
                        }}
                        strokeColor={wish.isReached ? '#10b981' : (wish.isActive ? '' : '#d9d9d9')}
                      />
                    </Tooltip>
                  </Flex>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* pages */}
        {pagination.total !== 0 ? (
          <nav className="flex w-full justify-center items-center space-x-1" aria-label="Pagination">
            <button type="button" onClick={() => handlePageChange(pagination.current - 1)} className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-foreground hover:text-blue-600 focus:outline-hidden rounded-full disabled:opacity-50 disabled:pointer-events-none" aria-label="Previous">
              <span aria-hidden="true">«</span>
              <span className="sr-only">Previous</span>
            </button>

            { Array.from({ length: pagination.total }, (_, i) => i).map(index => (
              <button 
                type="button"
                key={index}
                onClick={() => handlePageChange(index)}
                className={`${index === pagination.current ? 'text-blue-600' : ''} min-w-10 flex justify-center items-center py-2.5 text-sm text-foreground hover:text-blue-600 focus:outline-hidden focus:bg-muted-focus rounded-full disabled:opacity-50 disabled:pointer-events-none`}
                aria-current="page"
              >{index + 1}</button>
            )) }

            <button type="button" onClick={() => handlePageChange(pagination.current + 1)} className="p-2.5 min-w-10 inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-foreground hover:text-blue-600 focus:outline-hidden rounded-full disabled:opacity-50 disabled:pointer-events-none" aria-label="Next">
              <span className="sr-only">Next</span>
              <span aria-hidden="true">»</span>
            </button>
          </nav>
        ) : ''}

        {/* create new wish button */}
        <button 
          type="button" 
          onClick={() => {
            setShowWishForm(true)
            setWishFormMode('create')
            setSeletedWish(null)
          }} 
          className="fixed bottom-10 right-8 size-11 md:bottom-15 md:right-15 py-3 px-4 z-50 flex justify-center items-center md:size-13 text-sm font-medium rounded-full bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="shrink-0 size-6 text-white"/>
        </button>

        {/* create or update wish informations modal */}
        {showWishForm && 
          <WishForm
            mode={wishFormMode}
            wish={selectedWish}
            setShowForm={setShowWishForm}
            onSuccess={onSuccess}
          />
        }

        {/* confirm delete modal */}
        {showDeleteForm && 
          <ConfirmDeleteModal
            setShowConfirmDelete={setShowDeleteForm}
            message='Determined to delete this wish ?'
            onConfirm={handleConfirmDelete}
          />
        }

        {/* save money modal */}
        {depositForm.show &&
          <DepositForm setForm={setDepositForm} data={depositForm} onSuccess={onSuccess} setShowCelebration={setShowCelebration} />
        }

        {/* celebration modal */}
        {showCelebration &&
          <div className="flex items-center hs-overlay size-full w-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none bg-neutral-900/50" role="dialog" tabIndex="-1">
            <div className="sm:max-w-lg sm:w-full sm:mx-auto mt-10 w-full">
              <div className="w-full max-h-full overflow-hidden flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-neutral-700/70">
                <div className="flex justify-end items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-800">
                  <button type="button" onClick={() => { setShowCelebration(false) }} className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close">
                    <CloseIcon />
                  </button>
                </div>

                <div className="p-4 md:p-7 text-xl text-gray-800">
                  🎉 🎉 🎉 Goal achieved ! Congratulations !
                </div>
              </div>
            </div>
          </div>
        } 
      </div>
    </div>
  )
}

export default Wishlist