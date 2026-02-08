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

export default { getTotalBalances, getAllAccounts }