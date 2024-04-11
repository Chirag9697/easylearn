import React from "react";
import { Button, Input, WrapItem } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import io from "socket.io-client";
import { useEffect } from "react";
import { useState } from "react";
import axios, { all } from "axios";
const socket = io.connect("http://localhost:3001");
// console.log(socket);
const Askadoubtcomponent = () => {
  const [faculties, setFaculties] = useState([]);
  const [message, setMessage] = useState("");
  const [doubts, setDoubts] = useState([]);
  const [typing, setTyping] = useState(false);
  const [me, setMe] = useState(null);
  const [messages, setMessages] = useState([]);
  const [facultymessage, setFacultymessage] = useState(0);
  // console.log("hello")
  // const sendmessage = async (e) => {
  //   e.preventDefault();
  //   await socket.emit("sendmessage", {
  //     room: id,
  //     message: message,
  //     username: localStorage.getItem("name"),
  //     time:
  //       new Date(Date.now()).getHours() +
  //       ":" +
  //       new Date(Date.now()).getMinutes(),
  //   });
  //   setMessages((list) => [
  //     ...list,
  //     {
  //       room: id,
  //       message: message,
  //       username: localStorage.getItem("name"),
  //       time:
  //         new Date(Date.now()).getHours() +
  //         ":" +
  //         new Date(Date.now()).getMinutes(),
  //     },
  //   ]);
  //   setMessage("");
  //   socket.emit("nottyping", socket.id);
  // };

  // //used for showing someone is typing
  // const typingevent = (e) => {
  //   if (message.length > 0) {
  //     socket.emit("typing", id);
  //   } else {
  //     socket.emit("nottyping", id);
  //   }
  // };
  const getallfaculties = async () => {
    const requestOptions = {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const allfaculties = await axios.get(
      `http://localhost:3001/api/v1/classes/faculties/${localStorage.getItem(
        "userid"
      )}`,
      requestOptions
    );
    setFaculties(allfaculties.data.allfacultylist);
  };
  const handlemessage = (e) => {
    if (e.target.value.length === 0) {
      socket.emit("nottyping", socket.id);
    }
    setMessage(e.target.value);
  };
  // useEffect(() => {
  //   socket.on("someonetyping", (args) => {
  //     console.log("someone is typing");
  //     if (socket.id != args) {
  //       setTyping(true);
  //     }
  //   });
  //   socket.on("noonetyping", (args) => {
  //     setTyping(false);
  //   });
  //   socket.on("receivemessage", (args) => {
  //     console.log("message received");
  //     setMessages((list) => [...list, args]);
  //     console.log("messages", messages);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Disconnected from server");
  //   });
  //   return () => {
  //     // socket.off("calluser");
  //     socket.off("someonetyping");
  //     socket.off("noonetyping");
  //     socket.off("receivemessage");
  //     socket.off("me");
  //     socket.off("disconnect");
  //   };
  // }, [socket]);
  // useEffect(() => {
  //   ref.current?.scrollIntoView({
  //     behaviour: "smooth",
  //     block: "end",
  //   });
  // }, [messages.length]);
  const getalldoubts = async () => {
    const requestOptions = {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const alldoubts = await axios.get(
      `http://localhost:3001/api/v1/messages/doubts/${localStorage.getItem(
        "userid"
      )}`,
      requestOptions
    );
    console.log(alldoubts)
    setDoubts(alldoubts.data.messages);
  };
  const sendmessage = async (e) => {
    e.preventDefault();
    const requestOptions = {
      // method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const item = {
      senderid: localStorage.getItem("userid"),
      message: message,
      receiverid: localStorage.getItem("role")==="student"?faculties[facultymessage].id:doubts[facultymessage],
      date: new Date(),
    };
    const messagesent = await axios.post(
      "http://localhost:3001/api/v1/messages",
      item,
      requestOptions
    );

    console.log("message is sentt");
    getallmessages(facultymessage);
  };
  useEffect(() => {
    // socket.on("connect", () => {
    //   console.log("connected");
    // });
    // socket.on("disconnect", () => {
    //   console.log("disconnected");
    // });
    // socket.on("myid",(id)=>{
    //   setMe(id);
    // })
    if (localStorage.getItem("role") === "student") {
      getallfaculties();
    }
    if (localStorage.getItem("role") === "teacher") {
      getalldoubts();
    }
    setFacultymessage(-1);
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);
  const setfacultymessage = async (index) => {
    setFacultymessage(index);
    getallmessages(index);
    
  };
  const getallmessages=async(index)=>{
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };

    // console.log(faculties[index].id);
    const allmessages = await axios.get(
      `http://localhost:3001/api/v1/messages/${localStorage.getItem(
        "userid"
      )}/${localStorage.getItem("role")==="student"?faculties[index].id:doubts[index]}`,
      requestOptions
    );
    console.log(allmessages);
    setMessages(allmessages.data.messages);
  }
  return (
    <div className="mt-10 mx-8 bg-red-500 w-[70vw] rounded-xl p-4">
      <p className="text-center font-bold text-3xl">Ask A Doubt</p>
      <div className="flex justify-center">
        <div className="flex flex-col w-[20vw] overflow-y-scroll bg-white">
          
          {localStorage.getItem("role")==="student" && faculties.length>0 &&  faculties.map((faculty, index) => {
            return (
              <div
                className="flex p-4 bg-white w-[full] h-20 border-y-2 border-black space-x-2 align-middle cursor-pointer hover:bg-gray-300"
                onClick={() => setfacultymessage(index)}
              >
                <WrapItem>
                  <Avatar
                    name={localStorage.getItem("name")}
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                </WrapItem>
                <p className="mt-2">{faculty.name}</p>
              </div>
            );
          })}
          {localStorage.getItem("role")==="teacher" && doubts.map((doubt, index) => {
            return (
              <div
                className="flex p-4 bg-white w-[full] h-20 border-y-2 border-black space-x-2 align-middle cursor-pointer hover:bg-gray-300"
                onClick={() => setfacultymessage(index)}
              >
                <WrapItem>
                  <Avatar
                    name={localStorage.getItem("name")}
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                </WrapItem>
                <p className="mt-2">{doubt}</p>
              </div>
            );
          }
          )}
        </div>
        <div className="flex flex-col bg-white w-[40vw] h-[80vh]">
          {facultymessage === -1 && <p>no meesage selected</p>}
          {facultymessage !== -1 && (
            <div>
              <div className="flex space-x-3 bg-gray-400 p-2 shadow-md">
                <WrapItem>
                  <Avatar
                    name={localStorage.getItem("name")}
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                </WrapItem>
                <h1 className="mt-2">
                  {faculties.length > 0 && faculties[facultymessage].name}
                </h1>
              </div>
              <div className="bg-slate-900 h-[60vh] overflow-y-scroll">
                {messages &&
                  messages.map((m) => {
                    if (m.senderid === localStorage.getItem("userid")) {
                      return (
                        <div class="flex items-center justify-start flex-row-reverse">
                          <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div class="relative flex flex-end mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>{m.message}</div>
                            {/* <p className="text-yel/low-400">{message.message}</p> */}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div class="flex flex-row items-center">
                          <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>{m.message}</div>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
              <form onSubmit={sendmessage}>
                <div className="flex">
                  <Input
                    placeholder="Enter the message"
                    variant={"outline"}
                    colorScheme="gray"
                    onChange={handlemessage}
                  />
                  <Button colorScheme="blue" type="submit">
                    SEND
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Askadoubtcomponent;
