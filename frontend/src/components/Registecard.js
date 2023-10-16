import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
// import { StackDivider } from "@chakra-ui/react";
import { StackDivider } from "@chakra-ui/react";
import { Input } from '@chakra-ui/react'
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

export default function Registecard() {
  return (
    <Card className="flex flex-col items-center" style={{fontFamily:"roboto"}}>
      <CardHeader>
        <Heading size="md">Register</Heading>
      </CardHeader>

      <CardBody>
        {/* <Stack divider={<StackDivider />} spacing="4"> */}
          <Box>
            <Text className="text-center font-bold">Enter your name</Text>
            <Input placeholder='Enter your name' className="mb-2"/>
          </Box>
          <Box>
          <Text className="text-center font-bold">Enter your username</Text>
            <Input placeholder='Enter your username' className="mb-2"/>
          </Box>
          <Box>
          <Text className="text-center font-bold">Enter your password</Text>
            <Input placeholder='Enter your password' className="mb-2"/>
          </Box>
          <Button className="flex justify-center w-full mt-4 " style={{backgroundColor:"#fac83e"}} >REGISTER</Button>
        {/* </Stack> */}
      </CardBody>
    </Card>
  )
}
