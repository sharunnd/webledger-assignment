import {
  Box,
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { signupFun } from "../redux/signupReducer/actions";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPass] = useState("");
  const toast = useToast();
  const isLoading = useSelector((state) => state.signupReducer.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  
  const handleRegister = () => {
    if (!email || !name || !password) {
      toast({
        position: "top",
        title: `Please fill the required fields`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    const regData = {
      email,
      password,
      name,
    };

    dispatch(signupFun(regData))
      .then((res) => {
        toast({
          position: "top",
          title: `${res.data.msg}`,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        
        setTimeout(() => {
          navigate("/login")
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

    setEmail("");
    setName("");
    setPass("");
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
        textAlign="center"
      >
        <Heading fontWeight={500}>Signup</Heading>
        <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={5} mt={10}>
          <FormControl>
            <Input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
          </FormControl>
        </SimpleGrid>
        {isLoading ? <Spinner /> :<Button
          mt={10}
          bg="#dbdbf5"
          color="black"
          onClick={handleRegister}
          _hover={{ bg: "#dbdbf5" }}
        >
          Signup
        </Button>}

        <HStack mt={5} alignItems="center" justifyContent="center">
          <Text>Already have an account?</Text>
          <NavLink to="/login">
            <Text color="#7575fd">Login</Text>
          </NavLink>
        </HStack>
      </Box>
    </Box>
  );
}
