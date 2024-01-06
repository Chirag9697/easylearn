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
import {useDispatch,useSelector} from 'react-redux';
import {rolesstore} from "../features/roles/rolesdata";
export default function Logincard(props) {
  const toast = useToast();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [logindetails, setLogindetails] = useState({email: "",password:""});
  const handleonchange = (e) => {
    setLogindetails({ ...logindetails, [e.target.name]: e.target.value });
    console.log(logindetails);
  };
  const handleLogin = async (e) => {
    console.log("login")
    e.preventDefault();
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };
   
    //   const registerdata={registerdetails};
    const login = await axios.post(
      "http://localhost:3001/api/v1/auth/login",
  {...logindetails,role:props.role},
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
    localStorage.setItem("name",logindetails.email);
    const requestOptions2 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const getid=await axios.get("http://localhost:3001/api/v1/users/getmydetails",requestOptions2);
    if(getid.data.error){
      toast({
        title: 'error message',
        description: `${getid.data.error}`,
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
      return;
    }
    console.log(getid);
    localStorage.setItem("userid",getid.data.details.id);
    const newobj={teacherid:getid.data.details.id,role:props.role};
    console.log(localStorage.getItem('token'));
    toast({
      title: 'login',
      description: "successfully logged in",
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
    dispatch(rolesstore(newobj));
    localStorage.setItem('role',props.role);
    navigate('/home');
    return;

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
