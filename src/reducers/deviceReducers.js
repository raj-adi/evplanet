const {
    DEVICE_LIST_REQUEST,
    DEVICE_LIST_SUCCESS,
    DEVICE_LIST_FAIL,
    DEVICE_CREATE_REQUEST,
    DEVICE_CREATE_SUCCESS,
    DEVICE_CREATE_FAIL,
    DEVICE_CREATE_RESET
} = require('../constants/deviceConstants');

export const deviceListReducer = (state = { loading: true, devices: [] }, action) => {
    switch (action.type) {
        case DEVICE_LIST_REQUEST:
            return { loading: true };
        case DEVICE_LIST_SUCCESS:
            return { loading: false, devices: action.payload };
        case DEVICE_LIST_FAIL:
            return { loading: false, devices: action.payload }
        default:
            return state;
    }
};

export const deviceCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case DEVICE_CREATE_REQUEST:
            return { loading: true };
        case DEVICE_CREATE_SUCCESS:
            return { loading: false, sucess: true, device: action.payload };
        case DEVICE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case DEVICE_CREATE_RESET:
            return {}; 
        default:
            return state;
    }
};


