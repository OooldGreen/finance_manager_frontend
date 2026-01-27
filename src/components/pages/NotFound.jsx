import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate(-1)
  }

  return (
    <div>
      <div className="max-w-3xl flex flex-col mx-auto size-full items-center min-h-screen">
        <main id="content" className="flex flex-1 items-center min-h-screen">
          <div className="text-center py-10 px-4 sm:px-6 lg:px-8 ">
            <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">404</h1>
            <p className="mt-3 text-gray-600 dark:text-neutral-400">Oops, something went wrong.</p>
            <p className="text-gray-600 dark:text-neutral-400">Sorry, we couldn't find your page.</p>
            <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
              <button onClick={handleClose} className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Back to Home
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
    )
}

export default NotFound