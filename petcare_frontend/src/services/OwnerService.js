import apiClient from './apiClient'

const getAll = async () => {
    const response = await apiClient.get('/owners')
    return response.data
}

const getById = async (id) => {
    const response = await apiClient.get(`/owners/${id}`)
    return response.data
}

export default {
    getAll,
    getById,
}