import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router";
// import { StackDivider } from "@chakra-ui/react";
import { StackDivider } from "@chakra-ui/react";
import { Input } from '@chakra-ui/react'
import { Box } from "@chakra-ui/react";
export default function Logincard(props) {
  const toast = useToast();
  const navigate=useNavigate();
  const [logindetails, setLogindetails] = useState({email: "",password:""});
  const handleonchange = (e) => {
    setLogindetails({ ...logindetails, [e.target.name]: e.target.value });
    console.log(logindetails);
  };
  const handleLogin = async (e) => {
    console.log("login")
    e.preventDefault();
    const requestOptions = {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
          // token: localStorage["token"],
      },
    };
    //   const registerdata={registerdetails};
    const login = await axios.post(
      "http://localhost:3000/api/v1/auth/login",
    logindetails,
      requestOptions
    );
    const data=await login.data;
    if (data.error) {
      console.log("not able to login");
      toast({
        title: 'login',
        description: `${data.error}`,
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
      return;
    }
    const token=await login.data;
    // console.log(token);
    localStorage.setItem('token',token.token);
    console.log(localStorage.getItem('token'));
    toast({
      title: 'login',
      description: "successfully logged in",
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
    // console.log(socket.on('connection'));
    // socket.on("connect_error", (err) => {
      // console.log(`connect_error due to ${err.message}`);
    // });
    navigate('/home');
    return;
    // navigate("/login");

  };

  return (
    <Card className="flex flex-col items-center" style={{fontFamily:"roboto"}}>
      <CardHeader>
        <Heading size="md">LOGIN</Heading>
      </CardHeader>

      <CardBody>
        {/* <Stack divider={<StackDivider />} spacing="4"> */}
        <form onSubmit={handleLogin}>

          <Box>
            <Heading size="xs" textTransform="uppercase" className="mb-2 text-center" >
              Enter your Username
            </Heading>
            <Input name="email" placeholder='Enter your username' className="mb-2" onChange={handleonchange}/>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase" className="mb-2 text-center">
              Enter your Password
            </Heading>
            <Input name="password" placeholder='Enter your password' className="mb-2" onChange={handleonchange}/>
          </Box>
          <Button type="submit" className="flex justify-center w-full" style={{backgroundColor:"yellow"}} >LOGIN</Button>
        </form>
        {/* </Stack> */}
      </CardBody>
    </Card>
  );
}
