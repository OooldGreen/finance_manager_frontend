import { useEffect, useState } from "react"
import AssetList from "../components/forms/AssetList"
import { PlusIcon } from "../components/ui/Icon"
import accountsService from "../services/accounts"

const Assets = () => {
  const [accounts, setAccounts] = useState([])
  const [assets, setAssets] = useState({
    total: 0,
    debts: 0,
    currency: "EUR"
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAccountsAndBalances = async () => {
      setLoading(true)
      try {
        const accountsResponse = await accountsService.getAllAccounts()
        const balancesResponse = await accountsService.getTotalBalances()
        setAccounts(accountsResponse.data)
        setAssets({
          total: balancesResponse.data.totalAssets || 0,
          debts: balancesResponse.data.totalDebts || 0,
          currency: balancesResponse.data.currency || "EUR"
        })
        setLoading(false)
      } catch (err) {
        console.log("error", err.message)
      }
    }
    getAccountsAndBalances()
  }, [])  

  if (loading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div className="w-full bg-gray-100">
      <div className="grid grid-cols-1 gap-6 p-8 md:p-12 max-w-3xl mx-auto">
        <div className=" flex flex-col bg-white bg-card rounded-xl">
          <div className="p-4 relative z-10 bg-card rounded-xl md:p-10">
            <h3 className="text-xl font-bold text-foreground">Total Assets</h3>
            <div className="mt-3">
              <span className="text-4xl font-bold text-foreground">€{assets.total + assets.debts}</span>
            </div>
            <div className=" mt-7 grid grid-cols-2 gap-4 sm:gap-6 md:gap-4 lg:gap-12">
              <div className="flex gap-4">
                <div className="grow">
                  <p className="text-gray-600 dark:text-neutral-400">
                    <span className="mr-4">Total</span> 
                    <span>€{assets.total}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="grow">
                  <p className="text-gray-600 dark:text-neutral-400">
                    <span className="mr-4">Debts</span>
                    <span>€{assets.debts}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AssetList accounts={accounts}/>
        <div className="min-h-20 flex flex-col bg-white bg-card shadow-2xs rounded-xl">
          <button className="p-4 flex flex-auto flex-col justify-center items-center">
            <span className="inline-flex justify-center items-center size-11 rounded-full bg-gray-100 text-foreground">
              <PlusIcon />
            </span>
            <p className="mt-2 text-sm text-foreground">
              Add an account
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Assets