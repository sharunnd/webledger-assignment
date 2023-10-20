import { Button, GridItem, Image, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RECIPE_DETAILS_SUCCESS, RECIPE_DETAILS_VIEW_CLICK } from "../redux/recipeSearchReducer/actionTypes";
import axios from "axios";
import Cookies from "js-cookie";

export const RecipeCard = ({ image, title, id }) => {
  const dispatch = useDispatch();

  const viewRecipeDetails = () => {
    const recipeId = id;
    dispatch({ type: RECIPE_DETAILS_VIEW_CLICK, payload: id });
    try {
      axios
        .post(`http://localhost:8080/recipes/details`, { recipeId })
        .then((res) => {
          const recipe = res.data.recipe
          dispatch({ type: RECIPE_DETAILS_SUCCESS, payload: recipe });
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <GridItem
        p={3}
        _hover={{ boxShadow: "inner", rounded: "5px" }}
        boxShadow="xl"
        rounded="5px"
        gap={10}
      >
        <Image
          src={image}
          alt="car"
          w="100%"
          height={{ base: "auto", sm: "300px" }}
        />
        <Text fontWeight={600} mt={5}>
          {title}
        </Text>
        <Button bg={"transparent"} onClick={viewRecipeDetails}>
          <Link to="/recipe-details">View Details</Link>
        </Button>
      </GridItem>
    </>
  );
};
