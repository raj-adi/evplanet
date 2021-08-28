import { BILLING_MINE_LIST_FAIL, BILLING_MINE_LIST_REQUEST, BILLING_MINE_LIST_SUCCESS } from "../constants/billingConstants";

export const billingMineListReducer = ( state = { orders: [] }, action ) => {
    switch(action.type) {
        case BILLING_MINE_LIST_REQUEST:
            return { loading: true};
        case BILLING_MINE_LIST_SUCCESS:
            return { loading: false, billing: action.payload };
        case BILLING_MINE_LIST_FAIL:
            return { loading: false, error: action.payload};
        default:
            return state;
    }
};