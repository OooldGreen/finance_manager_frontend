import axios from "axios"
const baseUrl = 'http://localhost:8081/api/users'

const createUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response
}

const deleteUser = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const updateUser = async (id, user) => {
  const response = await axios.post(`${baseUrl}/${id}`, user)
  return response
}

const login = async (credentitals) => {
  return await axios.post(baseUrl, credentitals)
}

export default { createUser, deleteUser, updateUser, login }