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
import groovyWalkAnimation from "./typing.json";
import { css } from "@emotion/css";
import ScrollToBottom from "react-scroll-to-bottom";
import { useRef } from "react";
const socket = io.connect("http://localhost:3001");
const ROOT_CSS = css({
  height: 600,
  width: 400,
});
export default function Mainclass() {
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const ref = useRef(null);
  socket.on("connect", () => {
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
  const sendmessage = async (e) => {
    e.preventDefault();
    await socket.emit("sendmessage", {
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
  return (
    <div>
      <h1>Main class</h1>
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
        <div className="flex flex-col overflow-scroll">
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
  );
}
