import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast'
import usersService from '../services/users'
import AuthContext from '../components/context/AuthContext'

const Signin = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [remember, setRemember] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials({...credentials, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await usersService.login(credentials, remember)
      console.log(response)
      window.localStorage.setItem('loggedFinanceUser', JSON.stringify(response.data))
      
      setUser(response.data)
      navigate('/dashboard')
    } catch(error) {
      toast.error('Invalid username or password.')
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-full flex-col bg-gray-100 dark:bg-neutral-800 justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      
      <div className="mt-10 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="p-4 sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div >
              <label className="block text-sm/6 font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input type="text" name="username" onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"></input>
              </div>
            </div>
            <div >
              <label className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              
              <div className="mt-2">
                <input type="password" name="password" onChange={handleChange} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"></input>
              </div>
            </div>

            {/* <!-- Checkbox remember me --> */}
            <div className="flex items-center">
              <div className="flex">
                <input 
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
              </div>
              <div className="ms-3">
                <label className="text-sm dark:text-white">Remember me</label>
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* create new account */}
      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?{' '}
        <a href="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
          Sign up here
        </a>
      </p>
    </div>
   )
}

export default Signin