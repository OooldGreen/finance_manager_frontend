import { useState } from "react"
import { useNavigate } from "react-router-dom"
import usersService from '../services/users'
import UserForm from "./forms/UserForm"

const Signup = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: null,
    lastName: null,
    dateOfBirth: null
  })

  const [error, setError] = useState(null)
  const [hint, setHint] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser({...user, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)

    if (!user.username || !user.password || !user.confirmPassword) {
      setError('Username and password are required.')
      return
    }

    // verify password
    if (user.confirmPassword !== user.password) {
      setError('Password do not match. Try again.')
      return
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (!passwordRegex.test(user.password)) {
      setError('Password must be at least 8 caracters, including uppercase, lowercase and a number.')
      return
    }

    // axios post
    try {
      const response = await usersService.createUser(user)
      console.log(response)
      if (response.status === 201 || response.status === 200) {
        setHint('Registration success!')
        navigate('/signin')
      }
    } catch (err) {
      setError(err.response.data || 'An error occurred.')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const submitButton = (
    <>
      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
      </div>
    </>
  )

 return (
    <div className="flex min-h-full bg-gray-100 dark:bg-neutral-800 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign up</h2>
      </div>

      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-900 dark:border-neutral-700 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="p-4 sm:p-10">
          <UserForm mode="signup" submitButton={submitButton} handleSubmit={handleSubmit} user={user}/>
        </div>
      </div>

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Already have an account?{' '}
        <a href="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Sign in here
        </a>
      </p>
    </div>
  )
}

export default Signup