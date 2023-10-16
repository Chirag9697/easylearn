import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
// import { StackDivider } from "@chakra-ui/react";
import { StackDivider } from "@chakra-ui/react";
import { Input } from '@chakra-ui/react'
import { Box } from "@chakra-ui/react";
export default function Logincard() {
  return (
    <Card className="flex flex-col items-center" style={{fontFamily:"roboto"}}>
      <CardHeader>
        <Heading size="md">LOGIN</Heading>
      </CardHeader>

      <CardBody>
        {/* <Stack divider={<StackDivider />} spacing="4"> */}
          <Box>
            <Heading size="xs" textTransform="uppercase" className="mb-2 text-center" >
              Enter your Username
            </Heading>
            <Input placeholder='Enter your username' className="mb-2"/>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase" className="mb-2 text-center">
              Enter your Password
            </Heading>
            <Input placeholder='Enter your password' className="mb-2"/>
          </Box>
          <Button className="flex justify-center w-full" style={{backgroundColor:"yellow"}} >LOGIN</Button>
        {/* </Stack> */}
      </CardBody>
    </Card>
  );
}
