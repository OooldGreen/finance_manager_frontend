import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CloseIcon, WarningIcon } from "../ui/Icon"
import accountsService from '../../services/accounts'

const AccountCard = ({ showForm, setShowForm, accountDetail, accountId, onSaveSuccess }) => {
  const navigate = useNavigate()
  const [accountTypes, setAccountTypes] = useState([])
  const [showModifyForm, setShowModifyForm] = useState(false)
  const [newAccountDetail, setNewAccountDetail] = useState({...accountDetail})
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  useEffect(() => {
    const getTypes = async () => {
      try {
        const typeResponse = await accountsService.getAccountTypes()
        setAccountTypes(typeResponse.data)
      } catch (err) {
        console.log('Fail to get account types', err)
      }
    }
    getTypes()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await accountsService.updateAccountDetail(accountId, newAccountDetail)
      if (response.status == 200) {
        onSaveSuccess()
      }
    } catch (err) {
      console.log('Failed to save changes', err)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewAccountDetail({ ...newAccountDetail, [name]: value })
  }

  const handleDeleteAccount = async () => {
    try {
      const response = await accountsService.deleteAccount(accountId)
      if (response.status == 204) {
        setShowForm(!showForm)
        navigate('/assets')
      }
    } catch (err) {
      console.log('Failed to delete asset account', err)
    }
  }

  if(showConfirmDelete) {
    return (
      <div>
        <div className="flex items-center hs-overlay size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto bg-neutral-900/50">
          <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto">
            <div className="relative flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
              <div className="p-4 sm:p-10 overflow-y-auto">
                <div className="flex gap-x-4 md:gap-x-7">
                  <span className="shrink-0 inline-flex justify-center items-center size-11 sm:w-15.5 sm:h-15.5 rounded-full border-4 border-red-50 bg-red-100 text-red-500 dark:bg-red-700 dark:border-red-600 dark:text-red-100">
                    <WarningIcon />
                  </span>

                  <div className="grow">
                    <h3 id="hs-danger-alert-label" className="mb-2 text-xl font-bold text-gray-800 dark:text-neutral-200">
                      Delete Asset Account
                    </h3>
                    <p className="text-gray-500 dark:text-neutral-500">
                      Permanently remove your asset account and all of its contents. There is no going back. Please be certain.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t border-gray-200 dark:bg-neutral-950 dark:border-neutral-800">
                <button type="button" onClick={() => setShowConfirmDelete(!setShowConfirmDelete)} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" data-hs-overlay="#hs-danger-alert">
                  Cancel
                </button>
                <button onClick={handleDeleteAccount} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none">
                  Delete account
                </button>
              </div>
            </div>
          </div>
        </div> 
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-10 flex items-center hs-overlay size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none bg-neutral-900/50" role="dialog" tabIndex="-1">
      <div className="max-h-[90vh] hs-overlay-open:opacity-100 hs-overlay-open:duration-500 ease-out transition-all sm:max-w-lg sm:w-full sm:mx-auto mt-10">
        <div className="overflow-hidden flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-neutral-700/70">
          <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-800">
            <h3 id="hs-bg-gray-on-hover-cards-label" className="font-bold text-gray-800 dark:text-neutral-200">
              {accountDetail.name}
            </h3>
            <button type="button" onClick={() => { setShowForm(!showForm) }} className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close">
              <CloseIcon />
            </button>
          </div>

          <div className="p-4 sm:p-7 overflow-y-auto">
            {/* modify account */}
              <div className="sm:col-span-3">
                <h3 className="text-base font-bold text-gray-800 dark:text-neutral-200">
                  Modify Account
                </h3>
              </div>
              <div className="sm:col-span-12 mt-4 mb-5">
                {!showModifyForm && <button type="button" onClick={ () => {setShowModifyForm(!showModifyForm)} } className="py-2 px-4 inline-flex justify-center items-center gap-x-2 font-medium rounded-lg border border-gray-200 bg-gray-100 text-sm font-medium text-blue-600 hover:bg-blue-700 hover:text-white">Modify asset account</button>}
                {showModifyForm && 
                  <AccountModifyForm 
                    newAccountDetail={newAccountDetail}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    setShowModifyForm={setShowModifyForm}
                    showModifyForm={showModifyForm}
                    accountTypes={accountTypes}
                  />}
              </div>
            {/* delete account */}
            <div className="mt-8 my-5">
              <div className="sm:col-span-3">
                <h2 className="text-base font-bold text-red-700 dark:text-neutral-200">
                  Delete Account
                </h2>
              </div>
              <div className="sm:col-span-12 my-2 border-t border-gray-200 dark:border-neutral-700"></div>
              <div className="text-xs text-gray-500 dark:text-neutral-400">Once you delete your account, there is no going back. Please be certain.</div>
              <div className="sm:col-span-12 mt-5">
                <button type="button" onClick={() => setShowConfirmDelete(!showConfirmDelete)} className="py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-gray-100 text-red-700 hover:bg-red-700 hover:text-white focus:outline-hidden focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">Delete asset account</button>
              </div>
            </div>
            <div className="mt-5 sm:mt-10"></div>
          </div>
        </div>     
      </div>
    </div>
  )
}

const AccountModifyForm = ({ newAccountDetail, handleChange, handleSubmit, setShowModifyForm, showModifyForm, accountTypes }) => {
  return (
    <div>
      <form onSubmit={ handleSubmit } className="space-y-6">
        {/* account name */}
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Name</label>
          <div className="mt-2">
            <input 
              type="text"
              name="name"
              onChange={handleChange}
              required
              value={newAccountDetail.name}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></input>
          </div>
        </div>

        {/* account type */}
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Type</label>
          <div className="relative mt-2 w-full">
            <select 
              name="type"
              value={newAccountDetail?.type || 'Cash'}
              onChange={handleChange}
              className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700 py-3 px-4 pr-10 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer"
            >
              {accountTypes.map((type) => (
                <option key={type} value={type}>{type === 'CASH' ? 'Cash' : type.charAt(0) + type.slice(1).toLowerCase()}</option>
              ))}
            </select>
          </div>
        </div>

        {/* account remark */}
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Remark</label>
          <div className="mt-2">
            <input 
              type="text"
              name="remark"
              onChange={handleChange}
              value={newAccountDetail.remark}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            ></input>
          </div>
        </div>

        {/* account balance */}
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Balance</label>
          <div className="mt-2">
            <input
              type="number"
              step="0.01"
              name="balance"
              onChange={handleChange}
              placeholder="0.00"
              value={newAccountDetail.balance}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            ></input>
          </div>
        </div>

        {/* account currency */}
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Currency</label>
          <div className="relative mt-2 w-full">
            <select
              name="currency"
              value={newAccountDetail?.currency || 'EUR'}
              onChange={handleChange}
              className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700 py-3 px-4 pr-10 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer"
            >
              <option key="1" value="EUR">EUR</option>
            </select>
          </div>
        </div>

        {/* buttons */}
        <div className="mt-5 flex justify-end gap-x-2">
          <button type="button" onClick={() => { setShowModifyForm(!showModifyForm) }} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
            Cancel
          </button>
          <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            Save changes
          </button>
        </div>
      </form>
    </div>
)}

export default AccountCard