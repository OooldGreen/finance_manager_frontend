import { Navigate, Outlet } from 'react-router-dom'
import { userAuth } from '../services/utils/userAuth'

const ProtectedRouter = ({ children }) => {
  const { user, loading } = userAuth()

  if (loading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  if (!user) {
    return <Navigate replace to="signin"></Navigate>
  }

  return children ? children : <Outlet/>
}

export default ProtectedRouter