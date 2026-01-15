import { useState } from "react"


const Signup = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    date_of_birth: ''
  })

  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser({...user, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // handleSumit 逻辑
    // axios 请求
  }

 return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <p>Username: <input type="text" onChange={handleChange}></input></p>
        <p>Password: <input type="password" onChange={handleChange}></input></p>
        <p>Confirm Password: <input type="password" onChange={handleChange}></input></p>
        <p>First name: <input type="text" onChange={handleChange}></input></p>
        <p>Last name: <input type="text" onChange={handleChange}></input></p>
        <p>Date of birth: <input type="date" onChange={handleChange}></input> </p>
        <button type="submit">Sign up</button>
      </form>
    </div>
  )
}

export default Signup