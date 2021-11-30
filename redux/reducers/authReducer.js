const initState = {
    token: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'STORE_TOKEN': {
            console.log(action.payload)
            return {
                ...state,
                token: action.payload
            }
        }
        case 'REMOVE_TOKEN':
            return {
                ...state,
                token: null,
            }
        default: return state;
    }
}

export default authReducer;