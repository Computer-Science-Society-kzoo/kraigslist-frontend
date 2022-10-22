import { Login } from "./Login";
import { Signup } from "./Signup";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import "./LoginPage.css";
import { AnimatePresence, motion } from "framer-motion";



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
      <AnimatePresence>
        <Tabs
          index={tabIndex}
          onChange={setTabIndex}
          colorScheme="orange"
          variant="enclosed"
        >
          <TabList>
            <Tab onClick={() => setCreateAccount(false)}>Login</Tab>
            <Tab onClick={() => setCreateAccount(true)}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {tabIndex === 0 && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Login switchPage={createAccountToggle} />
                </motion.div>
              )}
            </TabPanel>
            <TabPanel>
              {tabIndex === 1 && (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Signup />
                </motion.div>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </AnimatePresence>
    </div>
  );
}
