import axios from "axios";
import { RECIPE_SEARCH_FAILURE, RECIPE_SEARCH_REQUEST, RECIPE_SEARCH_SUCCESS } from "./actionTypes";

export const getRecipes = (query) => (dispatch) => {
  dispatch({ type: RECIPE_SEARCH_REQUEST });
  return axios
    .post(`https://findrecipes.onrender.com/recipes`, query)
    .then((res) => {
      dispatch({ type: RECIPE_SEARCH_SUCCESS, payload: res.data.recipes });
      return res;
    })
    .catch((err) => {
      dispatch({ type: RECIPE_SEARCH_FAILURE });
      throw err;
    });
};
