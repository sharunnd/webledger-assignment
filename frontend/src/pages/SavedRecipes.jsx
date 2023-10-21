import {
  Box,
  Flex,
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
        .get(`https://findrecipes.onrender.com/recipes/saved-recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          dispatch({ type: GET_SAVED_RECIPES, payload: res.data.savedRecipes });
        })
        .catch((err) => {
         
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

  return (
    <Box>
      <Box m={"auto"}>
        {savedRecipes.length > 0 ? (
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
          <Box>
            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              h={"100vh"}
            >
              <Text
                as="samp"
                fontSize={{ base: "25px", md: "30px", lg: "40px" }}
              >
                You haven't saved any recipes yet.
              </Text>
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  );
}
