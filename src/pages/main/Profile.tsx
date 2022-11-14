import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Form } from "react-router-dom";
import { parseIsolatedEntityName } from "typescript";
import { setAuthRedux } from "../../redux/coreReducer";
import "./Profile.css";
import { RestAPIHOST } from "../../index";

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
    <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
      <IconButton
        aria-label="check"
        icon={<CheckIcon boxSize={3} />
        }
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="close"
        icon={<CloseIcon boxSize={3} />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <IconButton
      aria-label="edit"
      icon={<EditIcon />}
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



  return (

    <div className="Profile-Container">

      <Header />
      <Stack
        align="stretch"
      >
        <Editable defaultValue={user.first_name} isPreviewFocusable={false} onChange={(value) => { setFirstname(value) }}>
          First name: <span />
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        <Editable defaultValue={user.last_name} isPreviewFocusable={false} onChange={(value) => { setLastname(value) }}>
          Last name: <span />
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        {/* <Editable defaultValue={user.password} isPreviewFocusable={false}>
          Password: <span />
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable> */}


        <Editable defaultValue={user.email} isPreviewFocusable={false} onChange={(value) => { setEmail(value) }}>
          Email: <span />
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        <Editable defaultValue={user.year.toString()} isPreviewFocusable={false} onChange={(value) => { setYear(parseInt(value, 10)) }}>
          Year: <span />
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>


        <Editable defaultValue={user.username} isPreviewFocusable={false}>
          Username: <span />
          <EditablePreview />
          <Input as={EditableInput} />
          {/* <EditControl /> */}
        </Editable>

        <Button onClick={() => setDeleteCheck(true)} colorScheme="orange">
          Delete Account
        </Button>
      </Stack>
    </div>
  );
}
