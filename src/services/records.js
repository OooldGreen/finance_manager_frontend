import axios from "axios"
import { getConfig } from './users'
const baseUrl = 'http://localhost:8081/api/transactions'

const getRecords = async (params) => {
  const response = await axios.get(baseUrl, {
    params,
    ...getConfig()
  })
  return response
}

const getMonthlyBalance = async () => {
  const response = await axios.get(`${baseUrl}/month-balance`, getConfig())
  return response
}

const getRecordCategories = async () => {
  const response = await axios.get(`${baseUrl}/categories`, getConfig())
  return response
}

const getRecord = async (recordId) => {
  const response = await axios.get(`${baseUrl}/${recordId}`, getConfig())
  return response
}

const createRecord = async (record) => {
  const response = await axios.post(baseUrl, record, getConfig())
  return response
}

const deleteRecord = (id) => {
  return axios.delete(`${baseUrl}/${id}`, getConfig())
}

const deleteRecords = (ids) => {
  return axios.delete(`${baseUrl}/batch`, {
    data: ids,
    ...getConfig()
  })
}

const updateRecord = (id, newRecord) => {
  const response = axios.patch(`${baseUrl}/${id}`, newRecord, getConfig())
  return response
}

export default { getRecords, getMonthlyBalance, getRecordCategories, createRecord, deleteRecord, deleteRecords, updateRecord, getRecord }