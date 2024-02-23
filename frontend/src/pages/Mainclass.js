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
import peer from "../service/peer";
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
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { IoSendOutline } from "react-icons/io5";
// import peer from "../service/peer";
import Peer from "simple-peer";
import styled from "styled-components";
// import { useCallback } from "react";
import { useCallback } from "react";
const socket = io.connect("http://localhost:3001");
const ROOT_CSS = css({
  height: 600,
  width: 400,
});

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
`;

const Video = (props) => {
  const ref = useRef();
  console.log("sdsad");
  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

export default function Mainclass() {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const { id } = useParams();
  const roomID = id + 2000;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const states = useSelector((state) => state.rolesdata);
  const toast = useToast();
  const [message, setMessage] = useState("");

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [allmembers, setAllmembers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [myStream, setMyStream] = useState();
  const [remotestream, setRemoteStream] = useState();
  const [announcementmessage, setAnnouncementmessage] = useState("");
  const ref = useRef(null);
  const cancelRef = React.useRef();
  const handleannouncement = (e) => {
    setAnnouncementmessage(e.target.value);
  };

  //use to start the class
  // const handleCallUser = useCallback(async () => {
  //   const stream = await navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //     video: { width: 1280, height: 720 },
  //   });
  //   // const offer=await peer.getOffer();
  //   // socket.emit("offer",{offer,id});

  //   setMyStream(stream);
  // });

  const handlemessage = (e) => {
    if (e.target.value.length == 0) {
      socket.emit("nottyping", socket.id);
    }
    setMessage(e.target.value);
  };

  //getting all members of the class
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
    console.log("allstudents", allstudents);
    if (allstudents.data.error) {
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

  //send the messages in the chats
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

  //used for showing someone is typing
  const typingevent = (e) => {
    if (message.length > 0) {
      socket.emit("typing", id);
    } else {
      socket.emit("nottyping", id);
    }
  };

  //used to get all the announcments
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
      `http://localhost:3001/api/v1/announcements/${id}/${localStorage.getItem(
        "userid"
      )}`,
      requestOptions
    );
    console.log(allmessages);
    if (allmessages.data.error) {
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
  };

  //it is used to add announcements
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
      teacherid: localStorage.getItem("userid"),
      classid: id,
      message: announcementmessage,
    };
    console.log("dsfasdf", obj);
    const addannouncements = await axios.post(
      `http://localhost:3001/api/v1/announcements/`,
      obj,
      requestOptions
    );
    if (addannouncements.data.error) {
      toast({
        title: "error message",
        description: `${addannouncements.data.error}`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    console.log("announcemnts", addannouncements);
    onClose2();
    toast({
      title: "success message",
      description: `announcement successully added`,
      status: "success",
      duration: 1000,
      isClosable: true,
    });
    getallannouncements();
  };

  //use to delete the announcements
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
    if (deleteannouncements.data.error) {
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
    onClose3();
  };

  //showing all the announmenet in the dialog box
  const gettingannouncement = () => {
    getallannouncements();
    onOpen();
  };

  // function createPeer(userToSignal, callerID, stream) {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream,
  //   });

  //   peer.on("signal", (signal) => {
  //     socketRef.current.emit("sending signal", {
  //       userToSignal,
  //       callerID,
  //       signal,
  //     });
  //   });

  //   return peer;
  // }

  // function addPeer(incomingSignal, callerID, stream) {
  //     const peer = new Peer({
  //         initiator: false,
  //         trickle: false,
  //         stream,
  //     })

  //     peer.on("signal", signal => {
  //         socketRef.current.emit("returning signal", { signal, callerID })
  //     })

  //     peer.signal(incomingSignal);

  //     return peer;
  // }

  useEffect(() => {
    socket.on("someonetyping", (args) => {
      console.log("someone is typing");
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

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    return () => {
      socket.off("someonetyping");
      socket.off("noonetyping");
      socket.off("receivemessage");

      socket.off("disconnect");
    };
  }, [socket]);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behaviour: "smooth",
      block: "end",
    });
  }, [messages.length]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("joinroom", id);
      console.log("Connected to server");
    });

    getallmembers();
    return () => {
      socket.off("connect");
    };
  }, []);

  //   useEffect(() => {
  //     socketRef.current = io.connect("http://localhost:3001");
  //     navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
  //         userVideo.current.srcObject = stream;
  //         socketRef.current.emit("join room2", roomID);
  //         socketRef.current.on("all users", users => {
  //             const peers = [];
  //             users.forEach(userID => {
  //                 const peer = createPeer(userID, socketRef.current.id, stream);
  //                 peersRef.current.push({
  //                     peerID: userID,
  //                     peer,
  //                 })
  //                 peers.push(peer);
  //             })
  //             console.log("dcadc",peers);
  //             setPeers(peers);
  //         })

  //         socketRef.current.on("user joined", payload => {
  //             const peer = addPeer(payload.signal, payload.callerID, stream);
  //             peersRef.current.push({
  //                 peerID: payload.callerID,
  //                 peer,
  //             })

  //             setPeers(users => [...users, peer]);
  //         });

  //         socketRef.current.on("receiving returned signal", payload => {
  //             const item = peersRef.current.find(p => p.peerID === payload.id);
  //             item.peer.signal(payload.signal);
  //         });
  //     })
  // }, []);

  return (
    <div
      className="flex justify-between  w-full p-2"
      style={{ height: "100vh" }}
    >
      <div className="w-80">
        <div className="bg-gray-400 flex justify-center">
          <h1>Students</h1>
        </div>
        <div className="p-4 bg-gray-400 h-96 flex flex-col border-black overflow-scroll overflow-x-hidden">
          {allmembers.map((member) => {
            return (
              <Card className="flex p-1 mb-2">
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
      <div className=" h-full w-3/4 flex flex-col items-center">
        <div className="bg-black w-3 h-5/6" style={{ width: "49vw" }}>
          hello
        </div>
        <div className="mt-3">
          {localStorage.getItem("role") == "teacher" && (
            <Button colorScheme="red">Start Class</Button>
          )}
        </div>
        <div
          className=" mt-4 flex justify-center justify-between"
          style={{ width: "40vw" }}
        >
          {/* <div className="bg-red-600 flex w-24 justify-center"> */}

          <Button colorScheme="blue" onClick={gettingannouncement}>
            View Announcements
          </Button>
          {localStorage.getItem("role") === "teacher" && (
            <Button colorScheme="blue" onClick={onOpen2}>
              ADD Announcements
            </Button>
          )}
          {/* </div> */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Announcements</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {announcements.map((announcement) => {
                  return (
                    <>
                      <div key={announcement.id}>
                        <p>{announcement.message}</p>
                        {localStorage.getItem("role") == "teacher" && (
                          <Button colorScheme="red" onClick={() => onOpen3()}>
                            Delete
                          </Button>
                        )}
                      </div>
                      <AlertDialog
                        isOpen={isOpen3}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose3}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                              Delete Customer
                            </AlertDialogHeader>

                            <AlertDialogBody>
                              Are you sure? You can't undo this action
                              afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                              <Button ref={cancelRef} onClick={onClose3}>
                                Cancel
                              </Button>
                              <Button
                                colorScheme="red"
                                onClick={() =>
                                  handledeleteannouncements(announcement.id)
                                }
                                ml={3}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </>
                  );
                })}
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
                  <Input
                    placeholder="add your announceent"
                    onChange={handleannouncement}
                  />
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
      </div>

      <div className="flex">
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
                  <IoSendOutline />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
