import axios from "axios";
import { RECIPE_SEARCH_FAILURE, RECIPE_SEARCH_REQUEST, RECIPE_SEARCH_SUCCESS } from "./actionTypes";

export const getRecipes = (query) => (dispatch) => {
  dispatch({ type: RECIPE_SEARCH_REQUEST });
  return axios
    .post(`http://localhost:8080/recipes`, query)
    .then((res) => {
      dispatch({ type: RECIPE_SEARCH_SUCCESS, payload: res.data.recipes });

      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: RECIPE_SEARCH_FAILURE });
      throw err;
    });
};
