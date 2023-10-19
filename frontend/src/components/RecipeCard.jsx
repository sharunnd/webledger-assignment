import {
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";


export const RecipeCard = ({ image,title }) => {
  return (
    <>
      <GridItem p={3} _hover={{boxShadow:'inner',rounded:"5px"}} boxShadow='xl' rounded="5px">
        <Image
          src={image}
          alt="car"
          w="100%"
          height={{ base: "auto", sm: "300px" }}
        />
        <Text>{title}</Text>
      </GridItem>
    </>
  );
};
