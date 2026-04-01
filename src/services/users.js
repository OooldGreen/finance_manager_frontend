import axios from "axios"
const baseUrl = 'http://localhost:8081/api/users'

axios.defaults.withCredentials = true

axios.interceptors.response.use(response => {
  const newToken = response.headers['authorization']
  if (newToken && newToken.startsWith('Bearer')) {
    const token = newToken.substring(7)

    const loggedUserJSON = window.localStorage.getItem('loggedFinanceUser') 
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const updatedUser = {
        ...user,
        token: token
      }
      window.localStorage.setItem('loggedFinanceUser', JSON.stringify(updatedUser))
    }
  }
  return response
}, error => {
  if (error.response && error.response.status == 401) {
    console.log('Please log in')
  }
  return Promise.reject(error)
})

axios.interceptors.request.use(config => { 
  const loggedUserJSON = window.localStorage.getItem('loggedFinanceUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, error => Promise.reject(error))

const createUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response
}

const getUser = async () => {
  const response = await axios.get(`${baseUrl}/me`)
  return response
}

const deleteUser = () => {
  return axios.delete(`${baseUrl}/me`)
}

const updateUser = async (user) => {
  const response = await axios.patch(`${baseUrl}/me`, user)
  return response
}

const updatePassword = async (passwords) => {
  const response = await axios.patch(`${baseUrl}/me/password`, passwords)
  return response
}

const login = async (credentials, remember) => {
  const response = await axios.post(`${baseUrl}/signin`, credentials, {params: {remember}})
  return response
}

const logout = () => {
  localStorage.clear()
  delete axios.defaults.headers.common['Authorization']
}

export default { getUser, createUser, deleteUser, updateUser, updatePassword, login, logout }