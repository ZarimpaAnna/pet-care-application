import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

apiClient.interceptors.response.use(
    (response) => response,

    (error) => {
        const status = error.response?.status

        if (status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('username')

            window.dispatchEvent(new Event('authChanged'))

            window.location.href = '/login?expired=true'
        }

        return Promise.reject(error)
    }
)

export default apiClient