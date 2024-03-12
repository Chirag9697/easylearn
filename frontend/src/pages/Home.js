import React, { useEffect } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import Attendancepercentage from "../components/Attendancepercentage";
import Assignmentstatus from "../components/Assignmentstatus";
import { useNavigate } from "react-router";
import Allquizstatus from "../components/Allquizstatus";
import Markstatus from "../components/Markstatus";
export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });
  return (
    <>
      {/* <Flex w="100%"> */}
      <div className="flex">
        <Sidebar />
        <div className="flex flex-wrap w-[80vw] mx-14">
          <Attendancepercentage />
          <Assignmentstatus/>
          <Allquizstatus/>
          <Markstatus/>
        </div>
      </div>
      {/* </Flex> */}
    </>
  );
};
