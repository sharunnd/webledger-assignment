import { RECIPE_DETAILS_SUCCESS, RECIPE_DETAILS_VIEW_CLICK, RECIPE_SEARCH_FAILURE, RECIPE_SEARCH_REQUEST, RECIPE_SEARCH_SUCCESS } from "./actionTypes"


const initialState = {
    isLoading:false,
    isError:false,
    recipes:[],
    id:null,
    recipeDetails:[]
}


export const reducer = (state=initialState,{type,payload})=>{
    switch(type){
        case RECIPE_SEARCH_REQUEST:{
            return {
                ...state,isLoading:true
            }
        }
        case RECIPE_SEARCH_FAILURE:{
            return {
                ...state,isLoading:false,isError:true
            }
        }
        
        case RECIPE_SEARCH_SUCCESS:{
            return {
                ...state,isLoading:false,recipes:payload
            }
        }
        case RECIPE_DETAILS_VIEW_CLICK:{
            return {
                ...state,isLoading:false,id:payload
            }
        }
        case RECIPE_DETAILS_SUCCESS:{
            return {
                ...state,isLoading:false,recipeDetails:payload
            }
        }
        default:{
            return state
        }
    }
}