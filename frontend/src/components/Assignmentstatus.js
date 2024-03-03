import React from "react";
import axios, { all } from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Toast, useToast } from "@chakra-ui/react";
const Assignmentstatus = () => {
  const toast = useToast();
  const [assignments, setAssignments] = useState([]);
  const getassignmentdetails = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const allassignments = await axios.get(
      `http://localhost:3001/api/v1/assignments/${localStorage.getItem(
        "userid"
      )}`,
      requestOptions
    );
    if (allassignments.data.error) {
      toast({
        title: "error message",
        description: `${allassignments.data.error}`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    console.log(allassignments);
    setAssignments(allassignments.data.data);
    console.log(assignments);
  };
  useEffect(() => {
    getassignmentdetails();
  }, []);

  return (
    <div className="m-10 bg-slate-400 w-80 max-h-64 overflow-y-scroll">
      <p className="text-center font-bold">ASSIGNMENT STATUS</p>
      {assignments.map((assignment) => {
        const datedifference =
          new Date(assignment.deadline).getTime() - new Date().getTime();
        console.log(new Date().getTime());
        const days = Math.round(datedifference / (1000 * 3600 * 24));
        return (
          <div className="flex p-4 m-3 bg-slate-300 rounded-md justify-between">
            <p>{assignment.title}</p>
            <p className="text-red-400 font-bold">
              {/* {" "} */}
              {new Date(assignment.deadline).getTime() > new Date().getTime() &&
                assignment.ans !== "NA" &&
                "submitted"}
            </p>
            <p className={`text-green-400 font-bold`}>
              {new Date(assignment.deadline).getTime() > new Date().getTime() &&
                assignment.ans === "NA" &&
                "pending"}
            </p>
            <p className="text-red-400 font-bold">
            {new Date(assignment.deadline).getTime() < new Date().getTime() &&
              "DEADLINE OVER"}
            </p>
            {days > 0 && (
              <p className={`text-yellow-400 font-bold`}>{days} to go</p>
            )}
            {days <= 0 && <p className={`text-red-400 font-bold`}>0 to go</p>}
          </div>
        );
      })}
    </div>
  );
};

export default Assignmentstatus;
