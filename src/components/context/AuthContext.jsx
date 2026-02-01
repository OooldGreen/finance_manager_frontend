import { createContext, useState, useEffect } from 'react'
import usersService from '../../services/users'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const savedUser = window.localStorage.getItem('loggedFinanceUser')
      if (savedUser) {
        const { id } = JSON.parse(savedUser)
        try {
          const response = await usersService.getUser(id)
          setUser(response.data)
        } catch (err) {
          console.error('fail to get user information', err)
          window.localStorage.removeItem('loggedFinanceUser')
          setUser(null)
        }
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