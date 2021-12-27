const addItem = (object) => {
    return {
        type: 'ADD_ITEM',
        payload: object
    }
}
export {
    addItem
};