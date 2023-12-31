import React from "react";
import Sidebar from "../components/Sidebar";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function Myclasses() {
  const [mydetails, setmydetails] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allstudents, setAllstudents] = useState([]);
  const [allclasses, setAllclasses] = useState([]);
  const [newmembers, setNewmembers] = useState([]);
  const element=useRef();
  const getmydetails = async () => {
    const requestOptions = {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const myaccdet = await axios.get(
      "http://localhost:3001/api/v1/users/getmydetails",
      requestOptions
    );
    setmydetails(myaccdet.data.details);
  };
  const getallclasses = async () => {
    const requestOptions = {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const allclass = await axios.get(
      "http://localhost:3001/api/v1/classes/",
      requestOptions
    );
    console.log("allclass", allclass.data.myclasses);
    // setAllclasses(allclass.data.myclasses);
    if(allclass.data.myclasses!=undefined){

      const newclass = allclass.data.myclasses.map((item) => {
        return { ...item };
      });
      setAllclasses(newclass);
    }
    // console.log("adad",allclasses);
  };
  const getallstudents = async () => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const myaccdet = await axios.get(
      "http://localhost:3001/api/v1/users/",
      requestOptions
    );
    console.log("hello",myaccdet);
    setAllstudents(myaccdet.data.allstudents);
  };
  const handleonchange = (event) => {
    var updatedList = [...newmembers];
    if (event.target.checked) {
      updatedList = [...newmembers, event.target.value];
    } else {
      updatedList.splice(newmembers.indexOf(event.target.value), 1);
    }
    setNewmembers(updatedList);
  };
  const addclassroom = async () => {
    console.log("hello");
    const requestOptions = {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const item = { classname: "temporary", members: newmembers,teacherid:localStorage.getItem("userid")};
    const myaccdet = await axios.post(
      "http://localhost:3001/api/v1/classes",
      item,
      requestOptions
    );
    console.log(myaccdet);
    // element.click();
    onClose();
    getallclasses();
  };
  const handlemouseenter=(event)=>{
    event.target.style.backgroundColor="black";
  }
  const handlemouseleave=(event)=>{
    event.target.style.backgroundColor="white";
  }
  useEffect(() => {
    if(localStorage.getItem("role")=="teacher"){
       getmydetails();
       getallstudents();
       getallclasses();
      }
      else{
        getallclasses();
      // getallmyclasses();
    }
  }, []);

  return (
    <>
      <Flex w="100%">
        <Sidebar />
        <div
          style={{
            padding:"5rem",
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            flexWrap: "wrap",
            width: "50%",
            backgroundColor: "whitesmoke",
            border:"1px solid black",
            borderRadius: "5px",
            marginTop: "2rem",
            marginLeft: "5rem",
            overflow: "scroll",
          }}
        >
          {allclasses && allclasses.map((classItem, index) => (
            <Link to={`/myclasses/${classItem.id}`}>
            <Card key={index} sx={{cursor:"pointer"}} _hover={{bg:"grey"}}>
               <CardHeader>
                <Heading size="md">{classItem.classname}</Heading>
              </CardHeader>
              {/* Add other card components as needed */}
            </Card>
            </Link>
          ))}
        </div>
        {
          localStorage.getItem("role")=="teacher" && 
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"20vw"}}>
          <Button onClick={onOpen}>Add a classroom</Button>
        </div>
        }
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>

            <ModalHeader>ADD STUDENTS</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {allstudents && allstudents.map((student) => {
                return (
                  <Card
                    id={student.id}
                    className="mt-4 cursor-pointer"
                    sx={{ backgroundColor: "yellow" }}
                    >
                    <CardBody className="flex justify-between">
                      <Text>{student.name}</Text>
                      <Checkbox
                        value={student.id}
                        onChange={handleonchange}
                      ></Checkbox>
                    </CardBody>
                  </Card>
                );
              })}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose} ref={element}>
                Close
              </Button>
              <Button variant="ghost" onClick={addclassroom}>
                ADD
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}
