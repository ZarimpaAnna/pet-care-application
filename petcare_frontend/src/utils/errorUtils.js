export const getApiErrorMessage = (error, fallbackMessage) => {
    const data = error.response?.data

    if (data?.errors && typeof data.errors === 'object') {
        const messages = Object.values(data.errors)

        if (messages.length > 0) {
            return messages.join(' ')
        }
    }

    if (data?.message) {
        return data.message
    }

    return fallbackMessage
}