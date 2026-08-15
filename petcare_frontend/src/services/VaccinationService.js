import apiClient from './apiClient'

const getAll = async () => {
    const response = await apiClient.get('/vaccinations')
    return response.data
}

const getById = async (id) => {
    const response = await apiClient.get(`/vaccinations/${id}`)
    return response.data
}

const create = async (vaccinationData) => {
    const response = await apiClient.post('/vaccinations', vaccinationData)

    return response.data
}

const remove = async (id) => {
    await apiClient.delete(`/vaccinations/${id}`)
}

const update = async (id, vaccinationData) => {
    const response = await apiClient.put(
        `/vaccinations/${id}`,
        vaccinationData
    )

    return response.data
}

export default {
    getAll,
    getById,
    create,
    remove,
    update,
}