const express = require("express");
const axios = require("axios");
const { RecipeInfoModel } = require("../models/recipeinfo.model");
const { auth } = require("../middlewares/auth.middleware");
require("dotenv").config();
const recipeRouter = express.Router();


// endpoint to handle recipe search and user preferences
recipeRouter.get("/", async (req, res) => {
  const { query } = req.body;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          query,
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



recipeRouter.post("/save",auth, async (req, res) => {
  const { recipeId , userID} = req.body;

  try {
    // Fetching recipe information from Spoonacular API
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
      params: {
        apiKey: process.env.API_KEY,
      },
    });

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
      dishTypes
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
      userID    // adding userID
    });

    await savedRecipe.save();

    res.status(201).json({ message: "Recipe information saved successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




module.exports = {
  recipeRouter,
};
