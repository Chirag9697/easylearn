import React from "react";
import Sidebar from "../components/Sidebar";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Input } from '@chakra-ui/react'
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
import Classcard from "../components/Classcard";
import { Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function Myclasses() {
  const [mydetails, setmydetails] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allstudents, setAllstudents] = useState([]);
  const [allclasses, setAllclasses] = useState([]);
  const [newmembers, setNewmembers] = useState([]);
  const[classname,setClassname]=useState("");
  const element=useRef();
  const handleclassname=(e)=>{
    setClassname(e.target.value);
  }
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
    if(classname.length==0){
      alert("class name must be given");
      return;
    }
    if(newmembers.length==0){
      alert("add students");
      return;
    }
    console.log("hello");
    const requestOptions = {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const item = { classname: classname, members: newmembers,teacherid:localStorage.getItem("userid")};
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
            display: "grid",
            gap:"50px 50px",
            gridTemplateColumns:"repeat(3, 1fr)",
            width: "50%",
            backgroundColor: "whitesmoke",
            border:"1px solid black",
            borderRadius: "5px",
            marginTop: "2rem",
            marginLeft: "5rem",
            marginBottom:"2rem",  
            overflow: "scroll",
            overflowX:"hidden",
            maxHeight:"89vh",
          }}
        >
          {allclasses && allclasses.map((classItem, index) => (

         
              <Classcard id={classItem.id} key={index} classname={classItem.classname} getallstufunc={getallclasses}/>
     
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

            <ModalHeader>ADD YOUR CLASS</ModalHeader>
            <div className="flex flex-col items-center">
              <p className="font-bold">Enter name of class:</p>
              <Input style={{width:"25vw"}} placeholder='Enter class name' onChange={handleclassname}  required/>
            </div>
            <ModalCloseButton />
            <ModalBody>
              <p className="mt-2 font-semibold text-xl">Add students</p>
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
              <Button colorScheme="linkedin" mr={3} onClick={onClose} ref={element}>
                Close
              </Button>
              <Button colorScheme="linkedin" variant="solid" onClick={addclassroom}>
                ADD
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}
