const ConfirmDeleteModal = ({showConfirmDelete, setShowConfirmDelete, message, onConfirm}) => {
  return (
    <div>
      <div className="flex items-center hs-overlay size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto bg-neutral-900/50">
        <div className="mt-0 ease-out transition-all md:max-w-md md:w-full m-3 md:mx-auto">
          <div className="relative flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
            <div className="p-4 sm:p-10 overflow-y-auto">
              <div className="flex gap-x-4 md:gap-x-7">
                <p className="text-l text-gray-800 dark:text-neutral-200">
                  {message}
                </p>
              </div>
          </div>

          <div className="flex justify-end items-center gap-x-2 py-2 px-4 bg-gray-50 border-t border-gray-200 dark:bg-neutral-950 dark:border-neutral-800">
            <button type="button" onClick={() => setShowConfirmDelete(!showConfirmDelete)} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" data-hs-overlay="#hs-danger-alert">
              Cancel
            </button>
            <button onClick={onConfirm} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50 disabled:pointer-events-none">
              Confirm
            </button>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default ConfirmDeleteModal