import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setAuthRedux } from '../../redux/coreReducer'
import { RestAPIHOST } from "../../index"


export function Signup(): JSX.Element {
  const toast = useToast();
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken, removeToken] = useCookies(["auth", "myid"]);

  const dispatch = useDispatch();
  function setAuth(token: string, myid: number) {
    setToken("auth", token, { secure: true, sameSite: "strict" });
    setToken("myid", myid, { path: "/", maxAge: 43200 });
    dispatch(setAuthRedux(true))
  }

  //write a function to check if the email ends with @kzoo.edu
  function checkEmail(email: string): boolean {
    if (email.split("@").pop() === "kzoo.edu") 
      return true; //email is valid
    return false
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
    } if (checkEmail(email) === false) {
      
      shakeEmail();
      messageFailure(
        "Invalid email address.",
        "Please provide a valid email address (username@kzoo.edu)"
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
          setAuth(res.data.token, res.data.id);
          messageSuccess("Success!", "You have successfully signed up.");
        })
        .catch((err) => {
          console.log(err);
          try {
          if (err === undefined){
            messageFailure("Error", "An unknown error has occured.");
          }
          if (err.response.status === 401) {
            messageFailure(
              "Not a K-email.",
              "Please check your email."
            );
          } else if (err.response.status === 404) {
            messageFailure("Error", "The user does not exist.");
          } else if (err.response.status === 409) {
            messageFailure(
              "Email already exists.",
              "Please log in or use a different email."
            );
          }
        } catch (e) {
          messageFailure("Error", "Something went wrong. Please try again later.");
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
    });
  }

  function messageFailure(title: string, desc: string) {
    toast({
      title: title,
      description: desc,
      status: "error",
      duration: 3000,
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
        <Input isInvalid = {!validEmail} className={"default-transition " + shakeEmailStyle} onChange={(el) => {setEmail(el.target.value); setValidEmail(true)}} placeholder="K College Email" required />
      </FormControl>

      <FormControl isRequired>
        <FormLabel> Password </FormLabel>
        <Input type={"password"} isInvalid = {!validPassword} className={"default-transition " + shakePasswordStyle} onChange={(el) => {setPassword(el.target.value); setValidPassword(true)}} placeholder="Password" required />
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
