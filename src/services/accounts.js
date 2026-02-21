import axios from "axios"
import { getConfig } from './users'
const baseUrl = 'http://localhost:8081/api/accounts'

const getAllAccounts = async () => {
    const response = await axios.get(baseUrl, getConfig())
    return response
}

const getTotalBalances =  async () => {
  const response = await axios.get(`${baseUrl}/total_balance`, getConfig())
  return response
}

const getAccountTypes = async () => {
  const response = await axios.get(`${baseUrl}/types`, getConfig())
  return response
}

const createAccount = async (accountData) => {
  const response = await axios.post(baseUrl, accountData, getConfig())
  return response
}

const getAccountDetail = async (accountId) => {
  const response = await axios.get(`${baseUrl}/${accountId}`, getConfig())

  return response
}

const updateAccountDetail = async (accountId, newAccountDetail) => {
  const response = await axios.patch(`${baseUrl}/${accountId}`, newAccountDetail, getConfig())
  return response
}

const deleteAccount = (accountId) => {
  return axios.delete(`${baseUrl}/${accountId}`, getConfig())
}

export default { getTotalBalances, getAllAccounts, getAccountTypes, createAccount, getAccountDetail, updateAccountDetail, deleteAccount }