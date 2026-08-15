import apiClient from "./apiClient";

const getAll = async () => {

    const response = await apiClient.get("/pets");

    return response.data;

};

const getById = async (id) => {

    const response = await apiClient.get(`/pets/${id}`);

    return response.data;

};

const create = async (petData) => {
    const response = await apiClient.post("/pets", petData)

    return response.data
}

const remove = async (id) => {
    await apiClient.delete(`/pets/${id}`)
}

const update = async (id, petData) => {
    const response = await apiClient.put(`/pets/${id}`, petData)

    return response.data
}

export default {
    getAll,
    getById,
    create,
    remove,
    update,
}