import React from "react";
import { Button, Flex, Progress } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


const Attendancepercentage = () => {
  const [attendancerecord, setattendancerecord] = useState([]);
  const getattendancerecords = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const getattendancerecords = await axios.get(
      `http://localhost:3001/api/v1/attendance/${localStorage.getItem(
        "userid"
      )}`,
      // obj,
      requestOptions
    );
    console.log(getattendancerecords.data);
    setattendancerecord(getattendancerecords.data.attendance);
  };
  useEffect(() => {
    getattendancerecords();
  }, []);
  return (
    <div className="mt-10 ml-7 p-2 h-[50vh] w-[40vw] bg-gray-300 rounded-md shadow-md overflow-scroll overflow-x-hidden">
      <h1 className="font-bold text-center">ATTENDANCE RECORD</h1>
      {attendancerecord.map((record) => {
        const attendanceperc=(record.count/record.totalcount)*100;
        return (
          <div className="bg-blue-100 flex h-[6vh] w-[39vw] items-center space-x-2">
            <Text fontSize="xl">{record.classname}</Text>
            <div>
              <ProgressBar
                className="w-48"
                completed={attendanceperc}
                maxCompleted={100}
                bgColor={`${
                  (attendanceperc >= 75 && "green") ||
                  (attendanceperc >= 50 && attendanceperc < 75 && "yellow") ||
                  (attendanceperc < 50 && "red")
                }`}
                height="30px"
                transitionDuration="1s"
                transitionTimingFunction="ease-in-out"
                animateOnRender={true}
              />
            </div>
            <Text fontSize="xl">100%</Text>
            <Button className="" size="sm" colorScheme="twitter">
              View Attendance
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default Attendancepercentage;
