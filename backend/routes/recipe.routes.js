const express = require("express");
const axios = require("axios");
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

module.exports = {
  recipeRouter,
};
