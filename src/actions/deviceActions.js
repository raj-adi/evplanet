import axios from "axios";
import {
    DEVICE_LIST_REQUEST,
    DEVICE_LIST_SUCCESS,
    DEVICE_LIST_FAIL
} from "../constants/deviceConstants";


export const listDevices = () => async (dispatch) => {
    dispatch({
      type: DEVICE_LIST_REQUEST,
    });
    try {
      const { data } = await axios.get('/api/device');
      dispatch({ type: DEVICE_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: DEVICE_LIST_FAIL, payload: error.message });
    }
  };
  

