import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { billingMineListReducer } from "./reducers/billingReducers";
import { deviceListReducer } from "./reducers/deviceReducers";
import { userListReducer, userSigninReducer } from './reducers/userReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
};
const reducer = combineReducers ({
    userSignin: userSigninReducer, 
    billingMineList: billingMineListReducer,
    userList: userListReducer,
    deviceList: deviceListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);



export default store;