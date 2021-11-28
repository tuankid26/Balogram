import { createStore, combineReducers, applyMiddleware } from "redux";
import { mediaReducer, modalReducer, uploadReducer, authReducer } from "./reducers";



const reducers = combineReducers({
    modal: modalReducer,
    media: mediaReducer,
    upload: uploadReducer,
    authReducer: authReducer,
});

const store = createStore(reducers);

export default store;