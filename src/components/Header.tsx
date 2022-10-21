import { Button, useToast, Heading, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Header.css";

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
    <header className="Header">
      <Heading id="KRAIGSLIST-TEXT">
        <span>K</span>raigslist
      </Heading>
      <div className="Header-ButtonsContainer">
        <Link to="/">
          <Button className="Header-Button" variant={"link"}>Home</Button>
        </Link>
        <Link to="/login">
          <Button className="Header-Button" variant={"link"}>Login</Button>
        </Link>
        <Link to="/signup">
          <Button className="Header-Button" variant={"link"}>SignUp</Button>
        </Link>
        <Link to="/main">
          <Button className="Header-Button" variant={"link"}>Main</Button>
        </Link>
        <Button onClick={testSignOut} colorScheme="orange">
          Sign Out
        </Button>
      </div>
      <Divider />
    </header>
  );
}
