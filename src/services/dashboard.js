import axios from "axios"
import { getConfig } from './users'
const baseUrl = 'http://localhost:8081/api/dashboard'

//  get both expense and income data
//  filter by month or by a range of year
const getData = async (startDate, endDate) => {
  const response = await axios.get(baseUrl, {
    params: {
      startDate,
      endDate
    },
    ...getConfig()
  })
  return response
}

/**
 * Group by transaction categories
 * three params:
 *  type: expense / income
 *  startDate
 *  endDate
 * **/
const getDataByCatAndType = async (type, startDate, endDate) => {
  const response = await axios.get(`${baseUrl}/category`, {
    params: {
      type,
      startDate,
      endDate
    },
    ...getConfig()
  })
  return response
}

const getKpiData = async () => {
  const response  = await axios.get(`${baseUrl}/kpi`, getConfig())
  return response
}

export default { getData, getDataByCatAndType, getKpiData }