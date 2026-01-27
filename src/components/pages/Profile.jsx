import { useNavigate } from "react-router-dom"
import UserForm from "../forms/UserForm"
import { userAuth } from '../../services/utils/userAuth'

const Profile = () => {
  const { user } = userAuth()
  const navigate = useNavigate()

  const handleClose = () => {
    navigate(-1)
  }

  const handleCancel = () => {

  }

  const handleSubmit = () => {

  }

  const submitButton = (
    <>
      {/* button */}
      <div className="mt-5 flex justify-end gap-x-2">
        <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white  hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
          Save
        </button>
        <button onClick={handleCancel} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
          Cancel
        </button>
      </div>
    </>
  )
  
  return (
    <div>
      <div id="hs-ai-modal" className="hs-overlay size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none bg-neutral-900/50" role="dialog" tabIndex="-1" aria-labelledby="hs-ai-modal-label">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto mt-10">
          <div className="relative flex flex-col bg-white shadow-lg rounded-xl pointer-events-auto dark:bg-neutral-800">
            <div className="relative overflow-hidden min-h-32 bg-gray-900 text-center rounded-t-xl dark:bg-neutral-950">
              <div className="absolute top-2 end-2">
                <button onClick={handleClose} type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-white/10 text-white hover:bg-white/20 focus:outline-hidden focus:bg-white/20 disabled:opacity-50 disabled:pointer-events-none" aria-label="Close" data-hs-overlay="#hs-bg-gray-on-hover-cards" data-hs-remove-element="#hs-ai-modal">
                  <span className="sr-only">Close</span>
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>

              <figure className="absolute inset-x-0 bottom-0 -mb-px">
                <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1920 100.1">
                  <path fill="currentColor" className="fill-white dark:fill-neutral-800" d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"></path>
                </svg>
              </figure>
            </div>

            <div className="relative z-10 -mt-12">
              <span className="mx-auto flex justify-center items-center size-15.5 rounded-full border border-gray-200 bg-white text-gray-700 shadow-2xs dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </span>
            </div>


            <div className="p-4 sm:p-7 overflow-y-auto">
              <div className="text-center">
                <h3 id="hs-ai-modal-label" className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  {user.username}
                </h3>
              </div>

              {/* user information */}
              <UserForm mode="profile" submitButton={submitButton} handleSubmit={handleSubmit} user={user}/>

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

export default Profile