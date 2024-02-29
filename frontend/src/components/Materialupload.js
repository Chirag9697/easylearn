import React from "react";
import {
  Card,
  Heading,
  CardBody,
  CardHeader,
  Text,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { pdfjs } from 'react-pdf';

import { useState } from "react";
import { Input } from "@chakra-ui/react";
// import { Toast } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
import Pdfview from "./Pdfview";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();
const Materialupload = ({classid}) => {
  const toast = useToast();
    const url="http://localhost:3001/files/1709195213790VL2023240504809_DA.pdf";
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const handlechangefile = (e) => {
    setFile(e.target.files[0]);
    // console.log(e.target.files[0]);
  };
  const handlechangetitle = (e) => {
    setTitle(e.target.value);
  };
  const downloadpdf=()=>{
    const filename=url.split('/').pop();
    const atag=document.createElement("a");
    atag.href=url;
    atag.setAttribute("download",filename);
    document.body.appendChild(atag);
    atag.click();
    atag.remove();
  }
  const submitfile = async (e) => {
    e.preventDefault();
    const obj = {
      teacherid: localStorage.getItem("userid"),
      classid: classid,
      title: title,
    };
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("file", file);
    formdata.append("teacherid", obj.teacherid);
    formdata.append("classid", obj.classid);
    // formdata.append("teacherid", obj.teacherid);
    const requestOptions = {
    //   method: "",
      headers: {
        "Content-Type": "multipart/form-data",
        token: localStorage["token"],
      },
    };
    console.log("dsfasdf", obj);
    const addmaterials = await axios.post(
      `http://localhost:3001/api/v1/materials/`,
      formdata, 
    //   obj,
      requestOptions
    );
    if (addmaterials.data.error) {
      toast({
        title: "error message",
        description: `${addmaterials.data.error}`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    // onClose();
    toast({
      title: "success message",
      description: `${addmaterials.data.success}`,
      status: "success",
      duration: 1000,
      isClosable: true,
    });

  };
  return (
    <div className="my-8 w-4/12">
      <form onSubmit={submitfile}>
        <Card align="center">
          <CardHeader>
            <Heading size="md">Material Upload</Heading>
          </CardHeader>
          <CardBody className="flex flex-col justify-center align-middle">
            <Text className="text-center font-medium">Add title</Text>
            <Input
              className="mt-2"
              placeholder="Add title"
              type="text"
              onChange={handlechangetitle}
              required
            />
            <Text className="text-center font-medium">Add files</Text>
            <Input
              className="mt-2"
              type="file"
              onChange={handlechangefile}
              required
            />
          </CardBody>
          <CardFooter>
            <Button type="submit" colorScheme="blue">
              Upload file
            </Button>
          </CardFooter>
        </Card>
      </form>
      <Pdfview/>
      <Button onClick={downloadpdf}>DOWNLOAD FILE</Button>
    </div>
  );
};

export default Materialupload;
