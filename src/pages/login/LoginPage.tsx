import { Login } from "./Login";
import { Signup } from "./Signup";
import {
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import "./LoginPage.css";

export function LoginPage(): JSX.Element {
  const [createAccount, setCreateAccount] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  function createAccountToggle() {
    setCreateAccount(!createAccount);
    setTabIndex(1);
  }

  function toggleHeight(): string {
    return createAccount ? "height-520" : "height-336";
  }

  return (
    <div className={"LoginSignupForm " + toggleHeight()}>
      <Tabs index={tabIndex} onChange={setTabIndex} colorScheme="orange" variant="enclosed">
        <TabList>
          <Tab onClick={() => setCreateAccount(false)}>Login</Tab>
          <Tab onClick={() => setCreateAccount(true)}>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login switchPage={createAccountToggle} />
          </TabPanel>
          <TabPanel>
            <Signup />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
