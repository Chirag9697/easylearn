import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/react";
// import { StackDivider } from "@chakra-ui/react";
import { StackDivider } from "@chakra-ui/react";
import { Input } from '@chakra-ui/react'
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

export default function Registecard(props) {
  const navigate = useNavigate();
  const toast = useToast();
  const [registerdetails, setRegisterdetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleonchange = (e) => {
    setRegisterdetails({ ...registerdetails, [e.target.name]: e.target.value });
    console.log(registerdetails);
  };
  const handleregister = async (e) => {
    e.preventDefault();
    console.log("register");
    const requestOptions = {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
        //   token: localStorage["token"],
      },
    };
    //   const registerdata={registerdetails};
    // console.log("register");
    const register = await axios.post(
      "http://localhost:3001/api/v1/auth/register",
      {...registerdetails,role:props.role},
      requestOptions
    );
    const data = await register.data;
    if (data.error) {
      toast({
        title: "Account not created.",
        description: `${data.error}`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      console.log("not able to register");
      return;
    }
    toast({
      title: "Account created.",
      description: "We've registered your account for you.",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
    navigate("/login");
  };
  return (
    <Card className="flex flex-col items-center" style={{fontFamily:"roboto"}}>
      <CardHeader>
        <Heading size="md">Register</Heading>
      </CardHeader>

      <CardBody>
        <form onSubmit={handleregister}>

        {/* <Stack divider={<StackDivider />} spacing="4"> */}
          <Box>
            <Text className="text-center font-bold">Enter your name</Text>
            <Input name="name" placeholder='Enter your name' className="mb-2" onChange={handleonchange}/>
          </Box>
          <Box>
          <Text className="text-center font-bold">Enter your username</Text>
            <Input name="email" placeholder='Enter your username' className="mb-2" onChange={handleonchange}/>
          </Box>
          <Box>
          <Text className="text-center font-bold">Enter your password</Text>
            <Input name="password" placeholder='Enter your password' className="mb-2" onChange={handleonchange}/>
          </Box>
          <Button type="submit" className="flex justify-center w-full mt-4" style={{backgroundColor:"blue"}} >REGISTER</Button>
        </form>
        {/* </Stack> */}
      </CardBody>
    </Card>
  )
}
