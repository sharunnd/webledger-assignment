import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";

export const Navbar = () => {

  const token = Cookies.get("token");

  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");

  return (
    <Box
      bg="#dbdbf5"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
      w="100%"
      position="sticky"
      top={0}
      zIndex="10"
    >
      <Flex
        alignItems="center"
        justifyContent={{
          base: "space-between",
          md: "space-between",
          lg: "space-around",
        }}
      >
        <Heading
          ml={{ base: "10px", md: "24px", lg: "40px" }}
          fontSize={{ base: "20px", sm: "25px", md: "30px", lg: "30px" }}
        >
          FindRecipes
        </Heading>

        <Input
          w={{
            base: "50%",
            sm: "30%",
            md: "30%",
            lg: "30%",
          }}
          mx={{ base: "5px" }}
          type="text"
          placeholder="Search here"
          bg={"white"}
        />

        {!isSmallerScreen ? (
          <Flex
            alignItems="center"
            justifyContent="space-between"
          >
            <Box mr={5}>
              <Link to={"/"}>Home</Link>
            </Box>
            {token ? (
              <Button p="10px" mt="10px" mb="10px">
                Logout
              </Button>
            ) : (
              <Flex>
                <Button p="10px" mt="10px" mb="10px" mr={5}>
                  <Link to={"/login"}>Login</Link>
                </Button>
                <Button p="10px" mt="10px" mb="10px">
                  <Link to={"/signup"}>Signup</Link>
                </Button>
              </Flex>
            )}
          </Flex>
        ) : (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem as={Link} to={"/"}>
                Home
              </MenuItem>

              {!token ? (
                <>
                  <MenuItem as={Link} to={"/login"}>
                    Login
                  </MenuItem>
                  <MenuItem as={Link} to={"/signup"}>
                    Signup
                  </MenuItem>
                </>
              ) : (
                <MenuItem>Logout</MenuItem>
              )}
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Box>
  );
};
