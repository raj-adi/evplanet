import axios from "axios";
import { BILLING_MINE_LIST_FAIL, BILLING_MINE_LIST_REQUEST, BILLING_MINE_LIST_SUCCESS } from "../constants/billingConstants";

export const listBillingMine = () => async (dispatch, getState) => {
    dispatch({type: BILLING_MINE_LIST_REQUEST});
    const {userSignin: {userInfo}} = getState();
    try {
        const { data } = await axios.get('/api/billing/mine', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: BILLING_MINE_LIST_SUCCESS})
    } catch(error) {
        const message = 
        error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: BILLING_MINE_LIST_FAIL, payload: message});
    }
}