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
import { setAuthRedux } from "../../redux/coreReducer";
import "./Profile.css";

interface User {
  username: string;
  email: string;
  //password: string;
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
        year: user.year,
      });
      return parsedUser
  }

  //get username
  async function getPosts(token: any) {
    console.log(token);
    axios
      .get("http://localhost:3000/api/account/getUsername", { withCredentials: true })
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
      <ProfileInfo username={user.username} email={user.email} first_name={user.first_name } last_name={user.last_name} year={user.year}></ProfileInfo>))}
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
        icon={<CheckIcon boxSize={3} />}
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

// const [user, setUser] = useState<User[]>([]);
// const [token, setToken, removeToken] = useCookies(["auth"]);





function ProfileInfo(user: User): JSX.Element {


  const [token, setToken, removeToken] = useCookies(["auth"]);

  const toast = useToast();

  function testSignOut() {
    setAuthRedux(false);
    removeToken("auth");
    toast({
      title: "Warning",
      description: "You are now logged out.",
      status: "warning",
      duration: 9000,
      isClosable: true,
    });
  }

  async function deleteAccount(token: any) {
    console.log(token);
    setAuthRedux(false);
    removeToken("auth");
    toast({
      title: "Warning",
      description: "Your account is now deleted.",
      status: "warning",
      duration: 9000,
      isClosable: true,
    });
    axios
      .post("http://localhost:3000/api/account/delete", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (

    <div className="Profile-Container">

      <Header />
      <Stack
        align="stretch"
      >
        <Editable defaultValue={"First name: " + user.first_name + "    "} isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        <Editable defaultValue={"Last name: " + user.last_name + "   "} isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        {/* <Editable defaultValue="Pronouns" isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable> */}

        <Editable defaultValue={"Username: " + user.username + "   "} isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        <Editable defaultValue={"Email: " + user.email + "   "} isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        <Editable defaultValue={"Year: " + user.year.toString() + "   "} isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        <Button onClick={deleteAccount} colorScheme="orange">
          Delete Account
        </Button>
      </Stack>
    </div>
  );
}
