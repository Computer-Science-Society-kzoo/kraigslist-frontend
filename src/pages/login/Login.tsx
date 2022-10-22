import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  ButtonGroup,
  useToast,
  Heading,
} from "@chakra-ui/react";

import axios from "axios";
import e from "express";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { changeHeaderClass } from '../../redux/animationsReducer'

interface LoginProps {
  switchPage: () => void;
}

export function Login(props: LoginProps): JSX.Element {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function test(value: string){
  //   setEmail(value)
  //   console.log(email)
  // }

  const [token, setToken, removeToken] = useCookies(["auth"]);
  const dispatch = useDispatch();
  function setAuth(token: string) {
    setToken("auth", token, { secure: true, sameSite: "strict" });
    dispatch(changeHeaderClass('Header-LoggedIn'))
  }

  async function login(email: string, password: string) {
    //alert("Email is: " + email + " Password is: " + password)
    if (email === "") {
      messageFailure(
        "Missing information.",
        "Please provide your email address."
      );
    } else if (password === "") {
      messageFailure("Missing infomration.", "Please provide your password.");
    } else {
      axios
        .post("http://localhost:3000/api/auth/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          setAuth(res.data);
          messageSuccess("Success!", "You have successfully logged in.");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            messageFailure(
              "Incorrect login information.",
              "Please check your email and password."
            );
          } else if (err.response.status === 404) {
            messageFailure("Error", "The user does not exist.");
          }
        });
    }
  }

  function messageSuccess(title: string, desc: string) {
    toast({
      title: title,
      description: desc,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }

  function messageFailure(title: string, desc: string) {
    toast({
      title: title,
      description: desc,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <div className="LoginSignupForm-Container">
      <FormControl isRequired>
        <FormLabel> Email </FormLabel>
        <Input
          onChange={(el) => setEmail(el.target.value)}
          placeholder="Email"
          required
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel> Password </FormLabel>
        <Input
          type={"password"}
          onChange={(el) => setPassword(el.target.value)}
          placeholder="Password"
          required
        />
      </FormControl>

      <FormControl>
        <span className="LoginSignupForm-Inline">
          <Button
            colorScheme="orange"
            type="submit"
            variant="solid"
            loadingText="Logging In"
            onClick={() => setAuth("d")}
          >
            Login
          </Button>
          <Button
            colorScheme="gray"
            type="submit"
            variant="solid"
            loadingText="Logging In"
            onClick={() => props.switchPage()}
          >
            Create New Account
          </Button>
        </span>
      </FormControl>
    </div>
  );
}
