import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import axios from "axios";
const Quizpage = () => {
  const [allquiz, setallquiz] = useState([]);
  const getallquiz = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };

    const allquiz = await axios.get(
      `http://localhost:3001/api/v1/quiz/${localStorage.getItem("userid")}`,
      requestOptions
    );
    console.log("allquiz", allquiz);
    setallquiz(allquiz.data.success);
  };
  useEffect(() => {
    getallquiz();
  }, []);
  return (
    <div>
      <div>
        <Link to="/home">
          <Button colorScheme="blue">BACK</Button>
        </Link>
      </div>
      <div className="text-center font-bold">
        <h1>Upcoming Quizes</h1>
      </div>
      <div>
        {allquiz.map((quiz) => {
          return (
            <div className="my-2 bg-green-300 rounded-sm flex justify-between items-center shadow-lg h-16 opacity-90 p-2 mb-2">
              <p>{quiz.title}</p>
              <p>{quiz.time}</p>
              <p>{quiz.duration}</p>
              <p>{quiz.Marks}Marks</p>
              <Link to={`/quiz/${quiz.id}`}>
                <Button colorScheme="cyan">START QUIZ</Button>
              </Link>
              {/* <p>10marks</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Quizpage;
