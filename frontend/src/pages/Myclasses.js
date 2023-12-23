import React from "react";
import Sidebar from "../components/Sidebar";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
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
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
export default function Myclasses() {
  const [mydetails, setmydetails] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allstudents, setAllstudents] = useState([]);
  const [allclasses, setAllclasses] = useState([]);
  const[newmembers,setNewmembers]=useState([]);
  const getmydetails = async () => {
    const requestOptions = {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const myaccdet = await axios.get(
      "http://localhost:3000/api/v1/users/getmydetails",
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
      "http://localhost:3000/api/v1/classes/",
      requestOptions
    );
    console.log("allclass",allclass.data.details);
    setAllclasses(allclass.data.allstudents);
  };
  const getallstudents = async () => {
    const requestOptions = {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const myaccdet = await axios.get(
      "http://localhost:3000/api/v1/users/",
      requestOptions
    );
    setAllstudents(myaccdet.data.allstudents);
  };
  const handleonchange=(event)=>{
    var updatedList = [...newmembers];
    if (event.target.checked) {
        updatedList = [...newmembers, event.target.value];
    } else {
        updatedList.splice(newmembers.indexOf(event.target.value), 1);
    }
    setNewmembers(updatedList);
  }
  const addclassroom=async()=>{
    console.log("hello");
    const requestOptions = {
        // method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage["token"],
        },
      };
      const item={classname:"temporary",members:newmembers};
      const myaccdet = await axios.post(
        "http://localhost:3000/api/v1/classes",
        item,
        requestOptions,
      );
      console.log(myaccdet);
  }
  useEffect(() => {
    getmydetails();
    getallstudents();
    getallclasses();
  }, []);

  return (
    <>
      <Flex w="100%">
        <Sidebar />
        <h2>Myclasses</h2>
        <div>
          <Button onClick={onOpen}>Add a classroom</Button>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {allstudents.map((student) => {
                return (

                  <Card id={student.id} className="mt-4 cursor-pointer" sx={{backgroundColor:"yellow"}}>
                    <CardBody className="flex justify-between">
                      <Text>
                        {student.name}
                      </Text>
                    <Checkbox value={student.id} onChange={handleonchange}></Checkbox>
                    </CardBody>
                  </Card>
                );
              })}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={addclassroom}>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}
