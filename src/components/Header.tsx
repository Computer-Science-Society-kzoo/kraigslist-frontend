import { Button, useToast, Heading, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Header.css";
import { selectAuthState } from "../redux/coreReducer";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AnimateHeight } from "./animations/height/AnimateHeight";
import { setAuthRedux } from '../redux/coreReducer'


export function Header(): JSX.Element {
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
            <Link to="/yours">
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
            <Button onClick={testSignOut} colorScheme="orange">
              Sign Out
            </Button>
          </motion.div>
        </AnimateHeight>
        <Divider />
      </header>
  );
}
