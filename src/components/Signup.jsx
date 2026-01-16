import { useState } from "react"
import { useNavigate } from "react-router-dom"
import userService from '../services/users'
import Notification from '../components/Notification'

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
      const response = await userService.createUser(user)
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

 return (
    <div>
      <Notification message={error} className='error'></Notification>
      <Notification message={hint} className='hint'></Notification>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <p>Username: <input type="text" name="username" onChange={handleChange} required></input></p>
        <p>Password: <input type="password" name="password" onChange={handleChange} required></input></p>
        <p>Confirm Password: <input type="password" name="confirmPassword" onChange={handleChange} required></input></p>
        <p>First name: <input type="text" name="firstName" onChange={handleChange}></input></p>
        <p>Last name: <input type="text" name="lastName" onChange={handleChange}></input></p>
        <p>Date of birth: <input type="date" name="dateOfBirth" onChange={handleChange}></input> </p>
        <button type="submit">Sign up</button>
      </form>
    </div>
  )
}

export default Signup