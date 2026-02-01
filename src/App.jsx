import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import "preline/preline";

import Signup from './components/Signup'
import Signin from './components/Signin'
import ProtectedRouter from './components/ProtectedRoute'
import Layout from './components/Layout'
import Dashboard from './components/pages/Dashboard'
import Profile from './components/pages/Profile'
import NotFound from './components/pages/NotFound'
import Settings from './components/pages/Settings'
import Signout from './components/pages/Signout';

import { AuthProvider } from './components/context/AuthContext'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/signin' element={<Signin></Signin>}></Route>
            <Route path='/signup' element={<Signup></Signup>}></Route>
            <Route path="/" element={<Navigate replace to="/signin"></Navigate>}></Route>

            <Route element={<ProtectedRouter><Layout/></ProtectedRouter>}>
              <Route path='/dashboard' element={<Dashboard/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>
              <Route path='/settings' element={<Settings/>}></Route>
              <Route path='/signout' element={<Signout/>}></Route>
            </Route>

            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
