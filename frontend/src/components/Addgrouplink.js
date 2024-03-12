import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useParams } from "react-router";
const Addgrouplink = () => {
    const[link,setLink]=useState("");
    const {id}=useParams(); 
    const addgroup=async(e)=>{ 
      e.preventDefault();
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage["token"],
        },
      };
      const obj = {
        classid: id,
        link: link,
      };
      console.log("dsfasdf", obj);
      const addgroups = await axios.post(
        `http://localhost:3001/api/v1/classgroups/`,
        obj,
        requestOptions
      );
      console.log(addgroups);
      if (addgroups.data.error) {
       
        return;
      }
      // console.log("announcemnts", addgroups);
      // onClose2();
      
    }
  return (
    <div className="w-[60vw]">
        <form onSubmit={addgroup}>

      <FormControl>
        <FormLabel>Add group link</FormLabel>
        <Input type="url"  placeholder="Add the group link" isRequired={true} onChange={(e)=>setLink(e.target.value)}/>
        <Button type="submit" className="mt-4" colorScheme="telegram">ADD</Button>
      </FormControl>
        </form>
    </div>
  );
};

export default Addgrouplink;
