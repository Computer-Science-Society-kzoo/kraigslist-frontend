import { Button, useToast, Heading, Divider, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Header.css";
import { selectAuthState } from "../redux/coreReducer";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AnimateHeight } from "./animations/height/AnimateHeight";
import { setAuthRedux } from '../redux/coreReducer'
import { useEffect, useRef, useState } from "react";


export function Header(): JSX.Element {
  // const [height, setHeight] = useState<number>(0)
  // const [heightButtons, setHeightButtons] = useState<number>(0)
  // const ref = useRef<HTMLDivElement>(null);
  // const refButtons = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // setHeight(Number(ref.current?.clientHeight))
    // setHeightButtons(Number(refButtons.current?.clientHeight))
    // console.log(height + " " + heightButtons)
    // let total = height + heightButtons
    document.documentElement.style.setProperty("--header-height", 152 + "px");
  }, [])


  //Modal const
  const {isOpen, onOpen, onClose} = useDisclosure();

  const [token, setToken, removeToken] = useCookies(["auth"]);
  const toast = useToast();

  const variants = {
    open: {
      opacity: 1,
      height: "auto",
      x: 0,
    },
    collapsed: { opacity: 0, height: 0, x: 0 },
  };

  function testSignOut() {
    setAuthRedux(false)
    removeToken("auth");
    toast({
      title: "Warning",
      description: "You are now logged out.",
      status: "warning",
      duration: 9000,
      isClosable: true,
    });
  }
  return (
      <header className={"Header"}>
        <Heading className="tracking-in-expand-fwd-top " id="KRAIGSLIST-TEXT">
          <span>K</span>raigslist
        </Heading>
        <AnimateHeight
          variants={variants}
          isVisible={useSelector(selectAuthState)}
          duration={0.2}
          ease={"easeOut"}
        >
          <motion.div
            key="header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="Header-ButtonsContainer"
          >
            <Link to="/">
              <Button className="Header-Button" variant={"link"}>
                Home
              </Button>
            </Link>
            <Link to="/YourPostsPage">
              <Button className="Header-Button" variant={"link"}>
                Your Posts
              </Button>
            </Link>
            <Link to="/messages">
              <Button className="Header-Button" variant={"link"}>
                Messages
              </Button>
            </Link>
            <Link to="/profile">
              <Button className="Header-Button" variant={"link"}>
                Your Profile
              </Button>
            </Link>
            <Link to="/guidelines">
              <Button className="Header-Button" variant={"link"}>
                Guidelines
              </Button>
            </Link>
            <Link to="/makePostPage">
            <Button onClick={onOpen} colorScheme="gray">
              Create Post
            </Button>
            </Link>

              {/* <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Create Post</ModalHeader>
                  <ModalCloseButton/>
                  <ModalBody>
                    <FormControl>
                      <FormLabel>Post Title</FormLabel>
                      <Input
                      type="Title"
                      />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" type="submit">
                      Submit
                    </Button>
                    <Button onClick={onClose} mr={3} colorScheme="orange">
                      Cancel
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal> */}

            <Button onClick={testSignOut} colorScheme="orange">
              Sign Out
            </Button>
          </motion.div>
          </AnimateHeight>
        <Divider />
      </header>
  );
}
