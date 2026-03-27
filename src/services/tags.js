import axios from "axios"
import { getConfig } from './users'
const baseUrl = 'http://localhost:8081/api/tags'

const getAllTags = async () => {
  const response = axios.get(baseUrl, getConfig())
  return response
}

const getFrequentTags = async (limit) => {
  const response = axios.get(`${baseUrl}/frequent`, { params: { limit }, ...getConfig() })
  return response
}

export default { getAllTags, getFrequentTags }