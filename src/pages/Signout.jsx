import { useNavigate } from "react-router-dom"
import usersService from '../services/users'
import { WarningIcon } from "../components/ui/Icon"

const Signout = () => {
  const navigate = useNavigate()
  const handleClose = () => {
    navigate(-1)
  }

  const handleSignout = () => {
    usersService.logout()
    navigate('/signin', { replace: true })
  }

  return (
    <div id="hs-sign-out-alert-small-window" className="flex items-center hs-overlay size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto bg-neutral-900/50" role="dialog" tabIndex="-1" aria-labelledby="hs-sign-out-alert-small-window-label">
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 ease-out transition-all sm:max-w-xs sm:w-full m-3 sm:mx-auto">
        <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-neutral-900">

          <div className="p-4 sm:p-10 text-center overflow-y-auto">
            <span className="mb-4 inline-flex justify-center items-center size-15.5 rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500 dark:bg-yellow-700 dark:border-yellow-600 dark:text-yellow-100">
              <WarningIcon />
            </span>

            <h3 id="hs-sign-out-alert-small-window-label" className="mb-2 text-2xl font-bold text-gray-800 dark:text-neutral-200">
              Sign out
            </h3>
            <p className="text-gray-500 dark:text-neutral-500">
              Are you sure you would like to sign out of your account?
            </p>

            <div className="mt-6 grid gap-y-2">
              <button type="button" onClick={handleSignout} className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                Sign out
              </button>
              <button type="button" onClick={handleClose} className="py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" data-hs-overlay="#hs-sign-out-alert-small-window">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signout