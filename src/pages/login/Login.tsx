import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import e from "express";
import { useState } from "react";

import "./Login.css";

export function Login(): JSX.Element {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function test(value: string){
  //   setEmail(value)
  //   console.log(email)
  // }

  async function login(email: string, password: string) {
    //alert("Email is: " + email + " Password is: " + password)
    if (email === "") {
      toast({
        title: "Missing information.",
        description: "Please provide your email address.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else if (password === "") {
      toast({
        title: "Missing information.",
        description: "Please provide your password.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      axios
        .post("http://localhost:3000/api/auth/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          toast({
            title: "Success!",
            description:
              "You have successfully logged in. Your token: " + res.data,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            toast({
              title: "Incorrect login information.",
              description: "Please check your email and password.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          } else if (err.response.status === 404) {
            toast({
              title: "Error",
              description: "The user does not exist.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        });
    }
  }

  return (
    <div>
      <h1>Login page</h1>

      <div className="LoginSignupForm">
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
          <Button
            colorScheme="orange"
            type="submit"
            variant="solid"
            loadingText="Logging In"
            onClick={() => login(email, password)}
          >
            Login
          </Button>
        </FormControl>
      </div>
    </div>
  );
}
