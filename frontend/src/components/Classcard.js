import React from "react";
import { Card } from "@chakra-ui/react";
import { CardHeader } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
// import { useToast } from "@chakra-ui/react";
const Classcard = (props) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handledeleteclassroom = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const deleteclasses = await axios.delete(
      `http://localhost:3001/api/v1/classes/${props.id}`,
      requestOptions
    );
    if (deleteclasses.data.error) {
      toast({
        title: "error message",
        description: `${deleteclasses.data.error}`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    // getallannouncements();
    props.getallstufunc();
    onClose();
  };
  return (
    <>
      <Card
        className="flex flex-col h-48"
        sx={{ cursor: "pointer" }}
        _hover={{ bg: "grey" }}
      >
        <div className="justify-end mt-2 p-3 w-10 hover:w-20 z-10">
          <Button onClick={onOpen}>
            <MdDelete />
          </Button>
        </div>
        <Link to={`/myclasses/${props.id}`}>
          <CardHeader>
            <Heading size="md">{props.classname}</Heading>
          </CardHeader>
        </Link>
      </Card>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Do you want to delete this class? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handledeleteclassroom} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Classcard;
