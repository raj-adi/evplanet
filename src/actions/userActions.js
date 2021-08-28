import {USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT} from "../constants/userConstants";
import Axios from "axios";

export const signin = (userEmail, userPassword) => async(dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload:{userEmail, userPassword}}); 
    try{
        const { data } = await Axios.post('/api/users/signin', {userEmail, userPassword});
        dispatch({
            type: USER_SIGNIN_SUCCESS, 
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
        console.log(data);
        
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
};  

export const signout =() => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: USER_SIGNOUT});
};
 