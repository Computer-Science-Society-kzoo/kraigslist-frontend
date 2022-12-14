/* eslint-disable jsx-a11y/anchor-is-valid */
import { Login } from "./Login";
import { Signup } from "./Signup";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  AlertIcon,
  Alert,
  Stack,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";
import "./LoginPage.css";
import { AnimatePresence, motion } from "framer-motion";

export function LoginPage(): JSX.Element {
  const [createAccount, setCreateAccount] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  function createAccountToggle() {
    setCreateAccount(!createAccount);
    setTabIndex(1);
  }

  return (
    <>
      <div className={"LoginSignupForm"}>
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
      <div>
        <Stack spacing={3}>
          <Container maxW="md">
            <Alert status="info">
              <AlertIcon />
              <span>First time here? <a className="Highlighted Link" onClick={() => setTabIndex(1)}>Sign up</a> with your K email to get started!</span>
            </Alert>
          </Container>
        </Stack>
      </div>
    </>
  );
}
