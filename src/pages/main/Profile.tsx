import {
  Heading,
  Input,
  ButtonGroup,
  Button,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { setAuthRedux } from "../../redux/coreReducer";
import "./Profile.css";
import { RestAPIHOST } from "../../index";
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken, removeToken] = useCookies(["auth"]);

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
  async function getPosts() {
    axios
      .get(`${RestAPIHOST}/api/account/getusername`, {
        headers: {
          Authorization: `Bearer ${token.auth}`,
          Postid: 0,
          //page: page,
        },
      })
      .then((res) => {
        setUsers(parseUser(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

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


function ProfileInfo(user: User): JSX.Element {
  const [firstnameChange, setFirstname] = useState(user.first_name);
  const [lastnameChange, setLastname] = useState(user.last_name);
  const [emailChange, setEmail] = useState(user.email);
  // const [passwordChange, setPassword] = useState(user.password);
  const [yearChange, setYear] = useState(user.year);
  const [deleteCheck, setDeleteCheck] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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


  async function deleteAccount() {
    //setAuthRedux(false);
    const realToken = `Bearer ${token.auth}`
    axios
      .delete(`${RestAPIHOST}/api/account/delete`, {
        headers: {
          Authorization: realToken,
        },
      })
      .then((res) => {
        removeToken("auth");
        setAuthRedux(false);
        toast({
          title: "Warning",
          description: "Your account is now deleted.",
          status: "warning",
          duration: 1500,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: "Something went wrong.",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      });

  }

  //function that updates the first name
  async function updateFirstName() {
    axios
      .post(
        `${RestAPIHOST}/api/account/changeFirstName`,
        { firstname: firstnameChange },
        {
            headers: {
              Authorization: "Bearer " + token.auth,
            },
          }
      )
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //function that updates the last name
  async function updateLastName() {
    axios
      .post(
        `${RestAPIHOST}/api/account/changeSurname`,
        { lastname: lastnameChange },
        {
            headers: {
              Authorization: "Bearer " + token.auth,
            },
          }
      )
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  }


  //function that updates the email
  async function updateEmail() {
    axios
      .post(
        `${RestAPIHOST}/api/account/changeEmail`,
        { 
          email: emailChange 
        },
        {
            headers: {
              Authorization: "Bearer " + token.auth,
            },
        }
      )
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //function that updates the year
  async function updateYear() {
    axios
      .post(
        `${RestAPIHOST}/api/account/changeYear`,
        { year: yearChange },
        {
            headers: {
              Authorization: "Bearer " + token.auth,
            },
          }
      )
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (firstnameChange !== user.first_name) {
      updateFirstName();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstnameChange]);

  useEffect(() => {
    if (lastnameChange !== user.last_name) {
      updateLastName();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastnameChange]);

  useEffect(() => {
    if (emailChange !== user.email) {
      updateEmail();
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailChange]);

  useEffect(() => {
    if (yearChange !== user.year) {
      updateYear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearChange]);

  useEffect(() => {
    if (deleteCheck === true) {
      deleteAccount();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteCheck]);

  const [isDisabled, setIsDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("Edit Profile");

  function editSave() {
    if (isDisabled) {
      setIsDisabled(false);
      setButtonText("Save Profile");
    } else {
      setIsDisabled(true);
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
