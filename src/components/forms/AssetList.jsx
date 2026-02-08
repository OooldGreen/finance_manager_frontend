import { ViewIcon, PlusIcon, CreditCardIcon, ArcIcon } from "../ui/Icon"

const AssetList = ({accounts}) => {
  return (
    <div className="px-8 rounded-xl block bg-white bg-layer focus:outline-hidden divide-y divide-gray-200 dark:divide-neutral-800">
        {accounts.map(account => (
          <div className="flex items-center gap-x-7 py-6" key={account.id}>
            <CreditCardIcon className="shrink-0 size-6 mt-1.5 text-gray-800 dark:text-neutral-200"/>
            <div className="grow">
              <h3 className="font-semibold text-gray-800 dark:text-neutral-200">{account.name}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">We're here to help with any questions or code.</p>
              <a className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">
                €{account.balance}
                <svg className="shrink-0 size-2.5 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
    </div>
  )
} 

export default AssetList