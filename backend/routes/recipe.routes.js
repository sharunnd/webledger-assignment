const express = require("express");
const axios = require("axios");
const { RecipeInfoModel } = require("../models/recipeinfo.model");
const { auth } = require("../middlewares/auth.middleware");
require("dotenv").config();
const recipeRouter = express.Router();

// endpoint to handle recipe search and user preferences
recipeRouter.post("/", async (req, res) => {
  const { keyWords } = req.body;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          query:keyWords,
          apiKey: process.env.API_KEY,
        },
      }
    );

    const recipes = response.data.results;
    res.status(200).json({ msg: "Recipe request successful!", recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

recipeRouter.post("/details", async (req, res) => {
  const { recipeId } = req.body;

  try {
    // Fetching recipe information from Spoonacular API
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information`,
      {
        params: {
          apiKey: process.env.API_KEY,
        },
      } 
    );
    
    const recipe = response.data;
   
    res.status(200).json({ msg: "Recipe details.",recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

recipeRouter.post("/save", auth, async (req, res) => {
  const { recipeId, userID } = req.body;
  try {
    // Fetching recipe information from Spoonacular API
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information`,
      {
        params: {
          apiKey: process.env.API_KEY,
        },
      } 
    );

    // Extract relevant data from the API response
    const {
      id,
      vegetarian,
      dairyFree,
      veryHealthy,
      cheap,
      title,
      image,
      summary,
      dishTypes,
      instructions
    } = response.data;

    // Save the recipe information to MongoDB
    const savedRecipe = new RecipeInfoModel({
      id,
      vegetarian,
      dairyFree,
      veryHealthy,
      cheap,
      title,
      image,
      summary,
      dishTypes,
      instructions,
      userID, // adding userID
    });

    await savedRecipe.save();
    
    res.status(201).json({ message: "Recipe information saved successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

recipeRouter.get("/saved-recipes", auth, async (req, res) => {
  const { userID } = req.body;

  try {
    const savedRecipes = await RecipeInfoModel.find({ userID });

    if (savedRecipes) {
      res.status(200).json({ msg: `successfully Fetched saved recipes`, savedRecipes });
    } else {
      res.status(400).json({ msg: `Saved recipes not available!` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  recipeRouter,
};
