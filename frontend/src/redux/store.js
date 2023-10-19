import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as signupReducer } from "./signupReducer/reducer";
import { reducer as loginReducer } from "./loginReducer/reducer";



const rootReducer = combineReducers({ signupReducer, loginReducer });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
