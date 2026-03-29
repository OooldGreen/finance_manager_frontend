import { createContext, useState, useEffect } from 'react'
import usersService from '../../services/users'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await usersService.getUser()
        setUser(response.data)
        window.localStorage.setItem('loggedFinanceUser', JSON.stringify(response.data))
      } catch (err) {
        window.localStorage.removeItem('loggedFinanceUser')
        setUser(null)
      }
      setLoading(false)
    }
    initAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext