import axios from "axios"
import { getConfig } from './users'
const baseUrl = 'http://localhost:8081/api/budgets'

const getBudgetByMonth = async (year, month) => {
  const response = await axios.get(baseUrl, {
    params: {
      year: year,
      month: month
    },
    ...getConfig()
  })
  return response
}

const saveBudget = async (budget) => {
  const response = await axios.post(baseUrl, budget, getConfig())
  return response
}

const deleteBudget = async (year, month) => {
  const response = await axios.delete(`${baseUrl}/delete-budget`, {
    params: { year, month },
    ...getConfig()
  })
  return response
}

const syncBudget = async (year, month) => {
  const response = await axios.post(`${baseUrl}/sync-budget`,  null, 
    { 
      params: { year, month },
      ...getConfig() 
    })
  return response
}

export default { getBudgetByMonth, deleteBudget, saveBudget, syncBudget }