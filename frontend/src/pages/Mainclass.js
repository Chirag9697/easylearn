import React from "react";
import { Input } from "@chakra-ui/react";
import io from "socket.io-client";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import Lottie from "lottie-react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import groovyWalkAnimation from "./typing.json";
import { css } from "@emotion/css";
import { WrapItem } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
// import useParams from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
const socket = io.connect("http://localhost:3001");
const ROOT_CSS = css({
  height: 600,
  width: 400,
});
export default function Mainclass() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const states = useSelector((state) => state.rolesdata);
  console.log(states);
  const toast = useToast();
  const [message, setMessage] = useState("");
  
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [allmembers, setAllmembers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [announcementmessage, setAnnouncementmessage] = useState("");
  const ref = useRef(null);
  const handleannouncement = (e) => {
    setAnnouncementmessage(e.target.value);
  };
  socket.on("connect", () => {
    socket.emit("joinroom", id);
    console.log("Connected to server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
  const handlemessage = (e) => {
    if (e.target.value.length == 0) {
      socket.emit("nottyping", socket.id);
    }
    setMessage(e.target.value);
  };

  const getallmembers = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    console.log(id);
    const allstudents = await axios.get(
      `http://localhost:3001/api/v1/classes/members/${id}`,
      requestOptions
    );
    if(allstudents.data.error){
      toast({
        title: "error message",
        description: `${allstudents.data.error}`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    // console.log(allstudents.data.allstudents);
    setAllmembers(allstudents.data.allstudents);
  };
  const sendmessage = async (e) => {
    e.preventDefault();
    await socket.emit("sendmessage", {
      room: id,
      message: message,
      username: localStorage.getItem("name"),
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    });
    setMessages((list) => [
      ...list,
      {
        room: id,
        message: message,
        username: localStorage.getItem("name"),
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      },
    ]);
    setMessage("");
    socket.emit("nottyping", socket.id);
  };
  const typingevent = (e) => {
    if (message.length > 0) {
      socket.emit("typing", socket.id);
    } else {
      socket.emit("nottyping", socket.id);
    }
  };
  useEffect(() => {
    socket.on("someonetyping", (args) => {
      if (socket.id != args) {
        setTyping(true);
      }
    });
    socket.on("noonetyping", (args) => {
      setTyping(false);
    });
    socket.on("receivemessage", (args) => {
      console.log("message received");
      setMessages((list) => [...list, args]);
      console.log("messages", messages);
    });
    return () => {
      socket.off("someonetyping");
      socket.off("noonetyping");
      socket.off("receivemessage");
    };
    //  socket.off("receivemessage");
  }, [socket]);
  useEffect(() => {
    ref.current?.scrollIntoView({
      behaviour: "smooth",
      block: "end",
    });
  }, [messages.length]);
  const getallannouncements = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };

    console.log(id);
    const allmessages = await axios.get(
      `http://localhost:3001/api/v1/announcements/${id}/${states.userid}`,
      requestOptions
    );
    if(allmessages.data.error){
      toast({
        title: "error message",
        description: `${allmessages.data.error}`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    setAnnouncements(allmessages.data.announcements);
    console.log("helo",allmessages);
  };
  const handleannouncementsubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const obj = {
      teacherid: states.userid,
      classid: id,
      message: announcementmessage,
    };
    console.log("dsfasdf",obj);
    const addannouncements = await axios.post(
      `http://localhost:3001/api/v1/announcements/`,
      obj,
      requestOptions,
    );
    if(addannouncements.data.error){
      toast({
        title: "error message",
        description: `${addannouncements.data.error}`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    console.log("announcemnts",addannouncements);
    getallannouncements();
  };
  const handledeleteannouncements = async (id) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const deleteannouncements = await axios.delete(
      `http://localhost:3001/api/v1/announcements/${id}`,

      requestOptions
    );
    if(deleteannouncements.data.error){
      toast({
        title: "error message",
        description: `${deleteannouncements.data.error}`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    getallannouncements();
    //     };
  };
  const gettingannouncement = () => {
    getallannouncements();
    onOpen();
  };
  useEffect(() => {
    getallmembers();
  }, []);

  return (
    <div>
      <h1>Main class</h1>
      <div>
        <Button onClick={gettingannouncement}>View Announcements</Button>
        {states.role == "teacher" && (
          <Button onClick={onOpen2}>ADD Announcements</Button>
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Announcements</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {
                announcements.map((announcement)=>{
                  return (
                    <div key={announcement.id}>
                      <p>{announcement.message}</p>
                      {states.role=="teacher" && <Button onClick={()=>handledeleteannouncements(announcement.id)}>Delete</Button>}
                    </div>
                  )
                })
              }
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpen2} onClose={onClose2}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Announcement</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleannouncementsubmit}>
                <Input placeholder="add your announceent" onChange={handleannouncement}/>
                <Button type="submit">Add</Button>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose2}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <div className="flex">
        <div className="w-80">
          <h1>members</h1>
          <div className="p-4 bg-gray-400 h-96 flex flex-col border-black overflow-scroll overflow-x-hidden">
            {allmembers.map((member) => {
              return (
                <Card className="flex p-1">
                  <WrapItem>
                    <Avatar
                      sx={{ marginTop: "0.2rem" }}
                      name={member.name}
                      src="https://bit.ly/tioluwani-kolawole"
                    />
                    <CardBody>
                      <Text>{member.name}</Text>
                    </CardBody>
                  </WrapItem>
                </Card>
              );
            })}
          </div>
        </div>
        <div>
          <div className="w-80 h-96  bg-gray-600 flex flex-col overflow-scroll overflow-x-hidden">
            {messages.map((message, index) => {
              return (
                <div key={index}>
                  <p class="p-4 text-center text-sm text-gray-500">
                    {message.time}
                  </p>
                  <div
                    className={
                      message.username === localStorage.getItem("name")
                        ? "flex justify-end"
                        : "flex"
                    }
                  >
                    <div
                      className={
                        message.username === localStorage.getItem("name")
                          ? "w-40 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                          : " w-40 ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white "
                      }
                    >
                      {/* <p>{message.username}</p> */}
                      <p class="text-sm text-gray-500">{message.username}</p>
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={ref} />
          </div>
          <div className="flex flex-col">
            {typing == true && (
              <div className="flex w-80 align-middle ">
                <p className="w-90 mt-4">Someone is typing </p>
                <div className="w-20">
                  <Lottie
                    width={10}
                    animationData={groovyWalkAnimation}
                    loop={true}
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col ">
              <form onSubmit={sendmessage}>
                <Input
                  placeholder="Basic usage"
                  onChange={handlemessage}
                  value={message}
                  sx={{ width: "16rem" }}
                  onKeyDown={typingevent}
                  required
                />
                <Button type="submit" colorScheme="blue">
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
