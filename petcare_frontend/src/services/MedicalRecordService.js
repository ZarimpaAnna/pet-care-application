import apiClient from './apiClient'

const getAll = async () => {
    const response = await apiClient.get('/medical-records')

    return response.data
}

const getById = async (id) => {
    const response = await apiClient.get(`/medical-records/${id}`)

    return response.data
}

const create = async (medicalRecordData) => {
    const response = await apiClient.post(
        '/medical-records',
        medicalRecordData
    )

    return response.data
}

const remove = async (id) => {
    await apiClient.delete(`/medical-records/${id}`)
}

const update = async (id, medicalRecordData) => {
    const response = await apiClient.put(
        `/medical-records/${id}`,
        medicalRecordData
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