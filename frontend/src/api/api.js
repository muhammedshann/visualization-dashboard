import axios from "axios"

const API = axios.create({
  baseURL: "https://visualization-dashboard-pugc.onrender.com/api",
  timeout: 5000
})

export const fetchInsights = (params = {}) => {
  return API.get("/insights/", { params })
}