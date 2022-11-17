import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Heading,
  Text,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { selectOpenPostSate } from "../../redux/coreReducer";
import { setOpenPost } from "../../redux/coreReducer";
import { selectPostModalRedux } from "../../redux/postModalReducer";
import Moment from "react-moment";
import "./PostModal.css";
import axios from "axios";
import { RestAPIHOST } from "../..";
import { useState } from "react";
import { useCookies } from "react-cookie";

//Post Modal Interface
export function ModalPost(): JSX.Element {
  const isOpenRedux = useSelector(selectOpenPostSate);
  const dispatch = useDispatch();

  const post = useSelector(selectPostModalRedux);

  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  function returnPriceText(price: number, type: string): string {
    if (type === "Other") {
      return "Price: $" + price;
    } else {
      return type + " Price: $" + price;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken, removeToken] = useCookies(["auth", "myid"]);

  const myid = Number(token["myid"]);

  function startConversation() {
    setSending(true);
    axios
      .post(
        RestAPIHOST + "/api/messages/newconversation",
        {
          message: message,
          postID: post.postID,
        },
        {
          headers: {
            Authorization: "Bearer " + token.auth,
          },
        }
      )
      .then((res) => {
        setSending(false);
        setMessage("");
        dispatch(setOpenPost(false));
      })
      .catch((err) => {
        setSending(false);
        console.log(err);
        console.log(err.message);
      });
  }

  const [aiAssistanceLoading, setAiAssistanceLoading] = useState(false);

  function getAIAssistance() {
    setAiAssistanceLoading(true);
    axios
      .post(
        `${RestAPIHOST}/api/openai/aiassistmessage`,
        {
          post: "Title: " + post.title + "Post (more important): " + post.text,
          text: message,
        },
        {
          headers: {
            Authorization: "Bearer " + token.auth,
          },
        }
      )
      .then((res) => {
        setAiAssistanceLoading(false);
        let data = "";
        if (message === "") {
          data = res.data.replace(/(\r\n|\n|\r)/gm, "").replace('/n', "");
        } else {
          data = message + " " + res.data.replace(/(\r\n|\n|\r)/gm, "");
        }

        setMessage(data);
      })
      .catch((err) => {
        setAiAssistanceLoading(false);
        console.log(err);
        messageFailure("Error", "Something went wrong. Please try again later");
      });
  }

  let toast = useToast();

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

  return (
    <div>
      <Modal
        isCentered
        size={"3xl"}
        isOpen={isOpenRedux}
        onClose={() => {
          dispatch(setOpenPost(false));
          setMessage("");
        }}
      >
        <ModalOverlay />
        <ModalContent className="PostModalCont">
          <ModalCloseButton />
          <ModalBody>
            <div className="PostModalContainer">
              <div className="PostModalContainer-Internal">
                <Heading
                  className="PostModalContainer-Internal-Title"
                  as={"h1"}
                  size={"md"}
                >
                  {post.title}
                </Heading>
                <Heading as={"h2"} size={"sm"}>
                  {post.username}
                </Heading>
                <Text
                  className="PostModalContainer-Internal-Text"
                  fontSize={"md"}
                >
                  {post.text}
                </Text>
              </div>
              {post.price !== null && (
                <div className="PostModalContainer-Internal-BottomFlex">
                  <Heading as={"h2"} size={"xs"}>
                    {returnPriceText(post.price, post.type)}
                  </Heading>
                </div>
              )}
              {post.img !== "" && post.img !== null && (
                <img
                  src={post.img}
                  alt={post.title + " image"}
                  className="PostModalContainer-Internal-Image"
                />
              )}
              <div className="PostModalContainer-Internal-BottomFlex">
                <Heading as={"h2"} size={"xs"}>
                  Created at <Moment format="LLL">{post.date_created}</Moment>
                </Heading>
                <Heading as={"h2"} size={"xs"}>
                  Deadline: <Moment format="LLL">{post.offer_deadline}</Moment>
                </Heading>
              </div>
            </div>
          </ModalBody>
          {myid !== post.userID && (
            <ModalFooter>
              <span className="PostModalStartConversation PostModalStartConversationAI">
                <Textarea
                  onChange={(el) => {
                    setMessage(el.target.value);
                  }}
                  value={message}
                  placeholder="Enter your message..."
                  required
                  focusBorderColor="orange.500"
                />
                <div className="AIAssistContainerMessage">
                  {aiAssistanceLoading && (
                    <Spinner style={{marginLeft: "12px"}}  color="purple.500" size="md" />
                  )}
                  {sending && <Spinner style={{marginLeft: "12px"}} color="orange.500" size="md" />}
                  <div   style={{ marginLeft: "auto"}}>
                    <div className="div_button">
                      <Button
                        className="button-85"
                        colorScheme={"purple"}
                        size="sm"
                        onClick={() => {
                          getAIAssistance();
                        }}
                        disabled={aiAssistanceLoading}
                        borderRadius={"6px 6px 6px 6px"}
                      >
                        AI Assist
                      </Button>
                    </div>
                    <Button
                      colorScheme="orange"
                      mr={3}
                      onClick={() => {
                        startConversation();
                      }}
                    >
                      Send
                    </Button>
                  </div>
                </div>
                {/* <InputGroup size="md">
                  <Input
                    outline={"1px solid var(--k-orange)"}
                    borderRadius={"12px 0px 0px 12px"}
                    pr="4.5rem"
                    type="text"
                    placeholder="Enter message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={sending}
                    focusBorderColor={"orange.500"}
                  />
                  <InputRightElement width="4.5rem">
                    <div className="AIAssistContainer">
                      <div className="div_button">
                        <Button
                          className="MessageContainer-SendButton button-85"
                          colorScheme={"purple"}
                          h="1.75rem"
                          size="sm"
                          onClick={() => {}}
                          disabled={sending}
                          borderRadius={"6px 6px 6px 6px"}
                        >
                          {sending ? <Spinner size="sm" /> : <>AI</>}
                        </Button>
                      </div>
                    </div>
                  </InputRightElement>
                </InputGroup> */}
              </span>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
