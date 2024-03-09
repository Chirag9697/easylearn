import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Allquizstatus = () => {
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
    console.log("allquiz",allquiz);
    setallquiz(allquiz.data.success);
  };
  useEffect(() => {
    getallquiz();
  }, []);
  return (
    <div className="w-96 bg-red--600 h-56 rounded-md mt-8 overflow-y-scroll p-4 bg-red-600">
      <h1 className="font-bold text-center">QUIZ SHEDULE</h1>
      {allquiz.map((quiz) => {
        return (
          <div className="my-2 bg-green-300 rounded-sm flex justify-between items-center shadow-lg h-16 opacity-90 p-2 mb-2">
            <p>{quiz.title}</p>
            <p>{quiz.time}</p>
            <p>{quiz.duration}</p>
            <p>{quiz.Marks}Marks</p>
            {/* <p>10marks</p> */}
          </div>
        );
      })}
    </div>
  );
};

export default Allquizstatus;
