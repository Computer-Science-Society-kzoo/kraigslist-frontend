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
  //last_name: string;
  year: number;
}

export function Profile(): JSX.Element {
  const [user, setUser] = useState<User[]>([]);
  const [token, setToken, removeToken] = useCookies(["auth"]);

  //get username
  async function getPosts() {
    console.log(token.auth);
    axios
      .get("http://localhost:3000/api/account/getUsername", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUser(parseUser(res.data));
      });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (

    <div>
      <ProfileInfo username={""} email={""} first_name={""} year={0} />
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

function parseUser(user: any) {
  let parsedUser: User[] = [];
  user.forEach((user: any) => {
    parsedUser.push({
      first_name: user.first_name,
      username: user.username,
      email: user.email,
      year: user.year,
    });
  });
  return parsedUser
}



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



  return (

    <div className="Profile-Container">

      <Header />
      <Stack
        align="stretch"
      >
        <Editable defaultValue={user.first_name} isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        <Editable defaultValue="Pronouns" isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        <Editable defaultValue={user.username} isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        <Editable defaultValue={user.email} isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        <Editable defaultValue={user.year.toString()} isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        <Button onClick={testSignOut} colorScheme="orange">
          Sign Out
        </Button>
      </Stack>
    </div>
  );
}
