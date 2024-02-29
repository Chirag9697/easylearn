import React from "react";
import { Button, useEditable } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Materials = () => {
  const [allclass, setAllclass] = useState([]);
  const toast = useToast();
  const getallclasses = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };

    // console.log(id);
    const allclasses = await axios.get(
      "http://localhost:3001/api/v1/classes",
      requestOptions
    );
    console.log(allclasses.data);
    if (allclasses.data.error) {
      toast({
        title: "error message",
        description: `${allclasses.data.error}`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    setAllclass(allclasses.data.myclasses);
    // setAnnouncements(allmessages.data.announcements);
  };
  useEffect(() => {
    getallclasses();
  }, []);

  return (
    // <div>Materials</div>
    <>
      <Link to="/home">
        <Button colorScheme="blue">BACK</Button>
      </Link>
      <div className="flex flex-wrap space-x-2 w-[100vw] h-[100vh] bg-red-500 " >
        {allclass.map((myclass) => {
          return (
            <div class="p-4 lg:w-1/6">
                <Link to={`/materials/${myclass.id}`}>
                <div class="h-44 bg-gray-200 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative cursor-pointer hover:bg-gray-300">
                  <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CLASS
                  </h2>
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    {myclass.classname}
                  </h1>
                </div>
            </Link>
              </div>
          );
        })}
      </div>
    </>
  );
};

export default Materials;
