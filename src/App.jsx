import { Routes, Route, Link, Navigate } from 'react-router-dom'
import "preline/preline";

import Signup from './components/Signup'
import Signin from './components/Signin'
import ProtectedRouter from './components/ProtectedRoute'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/signin' element={<Signin></Signin>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path="/" element={<Navigate replace to="/signin"></Navigate>}></Route>

        <Route path="/dashboard" element={<ProtectedRouter><Dashboard></Dashboard></ProtectedRouter>}></Route>
        <Route path="*" element={<h2>404 Page Not Found</h2>}></Route>
      </Routes>
    </>
  )
}

export default App
