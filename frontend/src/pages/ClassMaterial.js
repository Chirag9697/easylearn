import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button, useToast } from "@chakra-ui/react";
import { Card, CardBody, Text } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const ClassMaterial = () => {
  const{id} = useParams();
  const [material, setMaterials] = useState([]);
  const toast = useToast();
  const downloadpdf=(url)=>{
    const filename=url.split('/').pop();
    const atag=document.createElement("a");
    atag.href=url;
    atag.setAttribute("download",url);
    document.body.appendChild(atag);
    atag.click();
    atag.remove();
  }
  const getallmaterials = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };

    // console.log(id);
    const allmaterials = await axios.get(
      `http://localhost:3001/api/v1/materials/${id}`,
      requestOptions
    );
    console.log(allmaterials.data.files);
    if (allmaterials.data.error) {
      toast({
        title: "error message",
        description: `${allmaterials.data.error}`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    setMaterials(allmaterials.data.files);
    // setAnnouncements(allmessages.data.announcements);
  };
  useEffect(()=>{
    getallmaterials();
  },[])
  return (
    <div>
      <Link to="/materials">
        <Button colorScheme="blue">BACK</Button>
      </Link>
      <div className="mx-16 w-[80vw] ">
        {material.length==0 && <p className="text-center font-bold">NO MATERIAL UPLOADED YET</p>}
        {material.length > 0 && (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>TITLE</Th>
                  <Th>ACtions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {material.map((material) => {
                  return (
                    <Tr>
                      <Td>{material.title}</Td>
                      <Td>
                        <Button onClick={()=>downloadpdf(`http://localhost:3001/files/${material.filename}`)}>Download</Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default ClassMaterial;
