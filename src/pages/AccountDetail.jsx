import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast'
import AccountCard from "../components/forms/AccountCard"
import { ArrowLeftIcon } from '../components/ui/Icon'
import accountsService from '../services/accounts'

const AccountDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [accountDetail, setAccountDetail] = useState({
    name : '',
    balance: 0,
    remark: '',
    currency: 'EUR'
  })
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async() => {
      try {
        const response = await accountsService.getAccountDetail(id)
        const detail = response.data
        if (detail.id) {
          setAccountDetail({
            name: detail.name,
            balance: detail.balance,
            remark: detail.remark || '',
            currency: detail.currency || 'EUR'
          })
        }
      } catch (err) {
        toast.error('Failed to get account detail')
      }
    }
    getData()
    setLoading(false)
  }, [])

  const onSaveSuccess = async () => {
    const response = await accountsService.getAccountDetail(id)
    const detail = response.data
    if (detail.id) {
      setAccountDetail({
        name: detail.name,
        balance: detail.balance,
        remark: detail.remark || '',
        currency: detail.currency || 'EUR'
      })
    }
    setShowForm(!setShowForm)
    toast.success('Modify account information successed.')
  }

  if(loading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 gap-6 p-8 md:p-12 max-w-3xl mx-auto">
        <div className="flex flex-col bg-white bg-card rounded-xl">
          <div className="flex items-center px-4 pt-10 h-3 flex text-gray-500 justify-between md:px-10 md:pt-10">
            <button onClick={() => navigate(-1)}><ArrowLeftIcon className="hover:text-gray-700 w-4"/></button>
            <button className="bg-gray-100 text-xs px-2 py-1 rounded-md hover:bg-gray-200 transition-colors duration-200" onClick={() => setShowForm(!showForm)}>More</button>
          </div>
          <div className="p-4 relative z-10 bg-card rounded-xl md:px-10 md:pb-10 md:pt-8">
            <h3 className="text-xl font-bold text-foreground">{accountDetail.name}</h3>
            <div className="mt-3">
              <span className="text-4xl font-bold text-foreground">€{accountDetail.balance}</span>
            </div>
          </div>
        </div>
      </div>

      {showForm &&
        <AccountCard showForm={showForm} setShowForm={setShowForm} accountDetail={accountDetail} accountId={id} onSaveSuccess={onSaveSuccess}/>
      }
    </div>
  )
}

export default AccountDetail