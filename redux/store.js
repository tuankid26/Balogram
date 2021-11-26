import { createStore, combineReducers, applyMiddleware } from "redux";
import { mediaReducer, modalReducer, uploadReducer } from "./reducers"; 



const reducers = combineReducers({
    modal: modalReducer,
    media: mediaReducer,
    upload: uploadReducer
});

const store = createStore(reducers);

export default store;