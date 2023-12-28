import React, { useEffect } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router";
export const Home = () => {
  const navigate=useNavigate();
  useEffect(()=>{

    if(!localStorage.getItem("token")){
      navigate('/login');
    }
  })
  return (
    <Flex w="100%">
    <Sidebar />
    
    </Flex>
  );
};
