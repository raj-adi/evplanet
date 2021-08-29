const {
    DEVICE_LIST_REQUEST,
    DEVICE_LIST_SUCCESS,
    DEVICE_LIST_FAIL
} = require('../constants/deviceConstants');

export const deviceListReducer = (state = {loading: true, devices : [] }, action) => {
    switch (action.type) {
        case DEVICE_LIST_REQUEST:
            return { loading: true };
        case DEVICE_LIST_SUCCESS:
            return { loading: false, devices: action.payload};
        case DEVICE_LIST_FAIL:
            return {loading: false, devices: action.payload}          
         default:
            return state;
    }
}

