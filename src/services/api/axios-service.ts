import axios from 'axios'

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

httpClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default httpClient
