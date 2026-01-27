import { useContext } from "react"
import AuthContext from '../../components/context/AuthContext'

export const userAuth = () => useContext(AuthContext)