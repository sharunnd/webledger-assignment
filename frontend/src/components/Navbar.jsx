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
  useToast,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";
import { LOGOUT_SUCCESS } from "../redux/loginReducer/actionTypes";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getRecipes } from "../redux/recipeSearchReducer/actions";

export const Navbar = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");

  const [keyWords, setKeyWords] = useState("");

  const handleSearch = () => {
    const searchData = { keyWords };
  
    dispatch(getRecipes(searchData))
      .then((res) => {
        toast({
          position: "top",
          title: `${res.data.msg}`,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      
      })
      .catch((err) => {
        toast({
          position: "top",
          title: `${err.response.data.msg}`,
          status: "error",
          duration: 1500,
          isClosable: true,
        });
       console.log("err .catch ",err);
      });
    setKeyWords("")
  };

  const handleLogout = () => {
    toast({
      position: "top",
      title: `Logged out!`,
      status: "success",
      duration: 1000,
      isClosable: true,
    });
    navigate("/");
    Cookies.remove("token");
    dispatch({ type: LOGOUT_SUCCESS });
  };
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

        <Flex
          w={{
            base: "50%",
            sm: "30%",
            md: "25%",
            lg: "25%",
          }}
        >
          <Input
            mx={{ base: "5px" }}
            type="text"
            placeholder="Search here"
            bg={"white"}
            value={keyWords}
            onChange={(e)=>setKeyWords(e.target.value)}
          />
          <IconButton
            bg={"white"}
            icon={<SearchIcon />}
            onClick={handleSearch}
          />
        </Flex>

        {!isSmallerScreen ? (
          <Flex alignItems="center" justifyContent="space-between">
            <Box mr={5}>
              <Link to={"/"}>Home</Link>
            </Box>
            {token ? (
              <Button p="10px" mt="10px" mb="10px" onClick={handleLogout}>
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
