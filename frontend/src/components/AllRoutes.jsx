import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import RecipeDetails from "../pages/RecipeDetails";
import SavedRecipes from "../pages/SavedRecipes";



export default function AllRoutes(){
    return(
        <>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/recipe-details" element={<RecipeDetails />}/>
            <Route path="/saved" element={<SavedRecipes />}/>
        </Routes>
        </>
    )
}