import { createStore, combineReducers, applyMiddleware } from "redux";
import {
    mediaReducer,
    modalReducer,
    uploadReducer,
    authReducer,
    infoReducer,
    searchReducer
} from "./reducers";



const reducers = combineReducers({
    modal: modalReducer,
    media: mediaReducer,
    upload: uploadReducer,
    authReducer: authReducer,
    infoReducer: infoReducer,
    searchReducer: searchReducer
});

const store = createStore(reducers);

export default store;