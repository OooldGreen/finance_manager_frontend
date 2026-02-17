import Notification from '../../components/Notification'

const UserForm = ({mode, handleSubmit, submitButton, user, setUser}) => {
  const hiddenPassword = mode === 'profile' ? true : false

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setUser({...user, [name]: value})
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Username</label>
          <div className="mt-2">
          <input 
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></input>
          </div>
        </div>

        {/* if mode = profile, hide password and confirmPassword input */}
        {!hiddenPassword && (
            <>
              <div>
                <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                <div className="mt-2">
                  <input 
                    type="password"
                    name="password"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  ></input>
                </div>
              </div>
              <div>
                <label className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  ></input>
                </div>
              </div>
            </>
        )}

        <div>
          <label className="block text-sm/6 font-medium text-gray-900">First name</label>
          <div className="mt-2">
            <input 
              type="text"
              name="firstName"
              value={user?.firstName || ''}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            ></input>
          </div>
        </div>
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Last name</label>
          <div className="mt-2">
            <input
              type="text"
              name="lastName"
              value={user?.lastName || ''}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            ></input>
          </div>
        </div>
        <div>
          <label className="block text-sm/6 font-medium text-gray-900">Date of birth</label>
          <div className="mt-2">
            <input 
              type="date"
              name="dateOfBirth"
              value={user?.dateOfBirth || ''}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white" 
              placeholder="Select date"></input>
            </div>
        </div>
        
        {submitButton}
      </form>
    </div>
  )
}

export default UserForm