import './App.css'
import { Routes, Route, Link } from 'react-router-dom'

import Signup from './components/Signup'
import Signin from './components/Signin'

function App() {

  return (
    <>
      <nav>
        <Link to="/signin">Sign In</Link> | <Link to="/signup">Sign Up</Link>
      </nav>

      <Routes>
        <Route path='/signin' element={<Signin></Signin>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path="/" element={<h1>Welcome to Finance Manager</h1>}></Route>
      </Routes>
    </>
  )
}

export default App
