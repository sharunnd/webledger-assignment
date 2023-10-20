const mongoose = require("mongoose");

const recipeInfoSchema = mongoose.Schema({
  id: Number,
  vegetarian: Boolean,
  dairyFree: Boolean,
  veryHealthy: Boolean,
  cheap: Boolean,
  title: String,
  image: String,
  summary: String, 
  dishTypes: [String],
  userID: String
},{
  versionKey:false
});


const RecipeInfoModel = mongoose.model("savedrecipe",recipeInfoSchema)


module.exports = {
    RecipeInfoModel
}