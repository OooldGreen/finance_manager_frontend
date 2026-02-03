import { ViewIcon, PlusIcon } from "../ui/Icon"

const AssetGrid = () => {
  return (
    <div>
      <a className="block bg-white bg-layer rounded-lg hover:shadow-2xs focus:outline-hidden" href="#">
        <div className="relative flex items-center overflow-hidden">
          <img className="w-32 sm:w-48 h-full absolute inset-0 object-cover rounded-s-lg" src="https://images.unsplash.com/photo-1661956600655-e772b2b97db4?q=80&w=560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Blog Image"/>
          <div className="grow p-4 ms-32 sm:ms-48">
            <div className="min-h-24 flex flex-col justify-center">
              <h3 className="font-semibold text-sm text-foreground">
                Acount 1
              </h3>
              <p className="mt-1 text-sm text-muted-foreground-2">
                Produce professional, reliable streams easily leveraging Mailchimp's innovative broadcast studio.
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
} 

export default AssetGrid