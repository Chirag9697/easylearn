import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios, { all } from "axios";
const Markstatus = () => {
  const [allmarks, setallmarks] = useState([]);
  const getallmarks = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };

    const allmarks = await axios.get(
      `http://localhost:3001/api/v1/marks/${localStorage.getItem("userid")}`,
      requestOptions
    );
    // console.log("allquiz",allquiz);
    console.log("allmarks",allmarks);
    setallmarks(allmarks.data.success);
  };
  useEffect(() => {
    getallmarks();
  }, []);
  return (
    <div className="w-96 bg-red--600 h-56 rounded-md mt-8 overflow-y-scroll p-4 bg-red-600">
      <h1 className="font-bold text-center">Marks Obtained</h1>
      {allmarks.map((mark) => {
        return (
          <div className="my-2 bg-green-300 rounded-sm flex justify-between items-center shadow-lg h-16 opacity-90 p-2 mb-2">
            <p>{mark.title}</p>
            <p>{mark.marks} Marks Scored</p>
            {/* <p>10marks</p> */}
          </div>
        );
      })}
    </div>
  );
};

export default Markstatus;
