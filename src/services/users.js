import axios from "axios"
const baseUrl = 'http://localhost:8081/api/users'

let token = null

const setToken = newToken => {
  token =  `Bearer ${newToken}`
}

const createUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response
}

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response
}

const deleteUser = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const updateUser = async (id, user) => {
  const response = await axios.post(`${baseUrl}/${id}`, user)
  return response
}

const login = async (credentials) => {
  return await axios.post(`${baseUrl}/signin`, credentials)
}

export default { setToken, createUser, getUser, deleteUser, updateUser, login }