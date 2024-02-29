import React from "react";
import { Button, Flex, Progress } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import ProgressBar from "@ramonak/react-progress-bar";
const attendanceperc=90;
const Attendancepercentage = () => {
  return (
    <div className="mt-10 ml-7 p-2 h-[50vh] w-[40vw] bg-gray-300 rounded-md shadow-md overflow-scroll overflow-x-hidden">
      <div className="bg-blue-100 flex h-[6vh] w-[39vw] items-center space-x-2">
          <Text fontSize="xl">SCIENCE</Text>
          <div> 
            <ProgressBar className="w-48" completed={attendanceperc} maxCompleted={100} bgColor={`${attendanceperc>=75 && "green" || (attendanceperc>=50 && attendanceperc<75) && "yellow" || attendanceperc<50 && "red"}`} height="30px" transitionDuration="1s" transitionTimingFunction="ease-in-out" animateOnRender={true} />  
          </div>
          <Text fontSize="xl">100%</Text>
          <Button className="" size='sm' colorScheme="twitter">View Attendance</Button>
      </div>
      <div className="bg-blue-100 flex h-[6vh] w-[39vw] items-center space-x-2">
          <Text fontSize="xl">SCIENCE</Text>
          <div> 
            <ProgressBar className="w-48" completed={60} maxCompleted={100} bgColor="red" height="30px" transitionDuration="1s" transitionTimingFunction="ease-in-out" animateOnRender={true} />  
          </div>
          <Text fontSize="xl">100%</Text>
          <Button className="" size='sm' colorScheme="twitter">View Attendance</Button>
      </div>
      <div className="bg-blue-100 flex h-[6vh] w-[39vw] items-center space-x-2">
          <Text fontSize="xl">SCIENCE</Text>
          <div> 
            <ProgressBar className="w-48" completed={60} maxCompleted={100} bgColor="red" height="30px" transitionDuration="1s" transitionTimingFunction="ease-in-out" animateOnRender={true} />  
          </div>
          <Text fontSize="xl">100%</Text>
          <Button className="" size='sm' colorScheme="twitter">View Attendance</Button>
      </div>
      <div className="bg-blue-100 flex h-[6vh] w-[39vw] items-center space-x-2">
          <Text fontSize="xl">SCIENCE</Text>
          <div> 
            <ProgressBar className="w-48" completed={60} maxCompleted={100} bgColor="red" height="30px" transitionDuration="1s" transitionTimingFunction="ease-in-out" animateOnRender={true} />  
          </div>
          <Text fontSize="xl">100%</Text>
          <Button className="" size='sm' colorScheme="twitter">View Attendance</Button>
      </div>
      <div className="bg-blue-100 flex h-[6vh] w-[39vw] items-center space-x-2">
          <Text fontSize="xl">SCIENCE</Text>
          <div> 
            <ProgressBar className="w-48" completed={60} maxCompleted={100} bgColor="red" height="30px" transitionDuration="1s" transitionTimingFunction="ease-in-out" animateOnRender={true} />  
          </div>
          <Text fontSize="xl">100%</Text>
          <Button className="" size='sm' colorScheme="twitter">View Attendance</Button>
      </div>
      <div className="bg-blue-100 flex h-[6vh] w-[39vw] items-center space-x-2">
          <Text fontSize="xl">SCIENCE</Text>
          <div> 
            <ProgressBar className="w-48" completed={60} maxCompleted={100} bgColor="red" height="30px" transitionDuration="1s" transitionTimingFunction="ease-in-out" animateOnRender={true} />  
          </div>
          <Text fontSize="xl">100%</Text>
          <Button className="" size='sm' colorScheme="twitter">View Attendance</Button>
      </div>
      <div className="bg-blue-100 flex h-[6vh] w-[39vw] items-center space-x-2">
          <Text fontSize="xl">SCIENCE</Text>
          <div> 
            <ProgressBar className="w-48" completed={60} maxCompleted={100} bgColor="red" height="30px" transitionDuration="1s" transitionTimingFunction="ease-in-out" animateOnRender={true} />  
          </div>
          <Text fontSize="xl">100%</Text>
          <Button className="" size='sm' colorScheme="twitter">View Attendance</Button>
      </div>
      <div className="bg-blue-100 flex h-[6vh] w-[39vw] items-center space-x-2">
          <Text fontSize="xl">SCIENCE</Text>
          <div> 
            <ProgressBar className="w-48" completed={60} maxCompleted={100} bgColor="red" height="30px" transitionDuration="1s" transitionTimingFunction="ease-in-out" animateOnRender={true} />  
          </div>
          <Text fontSize="xl">100%</Text>
          <Button className="" size='sm' colorScheme="twitter">View Attendance</Button>
      </div>
      <div className="bg-blue-100 flex h-[6vh] w-[39vw] items-center space-x-2">
          <Text fontSize="xl">SCIENCE</Text>
          <div> 
            <ProgressBar className="w-48" completed={60} maxCompleted={100} bgColor="red" height="30px" transitionDuration="1s" transitionTimingFunction="ease-in-out" animateOnRender={true} />  
          </div>
          <Text fontSize="xl">100%</Text>
          <Button className="" size='sm' colorScheme="twitter">View Attendance</Button>
      </div>
    </div>
  );
};

export default Attendancepercentage;
