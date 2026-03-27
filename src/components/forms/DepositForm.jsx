import { useState } from "react"
import { toast } from 'react-hot-toast'
import confetti from 'canvas-confetti'
import { CloseIcon } from "../ui/Icon"
import wishlistsService from "../../services/wishlists"

const DepositForm = ({ setForm, data, onSuccess, setShowCelebration }) => {
  const [amount, setAmount] = useState(0)

  const handleDeposit = async () => {
    const saveAmount = parseFloat(amount)
    const remaining = parseFloat(data?.remaining || 0)
    if (isNaN(saveAmount) || saveAmount <= 0) {
      toast.error(`Please enter an amount greater than 0`)
      return
    }
    if (saveAmount > remaining) {
      toast.error(`Please enter an amount less than € ${data.remaining}`)
      return 
    }

    try {
      const response = await wishlistsService.updateAmount(data.wishId, saveAmount)
      if (response.status === 200) {
        console.log(response.data)
        if (response.data.status === 'ACHIEVED') {
          setShowCelebration(true)
          console.log('congratulations!')
          confetti()
        }
        setForm({
          ...data,
          show: false
        })
        onSuccess()
      }
    } catch (err) {
      toast.error('Fail to save deposit')
    }
  }

  const handleSaveAll = () => {
    setAmount(data.remaining)
  }

  return (
    <div className="flex items-center hs-overlay size-full w-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none bg-neutral-900/50" role="dialog" tabIndex="-1">
      <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 ease-out transition-all sm:max-w-lg sm:w-full sm:mx-auto mt-10 w-full">
        <div className="w-full max-h-full overflow-hidden flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-neutral-700/70">
          <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-800">
            <h3 id="hs-bg-gray-on-hover-cards-label" className="font-bold text-gray-800 dark:text-neutral-200">
              Deposit
            </h3>
            <button type="button" onClick={() => { setForm({...data, show: false}) }} className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close">
              <CloseIcon />
            </button>
          </div>

          <div className="p-4 md:p-7 w-full">
            <div className="flex gap-2 w-full justify-center items-center text-gray-600 text-md">
              <div className="flex-shrink-0">Input an amount : </div>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="block w-full rounded-md bg-white px-4 py-2.2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
              ></input>
              <div className="flex-shrink-0">EUR</div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Need € {data.remaining} to reach your goal. <button onClick={handleSaveAll} className="text-blue-600 hover:text-blue-700 hover:underline">save all</button>
            </div>
            
            <button type="submit" onClick={handleDeposit} className="mt-8 flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Save
            </button>
          </div>
        </div>     
      </div>
    </div>
  )
}

export default DepositForm