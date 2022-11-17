import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Select,
  InputLeftElement,
  InputGroup,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import Typewriter from 'react-ts-typewriter';


import { AttachmentIcon } from "@chakra-ui/icons";
import { reduxPullNewPosts, selectPullNewPosts } from "../../redux/coreReducer";

import "./Post.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { setCreatePost } from "../../redux/coreReducer";
import { selectCreatePostSate } from "../../redux/coreReducer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RestAPIHOST } from "../../index";

export function MakePost(): JSX.Element {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken, removeToken] = useCookies(["auth"]);

  const toast = useToast();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const [offer_deadline, setOfferDeadline] = useState<Date | null>(null);
  const [price, setPrice] = useState("");

  const [imageURL, setImageURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [validTitle, setValidTitle] = useState(true);
  const [validText, setValidText] = useState(true);
  const [validType, setValidType] = useState(true);

  const [shakeTitleStyle, setShakeTitleStyle] = useState("");


  function shakeTitle() {
    setValidTitle(false);
    setShakeTitleStyle("jello-vertical");
    setTimeout(() => {
      setShakeTitleStyle("");
    }, 800);
  }

  const [shakeTextStyle, setShakeTextStyle] = useState("");
  function shakePassword() {
    setValidText(false);
    setShakeTextStyle("jello-vertical");
    setTimeout(() => {
      setShakeTextStyle("");
    }, 800);
  }

  var picture: any | null = null;
  const dispatch = useDispatch();

  function handleImageUpload(e: any) {

    const myFile = e.target.files[0];
    setAttachement(myFile.name);
    try {
      setIsUploading(true);

      const myForm = new FormData();
      myForm.append("image", myFile);

      axios
        .post(
          `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_FREEIMAGE_API}`,
          myForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response.data.data.image.url);
    
          setImageURL(response.data.data.image.url);
          setIsUploading(false);
        })
        .catch((err) => {
          console.log("API error ↓");
          setIsUploading(false);
          console.log(err);

          if (err.response.data.error) {
            console.log(err.response.data.error);
            //When trouble shooting, simple informations about the error can be found in err.response.data.error so it's good to display it
          }

        });
    } catch (error) {
      console.log(error);
    }

  }


  const postsPulled = useSelector(selectPullNewPosts);



  async function makePost(
    title: string,
    text: string,
    type: string,
    offer_deadline: Date | null,
    price: number,
    picture: string
  ) {

    if (title === "") {
      messageFailure(
        "Missing infomration",
        "Please provide a title for your post."
      );
      shakeTitle();
    } else if (text === "") {
      messageFailure(
        "Missing infomration",
        "Please provide a description for your post."
      );
      shakePassword();
    } else if (type === "") {
      messageFailure(
        "Missing infomration",
        "Please select an offer or request type."
      );
      shakePassword();
    } else {
      axios
        .post(
          `${RestAPIHOST}/api/posts/makepost`,
          {
            title: title,
            text: text,
            type: type,
            offer_deadline: offer_deadline,
            price: price,
            img: imageURL,
          },
          {
            headers: {
              Authorization: "Bearer " + token.auth,
            },
          }
        )
        .then((res) => {
          console.log(res);
          dispatch(reduxPullNewPosts(!postsPulled))
          messageSuccess("Success!", "You have successfully made a post");
        })
        .catch((err) => {
          console.log(err);
          messageFailure(
            "Error",
            "Something went wrong. Please try again later"
          );
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
      position: "bottom",
    });
  }

  function messageFailure(title: string, desc: string) {
    toast({
      title: title,
      description: desc,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }

  const isOpenRedux = useSelector(selectCreatePostSate);
  const toHomepage = useNavigate();

  function closeAndCreatePost() {
    if (title === "") {
      messageFailure(
        "Missing infomration",
        "Please provide a title for your post."
      );
      shakeTitle();
    } else if (text === "") {
      messageFailure(
        "Missing infomration",
        "Please provide a description for your post."
      );
      shakePassword();
    } else if (type === "") {
      messageFailure(
        "Missing infomration",
        "Please select an offer or request type."
      );
      shakePassword();
    } else {
      makePost(title, text, type, offer_deadline, parseInt(price), picture);
      dispatch(setCreatePost(false));
      toHomepage("/");
    }
    
  }

  const [aiAssistanceLoading, setAiAssistanceLoading] = useState(false);

  function getAIAssistance() {
    if (text === ""){
      return;
    }
    setAiAssistanceLoading(true);
    axios
      .post(
        `${RestAPIHOST}/api/openai/aiassistpost`,
        {
          text: text,
        },
        {
          headers: {
            Authorization: "Bearer " + token.auth,
          },
        }
      )
      .then((res) => {
        setAiAssistanceLoading(false);
        const data = text + " " + res.data.replace(/(\r\n|\n|\r)/gm, "");
        setText(data)
      })
      .catch((err) => {
        setAiAssistanceLoading(false);
        console.log(err);
        messageFailure(
          "Error",
          "Something went wrong. Please try again later"
        );
      });
  }
            

  const [attachement, setAttachement] = useState("Nothing Attached");

  return (
    <div>
      <Modal
        isOpen={isOpenRedux}
        onClose={() => {
          dispatch(setCreatePost(false));
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel className="CreatePostLabels"> Title </FormLabel>
              <Input
                isInvalid={!validTitle}
                className={"default-transition " + shakeTitleStyle}
                onChange={(el) => {
                  setTitle(el.target.value);
                  setValidTitle(true);
                }}
                placeholder="Title"
                required
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel className="CreatePostLabels"> Description </FormLabel>
              <Textarea
                isInvalid={!validText}
                className={"default-transition " + shakeTextStyle}
                onChange={(el) => {
                  setText(el.target.value);
                  setValidText(true);
                }}
                placeholder="Description"
                value={text}
                required
              />
            </FormControl>
            <div className="AIAssistContainer">
              <div className="div_button">
                <Button
                  className="button-85"
                  colorScheme={"purple"}
                  size="sm"
                  onClick={() => {getAIAssistance()}}
                  borderRadius={"6px 6px 6px 6px"}
                  disabled={aiAssistanceLoading}
                >
                AI Assist
              </Button>
                </div>
                <Text fontSize={"xs"} className="TextItalic"> <Typewriter text={"Start typing, click the button, see the magic!"}/></Text>
                {aiAssistanceLoading && <Spinner style={{marginLeft: "auto", marginTop: "auto"}} color="purple.500" size="md" />}
              </div>
            <FormControl isRequired>
              <FormLabel className="CreatePostLabels"> Type </FormLabel>
              <span className="LoginSignupForm-Inline">
                {/* <FormLabel> Category </FormLabel> */}

                <Select
                  placeholder="Select Type"
                  isInvalid={!validType}
                  onChange={(el) => {
                    setType(el.target.value);
                    setValidType(true);
                  }}
                  required
                >
                  <option value="Request">Request</option>
                  <option value="Offer">Offer</option>
                  <option value="Information">Information</option>
                  <option value="Other">Other</option>
                </Select>
              </span>
            </FormControl>

            <FormControl>
              <FormLabel className="CreatePostLabels">Price</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="$"
                />
                <Input
                  placeholder="Enter Price"
                  onChange={(el) => {
                    setPrice(el.target.value);
                  }}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel className="CreatePostLabels">Deadline</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date"
                onChange={(el) => {
                  setOfferDeadline(el.target.valueAsDate);
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel className="CreatePostLabels">
                Upload Image
              </FormLabel>
              <div className="FlexRow">
                <label className="MakePostFileInput">
                  <AttachmentIcon
                    color="var(--k-orange)"
                    viewBox="0 0 24 24"
                    boxSize="1.5em"
                    mr={5}
                  />
                  {attachement}
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(el) => handleImageUpload(el)}
                    style={{ display: "none" }}
                  />
                </label>

                <div style={{marginLeft: "auto"}}>
                  {isUploading && <Spinner color="orange.500" size="md" />}
                </div>
              </div>
              <Text className="TextItalic" fontSize={"xs"} ><span style={{color: "red"}}>*</span>Your image will be uploaded as soon as you select file</Text>

            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={isUploading}
              colorScheme="orange"
              type="submit"
              loadingText="Creating Post"
              onClick={() => {
                closeAndCreatePost();
              }}
              mr={3}
              id="upload-button"
            >
              Create Post
            </Button>
            <Button
              colorScheme="gray"
              onClick={() => {
                dispatch(setCreatePost(false));
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

