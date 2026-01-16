import { useState } from "react"
import { useNavigate } from "react-router-dom"
import loginService from '../services/users'
import Notification from "./Notification"

const Signin = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials({...credentials, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedFinanceUser', JSON.stringify(user))
      navigate('/dashboard')
    } catch {
      setError('Invalid username or password.')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Sign in</h2>
      <Notification message={error} className='error'></Notification>
      <form onSubmit={handleSubmit}>
        <p>Username: <input type="text" onChange={handleChange}></input></p>
        <p>Password: <input type="password" onChange={handleChange}></input></p>
        <button type="submit">Sign in</button>
      </form>
    </div>
   )
}

export default Signin