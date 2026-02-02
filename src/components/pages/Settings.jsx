import { useState } from "react"
import { useNavigate } from "react-router-dom"
import usersService from '../../services/users'
import PasswordChangingForm from "../forms/PasswordChangingForm"
import Notification from "../Notification"

const Settings= () => {
  const navigate = useNavigate()
  const [showPasswordChangingForm, setShowPasswordChangingForm] = useState(null)
  const [error, setError] = useState(null)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const handleShowPasswordChangingForm = () => {
    setShowPasswordChangingForm(!showPasswordChangingForm)
  }

  const handleClose = () => {
    navigate(-1)
  }

  const handleDeleteAccount = async () => {
    try {
      const response = await usersService.deleteUser()
      if (response.status == 204) {
        usersService.logout()
        navigate('/signin', { replace: true })
      }
    } catch {
      setError("Fail to delete user")
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  if(showConfirmDelete) {
    return (
      <div>
        {error && <Notification type="error" message={error}></Notification>}
        <div className="flex items-center hs-overlay size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto bg-neutral-900/50">
          <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto">
            <div className="relative flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
              <div className="absolute top-2 end-2">
                <button type="button" onClick={() => setShowConfirmDelete(!setShowConfirmDelete)} className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-danger-alert">
                  <span className="sr-only">Close</span>
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>

              <div className="p-4 sm:p-10 overflow-y-auto">
                <div className="flex gap-x-4 md:gap-x-7">
                  <span className="shrink-0 inline-flex justify-center items-center size-11 sm:w-15.5 sm:h-15.5 rounded-full border-4 border-red-50 bg-red-100 text-red-500 dark:bg-red-700 dark:border-red-600 dark:text-red-100">
                    <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                  </span>

                  <div className="grow">
                    <h3 id="hs-danger-alert-label" className="mb-2 text-xl font-bold text-gray-800 dark:text-neutral-200">
                      Delete Personal Account
                    </h3>
                    <p className="text-gray-500 dark:text-neutral-500">
                      Permanently remove your Personal Account and all of its contents. Once you delete your account, there is no going back. Please be certain.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t border-gray-200 dark:bg-neutral-950 dark:border-neutral-800">
                <button type="button" onClick={() => setShowConfirmDelete(!setShowConfirmDelete)} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" data-hs-overlay="#hs-danger-alert">
                  Cancel
                </button>
                <button onClick={handleDeleteAccount} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none">
                  Delete personal account
                </button>
              </div>
            </div>
          </div>
        </div> 
      </div>
    )
  }
  
  return (
    <div>
      <div id="hs-bg-gray-on-hover-cards" className="flex items-center hs-overlay size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none bg-neutral-900/50" role="dialog" tabIndex="-1" aria-labelledby="hs-bg-gray-on-hover-cards-label">
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 ease-out transition-all sm:max-w-lg sm:w-full sm:mx-auto mt-10">
          <div className="max-h-full overflow-hidden flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-800">
              <h3 id="hs-bg-gray-on-hover-cards-label" className="font-bold text-gray-800 dark:text-neutral-200">
                Settings
              </h3>
              <button type="button" onClick={handleClose} className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay="#hs-bg-gray-on-hover-cards">
                <span className="sr-only">Close</span>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className="p-4 sm:p-7 overflow-y-auto">
              {/* password */}
              <div className="sm:col-span-3">
                <h3 className="text-base font-bold text-gray-800 dark:text-neutral-200">
                  Password
                </h3>
              </div>
              <div className="sm:col-span-12 mt-2 mb-5 border-t border-gray-200 dark:border-neutral-700"></div>
              <div>
                {!showPasswordChangingForm && <button type="button" onClick={handleShowPasswordChangingForm} className="py-2 px-4 inline-flex justify-center items-center gap-x-2 font-medium rounded-lg border border-gray-200 bg-gray-100 text-sm font-medium text-blue-600 hover:bg-blue-700 hover:text-white">Reset Password</button>}
                {showPasswordChangingForm && <PasswordChangingForm showPasswordChangingForm={showPasswordChangingForm} setShowPasswordChangingForm={setShowPasswordChangingForm}/>}
              </div>

              {/* delete account */}
              <div className="mt-8">
                <div className="sm:col-span-3">
                  <h2 className="text-base font-bold text-red-700 dark:text-neutral-200">
                    Delete Account
                  </h2>
                </div>
                <div className="sm:col-span-12 my-2 border-t border-gray-200 dark:border-neutral-700"></div>
                <div className="text-xs text-gray-500 dark:text-neutral-400">Once you delete your account, there is no going back. Please be certain.</div>
                <div className="sm:col-span-12 mt-5">
                  <button type="button" onClick={() => setShowConfirmDelete(!showConfirmDelete)} className="py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-gray-100 text-red-700 hover:bg-red-700 hover:text-white focus:outline-hidden focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">Delete your account</button>
                </div>
              </div>

              

              <div className="mt-5 sm:mt-10">
                {/* <p className="text-sm text-gray-500 dark:text-neutral-500">If you have any questions, please contact us at <a className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="#">example@site.com</a></p> */}
              </div>
            </div>
          </div>     
        </div>
      </div>
    </div>
  )
}

export default Settings