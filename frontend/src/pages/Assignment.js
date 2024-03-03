import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Assignment = () => {
  const [classes, setAllclasses] = useState([]);
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
    if (allclass.data.myclasses != undefined) {
      const newclass = allclass.data.myclasses.map((item) => {
        return { ...item };
      });
      setAllclasses(newclass);
    }
  };
  useEffect(() => {
    getallclasses();
  }, []);
  return (
    // <div>Assignment</div>
    <div className="flex">
      <Sidebar />
      <div className="ml-16 m-5 flex flex-wrap space-x-2 bg-red-400 w-[60vw] rounded-md">
        {classes.map((c) => {
          return (
            <Link to={`/assignments/${c.id}`}>
            <div className="flex flex-center  items-center m-3 bg-gray-400 w-44 rounded-md opacity-90 shadow-lg h-40 hover:bg-gray-700 cursor-pointer">
              <p className="w-full font-semibold text-3xl text-center">{c.classname}</p>
            </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Assignment;
