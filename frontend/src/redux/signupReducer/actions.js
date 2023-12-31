import axios from "axios";
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./actionTypes";

export const signupFun = (data) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  return axios
    .post(`https://findrecipes.onrender.com/users/signup`, data)
    .then((res) => {
      dispatch({ type: REGISTER_SUCCESS });

      return res;
    })
    .catch((err) => {
      dispatch({ type: REGISTER_FAILURE });
      throw err;
    });
};
