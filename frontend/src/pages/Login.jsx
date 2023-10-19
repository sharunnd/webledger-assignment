import {
  Box,
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginFun } from "../redux/loginReducer/actions";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const isLoading = useSelector((state) => state.loginReducer.isLoading);
  const isAuth = useSelector((store) => store.loginReducer.isAuth);
  
  useEffect(()=>{

  },[isAuth])

  const handleLogin = () => {
    const loginData = {
      email,
      password,
    };

    dispatch(LoginFun(loginData))
      .then((res) => {
        toast({
          position: "top",
          title: `${res.data.msg}`,
          status: "success",
          duration: 1000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        toast({
          position: "top",
          title: `${err.response.data.msg}`,
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      });
  };
  
  

  return (
    <Box
      bg="gray.100"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w={{ base: "300px", md: "400px", lg: "450px" }}
        m="auto"
        p={50}
        rounded={10}
        bg="white"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      >
        <Heading fontWeight={500}>Login</Heading>
        <VStack
          m="auto"
          p={{ base: "10px", md: "20px", lg: "40px" }}
          spacing={5}
        >
          <FormControl isRequired>
            <Input
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <Input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </VStack>
        {isLoading ? <Spinner /> :<Button
          bg="#dbdbf5"
          color="black"
          onClick={handleLogin}
          _hover={{ bg: "#dbdbf5" }}
        >
          Login
        </Button>}
        <HStack mt={5} alignItems="center" justifyContent="center">
          <Text>Need an account?</Text>
          <NavLink to="/signup">
            <Text color="#5e03f1">Signup</Text>
          </NavLink>
        </HStack>
      </Box>
    </Box>
  );
}
