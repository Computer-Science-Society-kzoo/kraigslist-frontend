import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Button,
  useToast,
  ButtonGroup,
} from "@chakra-ui/react";

import axios from "axios";
import e from "express";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setAuthRedux } from '../../redux/coreReducer'
import { RestAPIHOST } from "../../index"


export function Signup(): JSX.Element {
  const toast = useToast();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [year, setYear] = useState(0);
  const [preferredname, setPreferredname] = useState("");

  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validFirstname, setValidFirstname] = useState(true);
  const [validLastname, setValidLastname] = useState(true);
  const [validYear, setValidYear] = useState(true);

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

  const [shakeFirstnameStyle, setShakeFirstnameStyle] = useState("");
  function shakeFirstname(){
    setValidFirstname(false);
    setShakeFirstnameStyle("jello-vertical")
    setTimeout(() => {
      setShakeFirstnameStyle("")
    }, 800);
  }

  const [shakeLastnameStyle, setShakeLastnameStyle] = useState("");
  function shakeLastname(){
    setValidLastname(false);
    setShakeLastnameStyle("jello-vertical")
    setTimeout(() => {
      setShakeLastnameStyle("")
    }, 800);
  }

  const [shakeYearStyle, setShakeYearStyle] = useState("");
  function shakeYear(){
    setValidYear(false);
    setShakeYearStyle("jello-vertical")
    setTimeout(() => {
      setShakeYearStyle("")
    }, 800);
  }


  // function test(value: string){
  //   setEmail(value)
  //   console.log(email)
  // }

  const [token, setToken, removeToken] = useCookies(["auth"]);
  const dispatch = useDispatch();
  function setAuth(token: string) {
    setToken("auth", token, { secure: true, sameSite: "strict" });
    dispatch(setAuthRedux(true))
  }

  async function signup(email: string, password: string, firstname: string, lastname: string, preferredname: string, year: Number) {
    //alert("Email is: " + email + " Password is: " + password)
    if (email === "") {

      shakeEmail();
      // messageFailure(
      //   "Missing information.",
      //   "Please provide your email address."
      // );
    } if (firstname === "") {
      
      shakeFirstname();
      // messageFailure(
      //   "Blank field.",
      //   "Please provide a first name."
      // );
    } if (lastname === "") {
      
      shakeLastname();
      // messageFailure(
      //   "Blank field.",
      //   "Please provide a last name."
      // );
    } if (!year) {
      
      shakeYear();
      // messageFailure(
      //   "Blank field.",
      //   "Please provide a year."
      // );
    } if (! email.includes("@kzoo.edu")) {
      
      shakeEmail();
      messageFailure(
        "Invalid email address.",
        "Please provide a valid email address."
      );
    
    } if (password === "") {
      
      shakePassword();
      // messageFailure("Missing infomration.", "Please provide your password.");
    } 
    else {
      axios
        .post(`${RestAPIHOST}/api/auth/signup`, {
          email: email,
          password: password,
          first_name: firstname,
          last_name: lastname,
          year: year,
          preferred_name: preferredname,
        })
        .then((res) => {
          console.log(res);
          setAuth(res.data);
          messageSuccess("Success!", "You have successfully signed up.");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            messageFailure(
              "Not a K-email.",
              "Please check your email."
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
      
      <span className="LoginSignupForm-Inline">

        <FormControl isRequired>
          <FormLabel>First name</FormLabel>
          <Input isInvalid = {!validFirstname} className={"default-transition " + shakeFirstnameStyle} onChange={(el) => {setFirstname(el.target.value); setValidFirstname(true)}} autoComplete="off" placeholder="First Name" required />
        </FormControl>

        <FormControl isRequired>
          <FormLabel> Last Name </FormLabel>
          <Input isInvalid = {!validLastname} className={"default-transition " + shakeLastnameStyle} onChange={(el) => {setLastname(el.target.value); setValidLastname(true)}} autoComplete="off" placeholder="Last Name" required />
        </FormControl>
      </span>

      <span className="LoginSignupForm-Inline">
        <FormControl isRequired>
          <FormLabel> Class Year </FormLabel>
          <Select isInvalid = {!validYear} className={"default-transition " + shakeYearStyle} onChange={(el) => {setYear(Number(el.target.value)); setValidYear(true)}} placeholder="Select Year">
            <option>{1}</option>
            <option>{2}</option>
            <option>{3}</option>
            <option>{4}</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel> Preferred Name </FormLabel>
          <Input onChange={(el) => setPreferredname(el.target.value)} autoComplete="off" placeholder="Preferred Name" required />
        </FormControl>

      </span>

      <FormControl isRequired>
        <FormLabel> Email </FormLabel>
        <Input isInvalid = {!validEmail} className={"default-transition " + shakeEmailStyle} onChange={(el) => {setEmail(el.target.value); setValidEmail(true)}} placeholder="Email" required />
      </FormControl>

      <FormControl isRequired>
        <FormLabel> Password </FormLabel>
        <Input isInvalid = {!validPassword} className={"default-transition " + shakePasswordStyle} onChange={(el) => {setPassword(el.target.value); setValidPassword(true)}} placeholder="Password" required />
      </FormControl>

      <FormControl>
        <Button
          colorScheme="orange"
          type="submit"
          variant="solid"
          loadingText="Signing Up"
          onClick={() => signup(email, password, firstname, lastname, preferredname, year)}
        >
          Create New Account
        </Button>
      </FormControl>
    </div>
  );
}
