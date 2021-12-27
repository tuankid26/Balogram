const initState = {
    username: null,
    gender: null,
    birthday: null,
    address: null,
    description: null,
    userId: null
}

const infoReducer = (state = initState, action) => {
    switch (action.type) {
        case 'STORE_USERNAME': {
            return {
                ...state,
                username: action.payload
            }
        }
        case 'STORE_INFO': {
            return {
                ...state,
                gender: action.payload.gender,
                birthday: action.payload.birthday,
                address: action.payload.address,
                description: action.payload.description,
                username: action.payload.username,
                userId: action.payload.userId
            }
        }
        default: return state;
    }
}

export default infoReducer;