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

export {
    storeToken,
    removeToken
};