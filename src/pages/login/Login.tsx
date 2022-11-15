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
import { setAuthRedux } from '../../redux/coreReducer'
import { RestAPIHOST } from "../../index"

interface LoginProps {
  switchPage: () => void;
}

export function Login(props: LoginProps): JSX.Element {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const [shakeEmailStyle, setShakeEmailStyle] = useState("");
  function shakeEmail(){
    setValidEmail(false);
    setShakeEmailStyle("jello-vertical")
    setTimeout(() => {
      setShakeEmailStyle("")
    }, 800);
  }

  const [shakePasswordStyle, setShakePasswordStyle] = useState("");
  function shakePassword(){
    setValidPassword(false);
    setShakePasswordStyle("jello-vertical")
    setTimeout(() => {
      setShakePasswordStyle("")
    }, 800);
  }



  // function test(value: string){
  //   setEmail(value)
  //   console.log(email)
  // }


  const [token, setToken, removeToken] = useCookies(["auth", "myid"]);
  const dispatch = useDispatch();
  function setAuth(token: string, id: number) {
    setToken("auth", token, { path: "/", maxAge: 43200 });
    dispatch(setAuthRedux(true))
    setToken("myid", id, { path: "/", maxAge: 43200 });
  }

  async function login(email: string, password: string) {
    //alert("Email is: " + email + " Password is: " + password)
    if (email === "" && password === "") {
      messageFailure(
        "Missing information",
        "Please provide your credentials to login"
      );
      shakePassword()
      shakeEmail()
    } else if (email === "") {
      messageFailure("Missing infomration", "Please provide your email address");
      shakeEmail()
    } else if (password === "") {
      messageFailure("Missing infomration", "Please provide your password");
      shakePassword()
    } else {
      axios
        .post(`${RestAPIHOST}/api/auth/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          setAuth(res.data.token, res.data.id);

          messageSuccess("Success!", "You have successfully logged in");
        })
        .catch((err) => {
          console.log(err);
          try{
          if (err.response.status === 401) {
            messageFailure(
              "Incorrect login information",
              "Please check your email and password"
            );
            shakePassword()
          } else if (err.response.status === 400) {
            messageFailure("Error", "The user does not exist");
            shakeEmail()
            shakePassword()
          } else {
            messageFailure("Error", "Something went wrong. Please try again later");
          }}
          catch{
            messageFailure("Error", "Something went wrong. Please try again later");
          }
        });
    }
  }

  function messageSuccess(title: string, desc: string) {
    toast({
      title: title,
      description: desc,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom"
    });
  }

  function messageFailure(title: string, desc: string) {
    toast({
      title: title,
      description: desc,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom"
    });
  }

  return (
    <div className="LoginSignupForm-Container">
      <FormControl isRequired>
        <FormLabel> Email </FormLabel>
        <Input
          isInvalid={!validEmail}
          className={"default-transition " + shakeEmailStyle}
          onChange={(el) => {setEmail(el.target.value); setValidEmail(true)}}
          placeholder="Email"
          required
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel> Password </FormLabel>
        <Input
          isInvalid={!validPassword}
          className={shakePasswordStyle}
          type={"password"}
          onChange={(el) => {setPassword(el.target.value); ; setValidPassword(true)}}
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
            onClick={() => login(email, password)}
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
