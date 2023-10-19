import { RECIPE_SEARCH_FAILURE, RECIPE_SEARCH_REQUEST, RECIPE_SEARCH_SUCCESS } from "./actionTypes"


const initialState = {
    isLoading:false,
    isError:false,
    recipes:[]
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
        default:{
            return state
        }
    }
}