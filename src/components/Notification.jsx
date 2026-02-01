const Notification = ({ message, type }) => {

  const showSuccess = type === "success" ? true : false
  const showError = type === "error" ? true : false
  const showWarning = type === "warning" ? true : false

  if(message === null) {
    return null
  }

  return (
    <div>
      {
        showSuccess && 
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-md bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-500/20 dark:border-teal-900 dark:text-teal-400 shadoe-lg" role="alert" tabIndex="-1" aria-labelledby="hs-soft-color-success-label">
          <span id="hs-soft-color-success-label" className="font-bold">Success: </span> {message}
        </div>
      }
      {
        showError &&
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-md bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-500/20 dark:border-red-900 dark:text-red-400 shadoe-lg" role="alert" tabIndex="-1" aria-labelledby="hs-soft-color-danger-label">
          <span id="hs-soft-color-danger-label" className="font-bold">Error: </span>{message}
        </div>
      }
      {
        showWarning &&
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-md bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-500/20 dark:border-yellow-900 dark:text-yellow-400 shadoe-lg" role="alert" tabIndex="-1" aria-labelledby="hs-soft-color-warning-label">
          <span id="hs-soft-color-warning-label" className="font-bold">Warning: </span> {message}
        </div>
      }
    </div>
  )
}

export default Notification