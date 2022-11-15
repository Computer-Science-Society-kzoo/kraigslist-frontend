import {
  EditIcon,
  CheckIcon,
  CloseIcon,
  EmailIcon,
  TimeIcon,
  StarIcon,
} from "@chakra-ui/icons";
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
import { AnimateElement } from "../../components/animations/MotionAnimations";

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
    return parsedUser;
  }

  //get username
  async function getPosts(token2: any) {
    console.log(token);
    axios
      .get(`${RestAPIHOST}/api/account/getusername`, {
        headers: {
          Authorization: `Bearer ${token.auth}`,
          Postid: 0,
          //page: page,
        },
      })
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
        <ProfileInfo
          username={user.username}
          email={user.email}
          password={user.password}
          first_name={user.first_name}
          last_name={user.last_name}
          year={user.year}
        ></ProfileInfo>
      ))}
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
    <ButtonGroup
      justifyContent="left"
      size="sm"
      w="full"
      spacing={2}
      mt={2}
      className="Profile-RightElt"
    >
      <Button aria-label="check" {...getSubmitButtonProps()} />
      <IconButton aria-label="close" {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <IconButton aria-label="edit" {...getEditButtonProps()} />
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
  //     duration: 3000,
  //     isClosable: true,
  //   });
  // }

  async function deleteAccount(token: any) {
    console.log(token);
    //setAuthRedux(false);
    axios
      .post(`${RestAPIHOST}/api/account/delete`, {
        headers: {
          Authorization: `Bearer ${token.auth}`,
          //Postid: 0
        },
      })
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
      .post(
        "http://localhost:3000/api/account/changeFirstName",
        { firstname: firstnameChange },
        { withCredentials: true }
      )
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
      .post(
        "http://localhost:3000/api/account/changeSurname",
        { lastname: lastnameChange },
        { withCredentials: true }
      )
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
      .post(
        "http://localhost:3000/api/account/changeEmail",
        { email: emailChange },
        { withCredentials: true }
      )
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
      .post(
        "http://localhost:3000/api/account/changeYear",
        { year: yearChange },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (firstnameChange != user.first_name) {
      updateFirstName(token["auth"]);
    }
  }, [firstnameChange]);

  useEffect(() => {
    if (lastnameChange != user.last_name) {
      updateLastName(token["auth"]);
    }
  }, [lastnameChange]);

  useEffect(() => {
    if (emailChange != user.email) {
      updateEmail(token["auth"]);
    }
  }, [emailChange]);

  useEffect(() => {
    if (yearChange != user.year) {
      updateYear(token["auth"]);
    }
  }, [yearChange]);

  useEffect(() => {
    if (deleteCheck == true) {
      deleteAccount(token["auth"]);
    }
  }, [deleteCheck]);

  const [isDisabled, setIsDisabled] = useState(true);
  const [editIcon, setEditIcon] = useState(<EditIcon />);
  const [buttonText, setButtonText] = useState("Edit Profile");

  function editSave() {
    if (isDisabled) {
      setIsDisabled(false);
      setEditIcon(<CheckIcon />);
      setButtonText("Save Profile");
    } else {
      setIsDisabled(true);
      setEditIcon(<EditIcon />);
      setButtonText("Edit Profile");
    }
  }

  return (
    <AnimateElement keyName="Profile">
      <div className="Profile-Container">
        <Header />

        <span className="Profile-Contents-Container">
          <div className="Profile-LeftElt">First Name</div>
          <div className="Profile-MiddleElt">
            <Input
              className="Profile-MiddleElt"
              placeholder={user.first_name}
              disabled={isDisabled}
              borderRadius={"0px 10px 10px 0px"}
              focusBorderColor={"none"}
              border-radius={0}
              onChange={(placeholder) => setFirstname(placeholder.target.value)}
            />
          </div>
        </span>

        <span className="Profile-Contents-Container">
          <div className="Profile-LeftElt">Last Name</div>
          <div className="Profile-MiddleElt">
            <Input
              className="Profile-MiddleElt"
              placeholder={user.last_name}
              disabled={isDisabled}
              borderRadius={"0px 10px 10px 0px"}
              focusBorderColor={"none"}
              border-radius={0}
              onChange={(placeholder) => setLastname(placeholder.target.value)}
            />
          </div>
        </span>

        {/* <Editable defaultValue={user.password} isPreviewFocusable={false}>
          Password: <span />
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable> */}

        <span className="Profile-Contents-Container">
          <div className="Profile-LeftElt">Email</div>
          <div className="Profile-MiddleElt">
            <Input
              className="Profile-MiddleElt"
              placeholder={user.email}
              disabled={isDisabled}
              border-radius={0}
              borderRadius={"0px 10px 10px 0px"}
              focusBorderColor={"none"}
              onChange={(placeholder) => setEmail(placeholder.target.value)}
            />
          </div>
        </span>

        <span className="Profile-Contents-Container">
          <div className="Profile-LeftElt">Year</div>
          <div className="Profile-MiddleElt">
            <Input
              className="Profile-MiddleElt"
              placeholder={user.year.toString()}
              disabled={isDisabled}
              borderRadius={"0px 10px 10px 0px"}
              focusBorderColor={"none"}
              border-radius={0}
              onChange={(placeholder) =>
                setYear(parseInt(placeholder.target.value, 10))
              }
            />
          </div>
        </span>

        <span className="Profile-Contents-Container">
          <div className="Profile-LeftElt">Username</div>
          <Input
            className="Profile-MiddleElt"
            placeholder={user.username}
            disabled={true}
            border-radius={0}
            borderRadius={"0px 10px 10px 0px"}
            focusBorderColor={"none"}
            onChange={(placeholder) =>
              setYear(parseInt(placeholder.target.value, 10))
            }
          />
        </span>

        <span>
          <ButtonGroup className="ProfileBottomButtons">
            <Button onClick={() => setDeleteCheck(true)} colorScheme="orange">
              Delete Account
            </Button>
            <Button onClick={() => editSave()}>{buttonText}</Button>
          </ButtonGroup>
        </span>
      </div>
    </AnimateElement>
  );
}
