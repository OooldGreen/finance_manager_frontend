
const ProtectedRouter = ({ children }) => {
  const user = window.localStorage.getItem('loggedFinanceUser')
  return user ? children : <Navigate to="/signin"></Navigate>
}

export default ProtectedRouter