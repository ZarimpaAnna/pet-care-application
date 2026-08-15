import apiClient from "./apiClient";

const API_URL = "http://localhost:8080/api/auth";

const login = async (username, password) => {

    const response = await apiClient.post(
        `${API_URL}/login`,
        {
            username,
            password
        }
    );

    return response.data;
};

const register = async (registrationData) => {
    const response = await apiClient.post('/auth/register', registrationData)

    return response.data
}

export default {
    login,
    register,
};