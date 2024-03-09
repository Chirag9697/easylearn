import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
const AddQuestion = () => {
  const{id}=useParams();  
  const [questionno, setQuestionno] = useState(0);
  const [addquestion, setAddquestion] = useState(false);
  const [questiontitle, setQuestiontitle] = useState("");
  const [marks, setMarks] = useState(0);
  const [timeof, setTime] = useState(null);
  const [dateof, setDate] = useState(null);
  const [mins, setMins] = useState(0);
  const [questions, setQuestions] = useState([
      ["","", "", "", ""]
  ]);
  const setquestionno = (e) => {
    setQuestionno(e.target.value);
  };
  const editquestionno = () => {
    setAddquestion(false);
  };
  const handlequestiontitlechange = (e) => {
    setQuestiontitle(e.target.value);
  };
  const handlequestionsubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage["token"],
      },
    };
    console.log(questions);
    // console.log
    let allquestion=questions;
    const obj = {
      title: questiontitle,
      marks:marks,
      timeof:timeof,
      dateof:dateof,
      mins:mins,
      classid:id,
      questions:questions
    };  
    const addquizes = await axios.post(
      `http://localhost:3001/api/v1/quiz/`,
      obj,
      requestOptions
    );
    console.log(addquizes);
  };
  const setquestionnobutton = () => {
    setAddquestion(true);
    let newarray = [];
    for (let i = 0; i < questionno; i++) {
      newarray.push([ ["","", "", "", ""] ]);
    }
    setQuestions(newarray);
  };
  const handleoptionchange = (questionindex, optionindex, event) => {
    const updatedQuestions = [...questions];
    console.log(event.target.value);
    if (questions[questionindex] != null) {
      updatedQuestions[questionindex][optionindex] =event.target.value;
    // updatedQuestions[questionindex][0].options);

      }
    console.log(updatedQuestions);
    setQuestions(updatedQuestions);
  };
  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][0] = event.target.value;
    console.log(updatedQuestions);
    setQuestions(updatedQuestions);
  };
  const handlemarkschange = (e) => {
    setMarks(e.target.value);
  };
  const handletimechange = (e) => {
    setTime(e.target.value);
    console.log(timeof);
  };
  const handledatechange = (e) => {
    setDate(e.target.value);
    console.log(e.target.value);
  };
  const handleMinchange = (e) => {
    setMins(e.target.value);
  };
  return (
    <div className="mt-2 p-3 flex flex-col w-full h-[80vh]  items-center">
      <div className="w-80 ">
        <FormControl className="flex flex-col space-y-2 items-center">
          <FormLabel>Select No of questions</FormLabel>
          <Input value={questionno} type="number" onChange={setquestionno} />
          <div className="flex  space-x-3">
            <Button
              colorScheme="blue"
              onClick={setquestionnobutton}
              isDisabled={questionno <= 0 || addquestion == true ? true : false}
            >
              SET
            </Button>
            <Button
              colorScheme="blue"
              isDisabled={addquestion === false ? true : false}
              onClick={editquestionno}
            >
              EDIT
            </Button>
          </div>
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
      </div>
      <div className="w-[80vw] flex flex-col justify-center ">
        <form onSubmit={handlequestionsubmit}>
          <div className="flex mt-3 space-x-6">
            <FormControl>
              <FormLabel>Quiz title</FormLabel>
              <Input
                type="text"
                placeholder="write your quiz title"
                onChange={handlequestiontitlechange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Quiz Total marks</FormLabel>
              <Input
                type="number"
                placeholder="write your quiz total marks"
                onChange={handlemarkschange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Quiz Timing</FormLabel>
              <Input
                type="time"
                onChange={handletimechange}
                // placeholder="write your quiz total marks"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Quiz Date</FormLabel>
              <Input
                type="date"
                onChange={handledatechange}
                // placeholder="write your quiz total marks"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Quiz Duration</FormLabel>
              <Input
                type="number"
                onChange={handleMinchange}
                placeholder="write total quiz minutes"
                required
              />
            </FormControl>
          </div>
          <div className="mt-3  flex flex-col items-center space-x-3">
            {addquestion &&
              Array.from({ length: questionno }, (_, i) => (
                <div key={i} className="w-[full]">
                  <FormControl>
                    <FormLabel>Set Question No {i + 1}</FormLabel>
                    <Input
                      type="text"
                      placeholder="write your question"
                      onChange={(event) => handleoptionchange(i,0, event)}
                      required
                    />
                    <div className="p-4">
                      <Input
                        type="text"
                        placeholder="option A"
                        onChange={(event) => handleoptionchange(i, 1, event)}
                        required
                      />
                      <Input
                        type="text"
                        placeholder="option B"
                        onChange={(event) => handleoptionchange(i, 2, event)}
                        required
                      />
                      <Input
                        type="text"
                        placeholder="option C"
                        onChange={(event) => handleoptionchange(i, 3, event)}
                        required
                      />
                      <Input
                        type="text"
                        placeholder="option D"
                        onChange={(event) => handleoptionchange(i, 4, event)}
                        required
                      />
                    </div>
                  </FormControl>
                 
                </div>
              ))}
          </div>
          <div className="w-full flex justify-center">
            {addquestion && <Button  colorScheme="blue" type="submit">CREATE</Button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
