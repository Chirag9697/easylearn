import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PageVisibility from "react-page-visibility";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Button, Mark } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

const Actualquizpage = () => {
  const id = useParams();
  const [visibility, setVisibility] = useState(true);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quesionno, setquestionno] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [marks, setMarks] = useState(0);
  const navigate = useNavigate();
  const [optionselect, setoptionselect] = useState(-1);
  const handleVisibilityChange = (isVisible) => {
    setVisibility(!isVisible);
  };
  const getallquestions = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };

    const allquestions = await axios.get(
      `http://localhost:3001/api/v1/questions/${id}`,
      requestOptions
    );
    console.log("allquestions", allquestions);
    setQuestions(allquestions.data.success);
  };
  const movetonextquestion = () => {
    if (optionselect === parseInt(questions[quesionno].answer)) {
      setMarks(marks + 1);
    }
    setquestionno(quesionno + 1);
  };
  const skipquestion = () => {
    setquestionno(quesionno + 1);
  };
  const prevquestion = () => {
    setquestionno(quesionno - 1);
  };  
  const submitquiz = async () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    const obj={
      marks:marks,
      sourceid:id,
      userid:localStorage.getItem("userid"),
      title:"quizes mark"
    }

    const addmarks = await axios.post(
      `http://localhost:3001/api/v1/marks`,
      obj,
      requestOptions
    );
    if(addmarks.data.success){
        setLoading(false);
        navigate('/home');
    }

    console.log("allquestions", addmarks);
  };
  useEffect(() => {
    getallquestions();
  }, []);
  useEffect(() => {
    if (visibility == false) {
      let temp = timer + 1;
      setTimer(temp);
    } else {
      setVisibility(true);
    }
  }, [visibility]);
  
  return (
    <PageVisibility onChange={handleVisibilityChange}>
      <div
        className={`${
          loading === true && "flex w-full justify-center items-center h-[80vh]"
        }`}
      >
        {loading == true && (
          <div className="flex w-[25vw] space-x-3 items-center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <span className="font-bold">
              Submitting The Test... Please wait
            </span>
          </div>
        )}
        {loading === false && (
          <div>
            <h1 className="text-center font-bold text-2xl">
              STAY focused You can do it
            </h1>
          </div>
        )}
        {loading == false && (
          <div className="bg-blue-500 h-[80vh] m-2 rounded-lg p-4 flex justify-center items-center">
            {questions.length == 0 && <div>There is some error</div>}
            {questions.length > 0 && (
              <div>
                <div>
                  <p className="text-2xl">
                    Q {quesionno + 1}. {questions[quesionno].questiontitle}
                  </p>
                </div>
                <div>
                  <p
                    className={` ${
                      optionselect === 1
                        ? "bg-red-300 my-3 cursor-pointer border-8"
                        : "my-3 bg-red-300 cursor-pointer "
                    }`}
                    onClick={() => setoptionselect(1)}
                  >
                    A .{questions[quesionno].optiona}
                  </p>
                  <p
                    className={` ${
                      optionselect === 2
                        ? "bg-red-300 my-3 cursor-pointer border-8"
                        : "my-3 bg-red-300 cursor-pointer "
                    }`}
                    onClick={() => setoptionselect(2)}
                  >
                    B .{questions[quesionno].optionb}
                  </p>
                  <p
                    className={` ${
                      optionselect === 3
                        ? "bg-red-300 my-3 cursor-pointer border-8"
                        : "my-3 bg-red-300 cursor-pointer "
                    }`}
                    onClick={() => setoptionselect(3)}
                  >
                    C .{questions[quesionno].optionc}
                  </p>
                  <p
                    className={` ${
                      optionselect === 4
                        ? "bg-red-300 my-3 cursor-pointer border-8"
                        : "my-3 bg-red-300 cursor-pointer "
                    }`}
                    onClick={() => setoptionselect(4)}
                  >
                    D .{questions[quesionno].optiond}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    colorScheme="green"
                    onClick={prevquestion}
                    isDisabled={quesionno === 0}
                  >
                    PREVIOUS
                  </Button>
                  <Button
                    colorScheme="green"
                    onClick={skipquestion}
                    isDisabled={quesionno === questions.length - 1}
                  >
                    SKIP
                  </Button>
                  <Button
                    colorScheme="linkedin"
                    onClick={movetonextquestion}
                    isDisabled={quesionno === questions.length - 1}
                  >
                    NEXT
                  </Button>
                  <Button
                    colorScheme="linkedin"
                    onClick={submitquiz}
                    isDisabled={quesionno !== questions.length - 1}
                  >
                    SUBMIT
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PageVisibility>
  );
};

export default Actualquizpage;
