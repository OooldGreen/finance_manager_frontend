import AssetGrid from "../components/forms/AssetGrid"
import { PlusIcon } from "../components/ui/Icon"

const Assets = () => {
  return (
    <div className="w-full bg-gray-100">
      <div className="grid grid-cols-1 gap-6 p-8 md:p-12 max-w-3xl mx-auto">
        <div className="min-h-50 flex flex-col bg-white bg-card shadow-2xs rounded-xl">
          <div className="p-4 sm:p-6">
            <h3 className="font-semibold text-foreground">
              Total Assets
            </h3>
            <p className="mt-1 text-muted-foreground-1">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
    
          </div>
        </div>
        <AssetGrid />
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