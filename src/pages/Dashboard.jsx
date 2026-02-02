import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { userAuth } from '../services/utils/userAuth'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = userAuth()

  // we do not show anything without user information
  if (!user) return null

  return (
    <div>
        <h1>Dashboard</h1>

    </div>
  )
}

export default Dashboard