const initState = {
    arr: []
}

const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                arr: [...state.arr, action.payload]
            }

        default: return state;
    }
}

export default searchReducer;