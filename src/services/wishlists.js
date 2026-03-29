import axios from "axios"
const baseUrl = 'http://localhost:8081/api/goals'

const getAllGoals = async (page, size) => {
  const response = await axios.get(baseUrl, {
    params: { page, size}
  })
  return response
}

const getSummary = async () => {
  const response = await axios.get(`${baseUrl}/summary`)
  return response
}

const getCategories = async () => {
  const response = await axios.get(`${baseUrl}/categories`)
  return response
}

const createGoal = async (goal) => {
  const response = await axios.post(baseUrl, goal)
  return response
}

const updateGoal = async (goalId, goal) => {
  const response = await axios.patch(`${baseUrl}/${goalId}`, goal)
  return response
}

const updateAmount = async (goalId, amount) => {
  const response = await axios.patch(`${baseUrl}/${goalId}/deposit`, {amount})
  return response
}

const updatePriority = async (goalId) => {
  const response = await axios.patch(`${baseUrl}/${goalId}/priority`, {})
  return response
}

const updateActive = async (goalId) => {
  const response = await axios.patch(`${baseUrl}/${goalId}/active`, {})
  return response
}

const deleteGoal = (goalId) => {
  const response = axios.delete(`${baseUrl}/${goalId}`)
  return response
}

export default { getAllGoals, getSummary, getCategories, createGoal, updateGoal, updateAmount, updatePriority, updateActive, deleteGoal }