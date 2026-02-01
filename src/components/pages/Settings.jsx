import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PasswordChangingForm from "../forms/PasswordChangingForm"

const Settings= () => {
  const navigate = useNavigate()
  const [showPasswordChangingForm, setShowPasswordChangingForm] = useState(null)

  const handleShowPasswordChangingForm = () => {
    setShowPasswordChangingForm(!showPasswordChangingForm)
  }

  const handleClose = () => {
    navigate(-1)
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
                  <button type="submit" className="py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-gray-100 text-red-700 hover:bg-red-700 hover:text-white focus:outline-hidden focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">Delete your account</button>
                </div>
              </div>

              <div className="mt-5 sm:mt-10">
                <p className="text-sm text-gray-500 dark:text-neutral-500">If you have any questions, please contact us at <a className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="#">example@site.com</a> or call at <a className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="tel:+1898345492">+1 898-34-5492</a></p>
              </div>
            </div>
          </div>     
        </div>
      </div>
    </div>
  )
}

export default Settings