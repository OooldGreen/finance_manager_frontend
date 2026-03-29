import axios from "axios"
const baseUrl = 'http://localhost:8081/api/dashboard'

//  get both expense and income data
//  filter by month or by a range of year
const getData = async (startDate, endDate) => {
  const response = await axios.get(baseUrl, {
    params: {
      startDate,
      endDate
    }
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
    }
  })
  return response
}

const getKpiData = async () => {
  const response  = await axios.get(`${baseUrl}/kpi`)
  return response
}

const getHeatmapData = async (year) => {
  const response = await axios.get(`${baseUrl}/heatmap`, {
    params: {
      year: year
    }
  })
  return response
}

export default { getData, getDataByCatAndType, getKpiData, getHeatmapData }