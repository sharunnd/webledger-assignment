import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RecipeDetails() {
  const id = useSelector((store) => store.recipeSearchReducer.id);

  const recipeDetails = useSelector(
    (store) => store.recipeSearchReducer.recipeDetails
  );

  useEffect(() => {}, [recipeDetails]);

  console.log("erci....", recipeDetails);
  // Process instructions to remove <ol> and <li> tags
  const processedInstructions = recipeDetails.instructions.replace(
    /<ol>|<\/ol>|<li>|<\/li>/g,
    ""
  );
  const handleSave = () => {};
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
        <Button onClick={handleSave} bg="#dbdbf5">Save Recipe</Button>
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
