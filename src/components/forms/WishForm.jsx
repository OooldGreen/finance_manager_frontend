import { useState, useEffect } from "react"
import { toast } from 'react-hot-toast'
import { CloseIcon } from "../ui/Icon"
import wishlistsService from "../../services/wishlists"

const WishForm = ({ mode, setShowForm, wish, onSuccess }) => {
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    title: wish?.title || '',
    description: wish?.description || '',
    targetAmount: wish?.targetAmount || 0,
    currentAmount: wish?.currentAmount || 0,
    currency: wish?.currency || 'EUR',
    category: wish?.category || 'OTHERS'
  })

  useEffect(() => {
    const getCategories =  async() => {
      const response = await wishlistsService.getCategories()
      setCategories(response.data)
    }
    getCategories()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (mode === 'create') {
        const response = await wishlistsService.createGoal(formData)
        if (response.status === 200) {
          onSuccess()
          setShowForm(false)
          setFormData({
            title: '',
            description: '',
            targetAmount: 0,
            currentAmount: 0,
            currency: 'EUR',
            category: 'OTHERS'
          })
          toast.success('Create wish successfully')
        }
      } else {
        const response = await wishlistsService.updateGoal(wish.id, formData)
        console.log(response.status)
        if (response.status === 200) {
          onSuccess()
          setShowForm(false)
          setFormData({
            title: '',
            description: '',
            targetAmount: 0,
            currentAmount: 0,
            currency: 'EUR',
            category: 'OTHERS'
          })
          toast.success('Update wish successfully')
        }
      }
    } catch (err) {
      toast.error('Create wish failed')
      console.log(err)
    }
  }

  const handleChange = (event) => {
    const { name, value} = event.target
    setFormData({ ...formData, [name]: value })
  }
 
 return (
    <div>
      <div className="flex items-center hs-overlay size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto pointer-events-none bg-neutral-900/50" role="dialog" tabIndex="-1">
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 ease-out transition-all sm:max-w-lg sm:w-full sm:mx-auto mt-10">
          <div className="max-h-full overflow-hidden flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-800">
              <h3 id="hs-bg-gray-on-hover-cards-label" className="font-bold text-gray-800 dark:text-neutral-200">
                {mode === 'create' ? 'New Wish' : 'Edit Wish'}
              </h3>
              <button type="button" onClick={() => { setShowForm(false) }} className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close">
                <CloseIcon />
              </button>
            </div>

            <div className="p-4 md:p-7">
              <form onSubmit={ handleSubmit } className="space-y-6">
                {/* title */}
                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">Title</label>
                  <div className="mt-2">
                    <input 
                      type="text"
                      name="title"
                      onChange={handleChange}
                      required
                      value={formData.title}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"></input>
                  </div>
                </div>

                {/* discription */}
                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">Description</label>
                  <div className="mt-2">
                    <input 
                      type="text"
                      name="description"
                      onChange={handleChange}
                      value={formData.description}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                    ></input>
                    </div>
                </div>

                {/* type */}
                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">Type</label>
                  <div className="relative mt-2 w-full">
                    <select name='category' onChange={handleChange} value={formData.category.charAt(0) + formData.category.slice(1).toLowerCase()} className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700 py-3 px-4 pr-10 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer">
                      {categories.map((category) => (
                        <option key={category}>{category.charAt(0) + category.slice(1).toLowerCase()}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* target amount and currency */}
                <div className="grid grid-cols-2 gap-4">
                  {/* target amount */}
                  <div>
                    <label className="block text-sm/6 font-medium text-gray-900">Target</label>
                    <div className="mt-2">
                      <input
                        type="number"
                        step="0.01"
                        name="targetAmount"
                        onChange={handleChange}
                        placeholder="0.00"
                        value={formData.targetAmount}
                        className="block w-full rounded-md bg-white px-4 py-2.2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                      ></input>
                    </div>
                  </div>

                  {/* currency */}
                  <div>
                    <label className="block text-sm/6 font-medium text-gray-900">Currency</label>
                    <div className="relative mt-2 w-full">
                      <select className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700 py-3 px-4 pr-10 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer">
                        <option key="1">EUR</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <button type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    {mode === 'create' ? 'Create' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>     
        </div>
      </div>
    </div>
 )
}

export default WishForm