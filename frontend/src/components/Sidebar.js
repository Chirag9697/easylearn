import React, { useState } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiBriefcase,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { Button } from "@chakra-ui/react";
import { IoPawOutline } from "react-icons/io5";
import NavItem from "../components/NavItem";
import { useNavigate } from "react-router";
import { WrapItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const [navSize, changeNavSize] = useState("large");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });
  return (
    <Flex
      // className="w-32"
      pos="sticky"
      left="5"
      h="95vh"
      // w="20vw"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      backgroundColor={"#e4f0f3"}
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : "250px"}
      flexDir="column"
    >
     
      {/* <NavItem navSize={navSize} icon={FiUser} title="Clients" /> */}
      {/* <NavItem navSize={navSize} icon={IoPawOutline} title="Animals" /> */}
      {/* <NavItem navSize={navSize} icon={FiDollarSign} title="Stocks" /> */}
      {/* <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" /> */}
      {/* <NavItem navSize={navSize} icon={FiSettings} title="Settings" /> */}

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
        <Flex mt={9} align="center">
          <WrapItem>
            <Avatar
              name={localStorage.getItem("name")}
              src="https://bit.ly/tioluwani-kolawole"
            />
          </WrapItem>
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              {localStorage.getItem("name")}
            </Heading>
            {localStorage.getItem("role") == "teacher" && (
              <Text color="gray">Faculty</Text>
            )}
            {localStorage.getItem("role") == "student" && (
              <Text color="gray">student</Text>
            )}
          </Flex>
        </Flex>
        <Divider mt="3" display={navSize == "small" ? "none" : "flex"} />
        <Flex
          p="1%"
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          as="nav"
        >
          <Link to="/myclasses">
            <NavItem
              navSize={navSize}
              icon={FiHome}
              title="MyClasses"
              description="This is the description for the dashboard."
            />
          </Link>
          <Link to="/materials">
            <NavItem navSize={navSize} icon={FiCalendar} title="Study materials" />
          </Link>
          
        </Flex>
        <Button onClick={logout} colorScheme="red" className="w-full flex justify-center">LOGOUT</Button>
      </Flex>
    </Flex>
  );
}
