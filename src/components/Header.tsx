import { Button, useToast, Heading, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Header.css";
import { selectHeaderClass } from "../redux/animationsReducer";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

export function Header(): JSX.Element {
  const [token, setToken, removeToken] = useCookies(["auth"]);
  const toast = useToast();

  function testSignOut() {
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
    <AnimatePresence>
      <header className={"Header"}>
        <Heading id="KRAIGSLIST-TEXT">
          <span>K</span>raigslist
        </Heading>
        {useSelector(selectHeaderClass) === "Header-LoggedIn" && (
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
            <Link to="/login">
              <Button className="Header-Button" variant={"link"}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="Header-Button" variant={"link"}>
                SignUp
              </Button>
            </Link>
            <Link to="/main">
              <Button className="Header-Button" variant={"link"}>
                Main
              </Button>
            </Link>
            <Button onClick={testSignOut} colorScheme="orange">
              Sign Out
            </Button>
          </motion.div>
        )}
        <Divider />
      </header>
    </AnimatePresence>
  );
}
