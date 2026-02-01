import axios from "axios"
const baseUrl = 'http://localhost:8081/api/users'

let token = null

const setToken = newToken => {
  token =  `Bearer ${newToken}`
}

// get authorization
const getConfig = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedFinanceUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    return ({
      headers: {
        Authorization: token ||  `Bearer ${user.token}`
    }})
  }
}

const createUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response
}

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, getConfig())
  return response
}

const deleteUser = (id) => {
  return axios.delete(`${baseUrl}/${id}`, getConfig())
}

const updateUser = async (user) => {
  const response = await axios.patch(`${baseUrl}/me`, user, getConfig())
  return response
}

const updatePassword = async (passwords) => {
  const response = await axios.patch(`${baseUrl}/me/password`, passwords, getConfig())
  return response
}

const login = async (credentials) => {
  return await axios.post(`${baseUrl}/signin`, credentials)
}

const logout = () => {
  localStorage.clear()
  delete axios.defaults.headers.common['Authorization']
}

export default { setToken, createUser, getUser, deleteUser, updateUser, updatePassword, login, logout }