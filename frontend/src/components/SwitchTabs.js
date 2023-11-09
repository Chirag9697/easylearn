import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Logincard from "./Logincard";
import Registecard from "./Registecard";
import { useLocation } from "react-router";
export default function SwitchTabs() {
  const location=useLocation();
  // console.log(location.pathname);
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab className="font-bold">Teacher</Tab>
        <Tab className="font-bold">Student</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {location.pathname=='/login'?
          <Logincard role={"teacher"}/>:<Registecard role={"teacher"}/>
          }
        </TabPanel>
        <TabPanel>
        {location.pathname=='/login'?
          <Logincard role={"student"}/>:<Registecard role={"student"}/>
          }
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
