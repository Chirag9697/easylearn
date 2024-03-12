import React from "react";
import Addgrouplink from "../components/Addgrouplink";
import Viewgrouplink from "../components/Viewgrouplink";
import Sidebar from "../components/Sidebar";
const Groupspage = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="ml-16 mt-6 flex flex-col">
        {
          localStorage.getItem("role")==="student" &&
        <Viewgrouplink />
      }
      {
        localStorage.getItem("role")==="teacher" && 
        <>
        <Addgrouplink />
        <Viewgrouplink />
        </>
      }
      </div>
    </div>
  );
};

export default Groupspage;
