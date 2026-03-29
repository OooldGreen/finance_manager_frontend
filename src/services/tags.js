import axios from "axios"
const baseUrl = 'http://localhost:8081/api/tags'

const getAllTags = async () => {
  const response = axios.get(baseUrl)
  return response
}

const getFrequentTags = async (limit) => {
  const response = axios.get(`${baseUrl}/frequent`, { params: { limit } })
  return response
}

export default { getAllTags, getFrequentTags }