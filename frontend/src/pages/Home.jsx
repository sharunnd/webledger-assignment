import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RecipeCard } from "../components/RecipeCard";


export default function Home() {
  const recipes = useSelector((store) => store.recipeSearchReducer.recipes);
  const isLoading = useSelector((store) => store.recipeSearchReducer.isLoading);

  return (
    <Box >
      {recipes.length > 0 ? (
        isLoading ? (
          <Flex justifyContent={"center"} alignItems={"center"} h="100vh">
            <Spinner />
          </Flex>
        ) : (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            width={"70%"}
            mx={"auto"}
            pt={20}
            gap={6}
          >
            {recipes &&
              recipes?.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
          </Grid>
        )
      ) : (
        <>
          <Heading pt={"10%"}>Welcome to FindRecipes!</Heading>
          <Box w={{ base: "90%", lg: "80%" }} m={"auto"}>
            <Text fontWeight={400} fontSize={{ base: "10px", lg: "25px" }}>
              Use our search bar in the navbar to search for
              recipes based on keywords or filters. Save your favorite recipes.
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={10}
              mt={{ base: "10px", lg: "30px" }}
            >
              <Box>
                <Image
                  src="https://www.modernfoods.co.in/wp-content/uploads/2018/06/360pizza.png"
                  h={"250px"}
                  w="100%"
                />
                <Text fontWeight={600} mt={5}>
                  Classic Margherita Pizza
                </Text>
              </Box>
              <Box>
                <Image
                  src="https://theyummybowl.com/wp-content/uploads/Mango-salsa-3-1.jpg"
                  h={"250px"}
                  w="100%"
                />
                <Text fontWeight={600} mt={5}>
                  Mango Salsa
                </Text>
              </Box>
              <Box>
                <Image
                  src="https://www.eatyourselfskinny.com/wp-content/uploads/2017/08/smoothie-bowl-4-1096x1644.jpg"
                  h={"250px"}
                  w="100%"
                />
                <Text fontWeight={600} mt={5}>
                  Berry Smoothie Bowl
                </Text>
                
              </Box>
            </SimpleGrid>
          </Box>
        </>
      )}
    </Box>
  );
}
