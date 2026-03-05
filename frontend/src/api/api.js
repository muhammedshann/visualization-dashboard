import axios from "axios"

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 5000
})

export const fetchInsights = (params = {}) => {
  return API.get("/insights/", { params })
}