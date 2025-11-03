import axios from 'axios'

const envUrl = import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()
const baseURL = envUrl && envUrl.length > 0 ? envUrl.replace(/\/$/, '') : '/api'

const api = axios.create({
  baseURL,
})

export default api
