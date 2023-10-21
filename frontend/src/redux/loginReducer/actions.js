import axios from "axios";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionTypes";
import Cookies from "js-cookie";

export const LoginFun = (data) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .post(`https://findrecipes.onrender.com/users/login`, data)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });

      // Store token in cookies
      Cookies.set("token", res.data.token);
      return res;
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILURE });
      throw err;
    });
};
