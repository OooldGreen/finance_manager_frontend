import { useState, useEffect } from "react"
import { CloseIcon } from "../ui/Icon"
import Notification from "../Notification"
import accountsService from '../../services/accounts'

const AccountCreateForm = ({showForm, setShowForm, onSuccess}) => {
  const [error, setError] = useState(null)
  const [form, setFormData] = useState({
    name: '',
    type: 'CASH',
    remark: '',
    balance: 0,
    current: 'EUR'
  })
  const [accountTypes, setAccountTypes] = useState([])

  useEffect(() => {
    const getTypes =  async() => {
      const response = await accountsService.getAccountTypes()
      setAccountTypes(response.data)
    }
    getTypes()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await accountsService.createAccount(form)
      if (response.status == 201) {
        setShowForm(!showForm)
        onSuccess()
      }
    } catch (err) {
      setError('Create account failed')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleChange = (event) => {
    const { name, value} = event.target
    setFormData({ ...form, [name]: value })
  }
 
 return (
    <div>
      {error && <Notification message={error} type='error'></Notification>}
      <div className="flex items-center hs-overlay size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none bg-neutral-900/50" role="dialog" tabIndex="-1">
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 ease-out transition-all sm:max-w-lg sm:w-full sm:mx-auto mt-10">
          <div className="max-h-full overflow-hidden flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-800">
              <h3 id="hs-bg-gray-on-hover-cards-label" className="font-bold text-gray-800 dark:text-neutral-200">
                Create Account
              </h3>
              <button type="button" onClick={() => { setShowForm(!showForm) }} className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close">
                <CloseIcon />
              </button>
            </div>

            <div className="p-4 sm:p-7">
              <form onSubmit={ handleSubmit } className="space-y-6">
                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">Name</label>
                  <div className="mt-2">
                    <input 
                      type="text"
                      name="name"
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></input>
                  </div>
                </div>

                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">Type</label>
                  <div className="relative mt-2 w-full">
                    <select className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700 py-3 px-4 pr-10 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer">
                      {accountTypes.map((type) => (
                        <option key={type}>{type === 'CASH' ? 'Cash' : type.charAt(0) + type.slice(1).toLowerCase()}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">Remark</label>
                  <div className="mt-2">
                    <input 
                      type="text"
                      name="remark"
                      onChange={handleChange}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    ></input>
                    </div>
                </div>

                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">Balance</label>
                  <div className="mt-2">
                    <input
                      type="number"
                      step="0.01"
                      name="balance"
                      onChange={handleChange}
                      placeholder="0.00"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    ></input>
                  </div>
                </div>

                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">Currency</label>
                  <div className="relative mt-2 w-full">
                    <select className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700 py-3 px-4 pr-10 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer">
                      <option key="1">EUR</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Add Account
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

export default AccountCreateForm