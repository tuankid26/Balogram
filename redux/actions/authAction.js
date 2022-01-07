const storeToken = (token) => {
    return {
        type: 'STORAGE_TOKEN',
        payload: token
    }
}

const removeToken = () => {
    return {
        type: 'REMOVE_TOKEN',
    }
}

const storeId = (userId) => {
    return {
        type: 'STORAGE_ID',
        payload:  userId
    }
}

export {
    storeToken,
    removeToken
};