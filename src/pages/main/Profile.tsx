import { EditIcon, CheckIcon, CloseIcon, EmailIcon, TimeIcon, StarIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  ButtonGroup,
  Button,
  useToast,
  InputLeftElement,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Form } from "react-router-dom";
import { parseIsolatedEntityName } from "typescript";
import { setAuthRedux } from "../../redux/coreReducer";
import "./Profile.css";
import { RestAPIHOST } from "../../index";
import { read } from "fs";

interface User {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  year: number;
}

export function Profile(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken, removeToken] = useCookies(["auth"]);

  const toast = useToast();


  function parseUser(user: any) {
    let parsedUser: User[] = [];
    parsedUser.push({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      password: user.password,
      year: user.year,
    });
    return parsedUser
  }

  //get username
  async function getPosts(token: any) {
    console.log(token);
    axios
      .get(`${RestAPIHOST}/api/account/getUsername`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUsers(parseUser(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getPosts(token["auth"]);
  }, []);

  return (

    <div>
      {users.map((user) => (
        <ProfileInfo username={user.username} email={user.email} password={user.password} first_name={user.first_name} last_name={user.last_name} year={user.year}></ProfileInfo>))}
    </div>
  );
}


function Header(): JSX.Element {
  return (
    <Heading as="h2" size="md" className="Profile-Header">
      Your Profile
    </Heading>
  );
}


function EditControl() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="left" size="sm" w="full" spacing={2} mt={2} className="Profile-RightElt">
      <Button
        aria-label="check"
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="close"
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <IconButton
      aria-label="edit"
      {...getEditButtonProps()}
    />
  );
}


function ProfileInfo(user: User): JSX.Element {

  const [firstnameChange, setFirstname] = useState(user.first_name);
  const [lastnameChange, setLastname] = useState(user.last_name);
  const [emailChange, setEmail] = useState(user.email);
  // const [passwordChange, setPassword] = useState(user.password);
  const [yearChange, setYear] = useState(user.year);
  const [deleteCheck, setDeleteCheck] = useState(false);

  const [token, setToken, removeToken] = useCookies(["auth"]);

  const toast = useToast();

  // function testSignOut() {
  //   setAuthRedux(false);
  //   removeToken("auth");
  //   toast({
  //     title: "Warning",
  //     description: "You are now logged out.",
  //     status: "warning",
  //     duration: 9000,
  //     isClosable: true,
  //   });
  // }

  async function deleteAccount(token: any) {
    console.log(token);
    //setAuthRedux(false);
    axios
      .post(`${RestAPIHOST}/api/account/delete`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setAuthRedux(false);
    removeToken("auth");
    toast({
      title: "Warning",
      description: "Your account is now deleted.",
      status: "warning",
      duration: 1500,
      isClosable: true,
    });
  }


  //function that updates the first name
  async function updateFirstName(token: any) {
    console.log(token);
    axios
      .post("http://localhost:3000/api/account/changeFirstName", { firstname: firstnameChange }, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //function that updates the last name
  async function updateLastName(token: any) {
    console.log(token);
    axios
      .post("http://localhost:3000/api/account/changeSurname", { lastname: lastnameChange }, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //function that updates the email
  async function updateEmail(token: any) {
    console.log(token);
    axios
      .post("http://localhost:3000/api/account/changeEmail", { email: emailChange }, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //function that updates the year
  async function updateYear(token: any) {
    console.log(token);
    axios
      .post("http://localhost:3000/api/account/changeYear", { year: yearChange }, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if(firstnameChange != user.first_name) {
    updateFirstName(token["auth"]);}

  }, [firstnameChange]);

  useEffect(() => {
    if(lastnameChange != user.last_name) {
    updateLastName(token["auth"]);}

  }, [lastnameChange]);

  useEffect(() => {
    if(emailChange != user.email) {
    updateEmail(token["auth"]);}

  }, [emailChange]);

  useEffect(() => {
    if(yearChange != user.year) {
    updateYear(token["auth"]);}

  }, [yearChange]);

  useEffect(() => {
    if(deleteCheck==true){
    deleteAccount(token["auth"]);}

  }, [deleteCheck]);

  const [isDisabled, setIsDisabled] = useState(true);
  const [editIcon, setEditIcon] = useState(<EditIcon/>);

  return (

    <div className="Profile-Container">

      <Header />

        <span className="Profile-Contents-Container">
          <div className="Profile-LeftElt">
            First Name
          </div>
          <div className="Profile-MiddleElt">
          <Editable defaultValue={user.first_name} isPreviewFocusable={false} onChange={(value) => { setFirstname(value) }}>
          
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
          </Editable>
          </div>
        </span>
        
        <span className="Profile-Contents-Container">
          <div className="Profile-LeftElt">
          Last name
          </div>
          <div className="Profile-MiddleElt">
          <Editable defaultValue={user.last_name} isPreviewFocusable={false} onChange={(value) => { setLastname(value) }}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
          </Editable>
          </div>
        </span>

        {/* <Editable defaultValue={user.password} isPreviewFocusable={false}>
          Password: <span />
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable> */}

        <span className="Profile-Contents-Container">
        <div className="Profile-LeftElt">
          Email
        </div>
        <div className="Profile-MiddleElt">
          <input
            className="Profile-MiddleElt"
            placeholder={user.email}
            disabled={isDisabled}
            border-radius={0}
          />
        </div>
        <IconButton
          className="Profile-RightElt"
          border-radius={"10px 0px 0px 10px"}
          aria-label="Edit"
          icon={<EditIcon />}
          onClick={() => {setIsDisabled(!isDisabled)}}
        />

        </span>
        <Editable defaultValue={user.email} isPreviewFocusable={false} onChange={(value) => { setEmail(value) }}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        
        <span className="Profile-Contents-Container">
          <div className="Profile-LeftElt">
            Year <TimeIcon/>
          </div>
          <div className="Profile-MiddleElt">
            <Editable defaultValue={user.year.toString()} isPreviewFocusable={false} onChange={(value) => { setYear(parseInt(value, 10)) }}>
            <EditablePreview />
            <Input as={EditableInput} />
            <EditControl />
            </Editable>
          </div>
        </span>

        <span className="Profile-Contents-Container">
          <div className="Profile-LeftElt">
          Username
          </div>
          <div className="Profile-MiddleElt">
          <Editable defaultValue={user.username} isPreviewFocusable={false}>
          
          <EditablePreview />
          <Input as={EditableInput} />
          {/* <EditControl /> */}
          </Editable>
          </div>
        </span>

        <Button onClick={() => setDeleteCheck(true)} colorScheme="orange">
          Delete Account
        </Button>
    </div>
  );
}
