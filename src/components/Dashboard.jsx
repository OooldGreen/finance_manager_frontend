import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedFinanceUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
    } else {
        navigate('/')
    }
  }, [navigate])

  // we do not show anything without user information
  if (!user) return null

  return (
    <div>
        <h1>Dashboard</h1>
        <h2>Welcome {user.username}</h2>
    </div>
  )
}

export default Dashboard