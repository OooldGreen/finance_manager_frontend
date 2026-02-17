import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import "preline/preline";

import Layout from './components/layout/Layout'
import ProtectedRouter from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Signout from './pages/Signout'
import Assets from "./pages/Assets"
import Records from './pages/Records'
import Budgets from './pages/Budgets'
import AccountDetail from './pages/AccountDetail'

import { AuthProvider } from './components/context/AuthContext'

function App() {

  return (
    <>
      <Toaster postion="top-centre" renverseOrder={false}></Toaster>
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
              <Route path='/assets' element={<Assets/>}></Route>
              <Route path='/assets/:id' element={<AccountDetail/>}></Route>
              <Route path='/records' element={<Records/>}></Route>
              <Route path='/budgets' element={<Budgets/>}></Route>
            </Route>

            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
