import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useState } from "react";
import QRCode from "react-qr-code";
const Viewgrouplink = () => {
  const [classgroups, setclassgroups] = useState([]);
  const { id } = useParams();
  const getallgroups = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    console.log(id);
    const allgroups = await axios.get(
      `http://localhost:3001/api/v1/classgroups/${id}`,
      requestOptions
    );
    console.log(allgroups);
    // console.log("allstudents", allstudents);
    if (allgroups.data.error) {
      return;
    }
    setclassgroups(allgroups.data.success);
  };
  useEffect(() => {
    getallgroups();
  }, []);
  return (
    <div>
      <h1 className="text-center font-bold text-4xl">CLASS GROUPS</h1>
      <div className="mt-2 flex flex-wrap space-x-2">
        {classgroups.map((group, index) => {
          return (
            <div className="p-4 h-[30vh] flex flex-col align-middle justify-center items-center border-2 border-black">
              <h1 className="font-bold">CLASS GROUP {index + 1}</h1>
              <div
                style={{
                  height: "auto",
                  margin: "0 auto",
                  maxWidth: 64,
                  width: "100%",
                }}
              >
                <QRCode
                  size={256}
                  // className="w-80"
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={group.link}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Viewgrouplink;
