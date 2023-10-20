import { Button, Flex, HStack, Image, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

export default function RecipeDetails() {
  const id = useSelector((store) => store.recipeSearchReducer.id);
  const token = Cookies.get("token")
  const toast = useToast()
  const recipeDetails = useSelector(
    (store) => store.recipeSearchReducer.recipeDetails
  );

  useEffect(() => {
    
    
  }, [recipeDetails]);

  // Process instructions to remove <ol> and <li> tags
  const processedInstructions = recipeDetails.instructions?.replace(/<ol>|<\/ol>|<li>|<\/li>/g,"");
  const handleSave = () => {
    const recipeId = { recipeId:id };
    console.log("recipeId",recipeId);
    try {
      axios
       .post(`http://localhost:8080/recipes/save`,recipeId, {
         headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
         },
       })
       .then((res) => {
         console.log(res);
         toast({
          position: 'top',
          title: `${res.data.message}`,
          status: 'success',
          duration: 1500,
          isClosable: true,
        })
       })
       .catch((err) => {
         console.log(err);
         toast({
          position: 'top',
          title: `${err.response.data.error}`,
          status: 'error',
          duration: 1500,
          isClosable: true,
        })
       });
   } catch (error) {
    console.log(error);
   }
  };
  return (
    <HStack m={"auto"}>
      <Flex
        mt={10}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        px={"10%"}
        lineHeight={8}
        fontSize={{ base: "", lg: "18px" }}
      >
        <Image src={recipeDetails.image} alt="recipe_image" />
        <Text fontWeight={600} fontSize={{ base: "15px", lg: "25px" }} mt={5}>
          {recipeDetails.title}
        </Text>
        <Button onClick={handleSave} bg="#dbdbf5">
          Save Recipe
        </Button>
        <Text>Vegetarian: {recipeDetails.vegetarian ? "True" : "False"}</Text>
        <Text>DairyFree: {recipeDetails.dairyFree ? "True" : "False"}</Text>
        <Text>
          Very Healthy: {recipeDetails.veryHealthy ? "True" : "False"}
        </Text>
        <Text>Cheap: {recipeDetails.cheap ? "True" : "False"}</Text>
        <Text textAlign={"left"}>Instructions: {processedInstructions}</Text>
      </Flex>
    </HStack>
  );
}
