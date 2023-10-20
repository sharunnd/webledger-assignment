import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { GET_SAVED_RECIPES } from "../redux/recipeSearchReducer/actionTypes";

export default function SavedRecipes() {
  const toast = useToast();
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const savedRecipes = useSelector(
    (store) => store.recipeSearchReducer.savedRecipes
  );
  const handleInstructions = (instructions) => {
    const res = instructions.replace(/<ol>|<\/ol>|<li>|<\/li>/g, "");

    return res;
  };

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8080/recipes/saved-recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          dispatch({ type: GET_SAVED_RECIPES, payload: res.data.savedRecipes });
        })
        .catch((err) => {
          console.log(err);
          toast({
            position: "top",
            title: `${err.response.data.error}`,
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(savedRecipes);
  return (
    <Box>
      <Box m={"auto"}>
        {savedRecipes ? (
          savedRecipes.map((recipe) => (
            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              px={"10%"}
              lineHeight={8}
              fontSize={{ base: "", lg: "18px" }}
            >
              <Image src={recipe.image} alt="image" />
              <Text
                fontWeight={600}
                fontSize={{ base: "15px", lg: "25px" }}
                mt={5}
              >
                {recipe.title}
              </Text>
              <Text>Vegetarian: {recipe.vegetarian ? "True" : "False"}</Text>
              <Text>DairyFree: {recipe.dairyFree ? "True" : "False"}</Text>
              <Text>Very Healthy: {recipe.veryHealthy ? "True" : "False"}</Text>
              <Text>Cheap: {recipe.cheap ? "True" : "False"}</Text>
              <Text textAlign={"left"}>
                Instructions: {handleInstructions(recipe.instructions)}
              </Text>
            </Flex>
          ))
        ) : (
          <Box>No recipes saved</Box>
        )}
      </Box>
    </Box>
  );
}
