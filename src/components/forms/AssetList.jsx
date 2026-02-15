import { CreditCardIcon } from "../ui/Icon"

const AssetList = ({accounts, onAccountClick}) => {
  return (
    <div className="px-8 rounded-xl block bg-white bg-layer focus:outline-hidden divide-y divide-gray-200 dark:divide-neutral-800">
        {accounts.map(account => (
          <div className="flex items-center gap-x-7 py-6" key={account.id}>
            <CreditCardIcon className="shrink-0 size-6 mt-1.5 text-gray-800 dark:text-neutral-200"/>
            <button className="w-full text-left grow" onClick={ () => { onAccountClick(account.id) } }>
              <h3 className="font-semibold text-gray-800 dark:text-neutral-200">{account.name}</h3>
              {account.remark && <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">remark: {account.remark}</p>}
              <a className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">
                €{account.balance}
              </a>
            </button>
          </div>
        ))}
    </div>
  )
} 

export default AssetList