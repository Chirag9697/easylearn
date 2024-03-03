import React from "react";
// import Myclasses from './Myclasses';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
  Input,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { Toast } from "@chakra-ui/react";
import { UseToast } from "@chakra-ui/react";
import axios from "axios";
import { Button } from "@chakra-ui/react";

const ClassAssignment = () => {
  const { id } = useParams();
  const toast = useToast();
  const [assignment, setAssignment] = useState([]);
  const[filename,setFilename]=useState("");
  const getassignment = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };

    console.log(id);
    const allassignments = await axios.get(
      `http://localhost:3001/api/v1/assignments/${localStorage.getItem(
        "userid"
      )}/${id}`,
      requestOptions
    );
    // console.log(allmessages);
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
    setAssignment(allassignments.data.assignment);
  };
  const handlechangefile=(e)=>{
    setFilename(e.target.files[0]);
  }
  const addassignment=async(text)=>{
  // return async(event)=>{
    // event.preventDefault();
    const formdata = new FormData();
    formdata.append("title", text.title);
    formdata.append("qp", text.qp);
    formdata.append("file",filename);
    formdata.append("classid", id);
    formdata.append("id", text.id);
    formdata.append("deadline", text.deadline);
    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        token: localStorage["token"],
      },
    };
    const addassignment = await axios.put(
      `http://localhost:3001/api/v1/assignments/`,
      formdata,
      requestOptions
    );
    if (addassignment.data.error) {
      toast({
        title: "error message",
        description: `${addassignment.data.error}`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }   
    getassignment();
  
}
  useEffect(() => {
    getassignment();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="m-10 bg-blue-300 w-[100vw] h-[85vh] rounded-md">
        <p className="text-center font-bold text-4xl">ASSIGNMENT</p>
        <div>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>SN</Th>
                  <Th>TITLE</Th>
                  <Th>Deadline</Th>
                  <Th>question</Th>
                  <Th>assignment</Th>
                  <Th>ACTION</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assignment.map((assign, index) => {
                  return (
                    <Tr>
                      <Td>{index + 1}</Td>
                      <Td>{assign.title}</Td>
                      {/* <Td>{assign.className}</Td> */}
                      <Td>{assign.deadline}</Td>
                      <Td>
                        <a href={`http://localhost:3001/files/${assign.qp}`}>
                          qp
                        </a>
                      </Td>
                      <Td>
                        {
                          assign.ans!=='NA' &&
                          <a href={`http://localhost:3001/files/${assign.ans}`}>
                          uploaded
                        </a>
                        }
                        {
                          assign.ans==='NA' &&
                          "NOT UPLOADED"
                          
                        }
                      </Td>
                      {/* <form> */}

                      <Td>
                      {new Date(assign.deadline).getTime()>new Date().getTime() && assign.ans === "NA" &&
                        <form className="w-52 flex space-x-3" >
                          <Input className="w-10" type="file" onChange={handlechangefile} required/>
                           <Button onClick={()=>addassignment(assign)}>UPLOAD</Button>
                        </form>
                           }
                      </Td>
                      <Td>
                      {new Date(assign.deadline).getTime()>new Date().getTime() && assign.ans !== "NA" &&
                        <form className="w-52 flex space-x-3" >
                          <Input className="w-10" type="file" onChange={handlechangefile} required/>
                       <Button onClick={()=>addassignment(assign)}>EDIT</Button>
                        </form>
                       }
                        </Td>
                      <Td> {new Date(assign.deadline).getTime() < new Date().getTime() &&
              "DEADLINE OVER"}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ClassAssignment;
