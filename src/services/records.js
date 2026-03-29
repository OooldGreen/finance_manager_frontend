import axios from "axios"
const baseUrl = 'http://localhost:8081/api/transactions'

const getRecords = async (params) => {
  const response = await axios.get(baseUrl, {
    params
  })
  return response
}

const getMonthlyBalance = async (year, month) => {
  const response = await axios.get(`${baseUrl}/month-balance`, {
    params: {
      year,
      month,
    }
  })
  return response
}

const getRecordCategories = async () => {
  const response = await axios.get(`${baseUrl}/categories`)
  return response
}

const getRecord = async (recordId) => {
  const response = await axios.get(`${baseUrl}/${recordId}`)
  return response
}

const createRecord = async (record) => {
  const response = await axios.post(baseUrl, record)
  return response
}

const deleteRecord = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const deleteRecords = (ids) => {
  return axios.delete(`${baseUrl}/batch`, {
    data: ids
  })
}

const updateRecord = (id, newRecord) => {
  const response = axios.patch(`${baseUrl}/${id}`, newRecord)
  return response
}

const searchRecord = (params) => {
  console.log(params)
  const response = axios.get(`${baseUrl}/search`, { params })
  return response
}

export default { getRecords, getMonthlyBalance, getRecordCategories, createRecord, deleteRecord, deleteRecords, updateRecord, getRecord, searchRecord }