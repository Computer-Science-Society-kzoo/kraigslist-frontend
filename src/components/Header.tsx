import {
  Button,
  useToast,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Header.css";
import { selectAuthState, setCreatePost } from "../redux/coreReducer";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AnimateHeight } from "./animations/height/AnimateHeight";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectTotalMessagesState } from "../redux/messagesReducer";
import { Turn as Hamburger } from 'hamburger-react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Burger } from "./Burger";
import { AnimateTitle } from "./animations/MotionAnimations";

export function Header(): JSX.Element {

  useEffect(() => {
    document.documentElement.style.setProperty("--header-height", 152 + "px");
  }, []);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    removeToken("auth");
    setShowMobileMenu(false);
    toast({
      title: "Warning",
      description: "You are now logged out.",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  }

  const dispatch = useDispatch();

  const totalMessages = useSelector(selectTotalMessagesState);

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <>
    <div className={ !showMobileMenu ? "MobileHeader HideWhenNONMobile" : "MobileHeader HideWhenNONMobile" } >
      <AnimateTitle keyName="Kraigslist">
        <Heading className="tracking-in-expand-fwd-top NoSelection" id="KRAIGSLIST-TEXT">
          <span>K</span>raigslist
        </Heading>
      </AnimateTitle>
      {useSelector(selectAuthState) &&
      <div className="MobileHeaderBurger NoSelection" onClick={() => { setShowMobileMenu(!showMobileMenu) }}>
        <Hamburger toggled={showMobileMenu} />
      </div>
      }
      
    </div>
    <Divider className="HideWhenNonMobile"/>

      <header className={showMobileMenu ? "Header HeaderOpen" : "Header" }>
      <AnimateTitle keyName="Kraigslist">
        <Heading className="tracking-in-expand-fwd-top HideWhenMobile" id="KRAIGSLIST-TEXT">
          <span>K</span>raigslist
        </Heading>
      </AnimateTitle>
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
              <Button onClick={() => setShowMobileMenu(false)} className="Header-Button" variant={"link"}>
                Home
              </Button>
            </Link>
            <Link to="/YourPostsPage">
              <Button onClick={() => setShowMobileMenu(false)} className="Header-Button" variant={"link"}>
                Your Posts
              </Button>
            </Link>
            <Link to="/messages">
              <Button onClick={() => setShowMobileMenu(false)} className="Header-Button" variant={"link"} id="Messages">
                Messages
                <div
                  className={
                    totalMessages > 0
                      ? "UnreadTotalMessageValue"
                      : "UnreadMessageValueHide"
                  }
                >
                  <div>{totalMessages}</div>
                </div>
              </Button>
            </Link>
            <Link to="/profile">
              <Button onClick={() => setShowMobileMenu(false)} className="Header-Button" variant={"link"}>
                Your Profile
              </Button>
            </Link>
            <Link to="/Guidelines">
              <Button onClick={() => setShowMobileMenu(false)} className="Header-Button" variant={"link"}>
                Guidelines
              </Button>
            </Link>

            <Button
              onClick={() => {
                dispatch(setCreatePost(true));
              }}
              colorScheme="orange"
            >
              Create Post
            </Button>

            <Button onClick={testSignOut} colorScheme="gray">
              Sign Out
            </Button>
          </motion.div>
        </AnimateHeight>
        <Divider />
      </header>
    </>
  );
}
