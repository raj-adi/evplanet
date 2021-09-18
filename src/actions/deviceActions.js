import axios from "axios";
import {
  DEVICE_LIST_REQUEST,
  DEVICE_LIST_SUCCESS,
  DEVICE_LIST_FAIL,
  DEVICE_DETAILS_REQUEST,
  DEVICE_DETAILS_SUCCESS,
  DEVICE_DETAILS_FAIL,
  DEVICE_CREATE_REQUEST,
  DEVICE_CREATE_FAIL,
  DEVICE_CREATE_SUCCESS,
  DEVICE_UPDATE_REQUEST,
  DEVICE_UPDATE_FAIL,
  DEVICE_UPDATE_SUCCESS
} from "../constants/deviceConstants";


export const listDevices = () => async (dispatch, getState) => {
  dispatch({
    type: DEVICE_LIST_REQUEST,
  });

  const { userSignin: { userInfo } } = getState();

  try {
    const { data } = await axios.post(`/api/device`,
      {
        user: userInfo
      }, 
      {});
    dispatch({ type: DEVICE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DEVICE_LIST_FAIL, payload: error.message });
  }
};


// export const detailsDevice = (deviceId) => async (dispatch) => {
//   dispatch({
//     type: DEVICE_DETAILS_REQUEST,
//     payload: deviceId
//   });

//   const { userSignin: { userInfo } } = getState();

//   try {
//     const { data } = await axios.post(`/api/device/${deviceId}`,
//       {
//         user: userInfo
//       }, 
//       {});
//     dispatch({ type: DEVICE_DETAILS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: DEVICE_DETAILS_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };



export const createDevice = () => async (dispatch, getState) => {
  dispatch({
    type: DEVICE_CREATE_REQUEST
  });
  //Get User Info
  const { userSignin: { userInfo } } = getState();
  try {

    const { data } = await axios.post('/api/device/add',
      {
        user: userInfo
      },
      {
        headers: { Authorization: `${userInfo.token}` },
      }
    );
    dispatch({
      type: DEVICE_CREATE_SUCCESS,
      payload: data.device,
    })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: DEVICE_CREATE_FAIL,
      payload: message
    })

  }
};

// export const updateDevice = () => async (dispatch, getState) => {
//   dispatch({
//     type: DEVICE_UPDATE_REQUEST
//   })
// })
