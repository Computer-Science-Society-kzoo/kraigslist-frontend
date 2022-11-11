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
import { useCookies } from "react-cookie";
import { Form } from "react-router-dom";
import { setAuthRedux } from "../../redux/coreReducer";
import "./Profile.css";

export function Profile(): JSX.Element {

  return (

    <div>
      <ProfileInfo />
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



function ProfileInfo(): JSX.Element {

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
        <Editable defaultValue="Name" isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        <Editable defaultValue="Pronouns" isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        <Editable defaultValue="Username" isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        <Editable defaultValue="Email" isPreviewFocusable={false}>
          <EditablePreview />
          <Input as={EditableInput} />
          <EditControl />
        </Editable>

        <Editable defaultValue="Year" isPreviewFocusable={false}>
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
