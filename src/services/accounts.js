import axios from "axios"
const baseUrl = 'http://localhost:8081/api/accounts'

const getAllAccounts = async () => {
    const response = await axios.get(baseUrl)
    return response
}

const getTotalBalances =  async () => {
  const response = await axios.get(`${baseUrl}/total_balance`)
  return response
}

const getAccountTypes = async () => {
  const response = await axios.get(`${baseUrl}/types`)
  return response
}

const createAccount = async (accountData) => {
  const response = await axios.post(baseUrl, accountData)
  return response
}

const getAccountDetail = async (accountId) => {
  const response = await axios.get(`${baseUrl}/${accountId}`)
  return response
}

const getRecordsByAccount = async (accountId) => {
  const response = await axios.get(`${baseUrl}/${accountId}/records`)
  return response
}

const updateAccountDetail = async (accountId, newAccountDetail) => {
  const response = await axios.patch(`${baseUrl}/${accountId}`, newAccountDetail)
  return response
}

const deleteAccount = (accountId) => {
  return axios.delete(`${baseUrl}/${accountId}`)
}

export default { getTotalBalances, getAllAccounts, getAccountTypes, createAccount, getAccountDetail, getRecordsByAccount, updateAccountDetail, deleteAccount }