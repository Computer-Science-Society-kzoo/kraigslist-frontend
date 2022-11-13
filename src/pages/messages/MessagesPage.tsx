import "./MessagesPage.css";
import {
  Divider,
  Text,
  Heading,
  Avatar,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useCookies } from "react-cookie";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Moment from "react-moment";
import {
  setActiveConIDRedux,
  eraseActiveMessagesRedux,
  pushActiveMessageRedux,
  pushMoreMessagesRedux,
  setNewLastMessageRedux,
  selectActiveMessagesState,
  selectConversationsState,
  setActiveMessagesRedux,
  setConversationsRedux,
  selectActiveConIDState,
} from "../../redux/messagesReducer";
import { ConversationProps, MessageProps } from "../../redux/messagesReducer";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  animateScroll as scroll,
  scroller,
} from "react-scroll";

import { RestAPIHOST } from "../../index";

interface MessageDetails {
  name: string;
  conID: number;
  comID: number;
  postID: number;
}

interface BoottomMessageContainerProps {
  postID: number;
  id: number;
  addNewMessage: (message: string) => void;
}

interface conversationWithUpdateFunction extends MessageDetails {
  updateLastMessage: (conID: number, message: string) => void;
}

function ConversationItem(props: ConversationProps): JSX.Element {
  return (
    <div className="ConversationItem">
      <Avatar size="lg" name={props.name} />
      <div>
        <Heading as="h2" size="md" noOfLines={1}>
          {props.name}
        </Heading>
        <Text fontSize="md">{props.lastMessage}</Text>
      </div>
    </div>
  );
}

function TopMessageContainer(props: MessageDetails): JSX.Element {
  return (
    <div className="TopMessageContainer">
      {/* <Heading as='h1' size='lg'>
          Conversation ID: {props.conID}, Comrade ID: {props.comID}, Post ID: {props.postID}, Name: {props.name}
        </Heading> */}
      <Heading as="h1" size="lg">
        {props.name}
      </Heading>
    </div>
  );
}

function Message(props: MessageProps): JSX.Element {
  return (
    <div className="MessageFullContainer">
      <div className={props.yours ? "MessageItem YourMessage" : "MessageItem"}>
        <Text fontSize="md">{props.message}</Text>
      </div>
      <div
        className={
          props.yours
            ? "MessageFullContainer-Date"
            : "MessageFullContainer-Date-Reversed"
        }
      >
        <Text fontSize="xs">
          <Moment format="LT">{props.date}</Moment>
        </Text>
      </div>
    </div>
  );
}

export function BottomMessageContainer(
  props: BoottomMessageContainerProps
): JSX.Element {
  const [sending, setSending] = useState(false);

  function messageFailure(title: string, desc: string) {
    toast({
      title: title,
      description: desc,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  const [token, setToken, removeToken] = useCookies(["auth"]);
  const [message, setMessage] = useState<string>("");
  async function sendMessage() {
    if (message !== "") {
      setSending(true);
      axios
        .post(
          `${RestAPIHOST}/api/messages/send`,
          {
            conversationID: props.id,
            message: message,
            postID: props.postID,
          },
          {
            headers: {
              Authorization: "Bearer " + token.auth,
            },
          }
        )
        .then((res) => {
          props.addNewMessage(message);
          setMessage("");
          setSending(false);
        })
        .catch((err) => {
          messageFailure("Error", "Something went wrong.");
          setMessage("");
          setSending(false);
        });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className="SendMessageContainer">
      <InputGroup size="md">
        <Input
          borderRadius={"10px 10px 10px 10px"}
          pr="4.5rem"
          type="text"
          placeholder="Enter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
          disabled={sending}
        />
        <InputRightElement width="4.5rem">
          <Button
            className="MessageContainer-SendButton"
            colorScheme="orange"
            h="1.75rem"
            size="sm"
            onClick={sendMessage}
            disabled={sending}
          >
            {sending ? <Spinner size="sm" /> : <>Send</>}
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
}
function MessageContainer(props: conversationWithUpdateFunction): JSX.Element {
  const [token, setToken, removeToken] = useCookies(["auth"]);

  const dispatch = useDispatch();

  const messages = useSelector(selectActiveMessagesState);

  const testMessages = messages.slice();

  function setMessages(messages: MessageProps[]) {
    dispatch(setActiveMessagesRedux(messages));
  }

  function addMessage(message: MessageProps) {
    dispatch(pushActiveMessageRedux(message));
  }

  function parseMessages(newMessages: any) {
    let parsedMessages: MessageProps[] = [];
    newMessages.forEach((con: any) => {
      const date = new Date(con.date);
      parsedMessages.push({
        message: con.message,
        yours: con.receiverUID === props.comID ? true : false,
        date: con.date,
      });
    });
    return parsedMessages
  }

  //check if two dates share the same day
  function sameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  //check if the date is today
  function isToday(date: Date) {
    return sameDay(date, new Date());
  }

  //check if the date is yesterday
  function isYesterday(date: Date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return sameDay(date, yesterday);
  }

  //return Today or Yesterday or the date
  function formatDate(date: Date) {
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    }
    return date.toLocaleDateString();
  }

  function addNewMessage(message: string) {
    const now = moment().toDate();
    addMessage({ message: message, yours: true, date: now.toString() });
    props.updateLastMessage(props.conID, message);
  }


  //const [page, setPage] = useState(1);
  async function getMessages() {
    console.log(props.postID);
    axios
      .get(`${RestAPIHOST}/api/messages/allmessages`, {
        headers: {
          Authorization: `Bearer ${token.auth}`,
          Comradeid: props.comID,
          Postid: props.postID,
          Conversationid: props.conID,
          //page: page,
        },
      })
      .then((res) => {
        setMessages(parseMessages(res.data).reverse());
        //setPage(page + 1);
        if (res.data.length > 0) {
          props.updateLastMessage(props.conID, res.data.reverse()[0].message);
        }
      });
  }

  // const [loadMore, setLoadMore] = useState(false);
  // const [fuse, setFuse] = useState<boolean>(true);

  // function lastElementReached() {
  //   if (!fuse) {
  //     setLoadMore(true);
  //     setTimeout(() => {
  //       getMessages();
  //       setLoadMore(false);
  //     }, 10);
  //   } else {
  //     //setFuse(false);
  //   }
  // }

  // const divRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
    scroller.scrollTo("bottom", {
      containerId: "MessagesContainer-Scroll",
      duration: 0,
      smooth: false,
      offset: 0,
    });
    getMessages()
    //setPage(1)
  }, [props.conID]);


  let counter = 0;
  return (
    <div className="MessageContainer">
      {props.conID === -1 && (
        <div className="MessageContainer-NoSelection">
          <ChatIcon />
          <Text fontSize="xl" noOfLines={3}>
            Select a conversation to start messaging
          </Text>
        </div>
      )}
      {props.conID !== -1 && (
        <div className="MessageContainer-Selected">
          <TopMessageContainer {...props} />
          <AnimatePresence>
            <div
              // ref={divRef}
              className="MessageContainer-Selected-Messages"
              id="MessagesContainer-Scroll"
            >
              <div className="bottom"></div>
              {messages.map((message) => {
                let showDate = false;
                let showFirstDate = false;
                if (messages.indexOf(message) !== 0) {
                  if (
                    !sameDay(
                      new Date(message.date),
                      new Date(messages[messages.indexOf(message) - 1].date)
                    )
                  ) {
                    showDate = true;
                  }
                }
                if (messages.indexOf(message) === messages.length - 1) {
                  showFirstDate = true;
                }

                return (
                  <motion.div
                    key={counter++}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {showFirstDate && (
                      <div className="MessageContainer-Selected-Messages-Date">
                        <Text fontSize="md">
                          <Moment format="LL">
                            {messages[messages.length - 1].date}
                          </Moment>
                        </Text>
                      </div>
                    )}

                    <Message
                      message={message.message}
                      yours={message.yours}
                      date={message.date}
                    />

                    {showDate && (
                      <div className="MessageContainer-Selected-Messages-Date">
                        <Text fontSize="md">
                          <Moment format="LL">
                            {messages[messages.indexOf(message) - 1].date}
                          </Moment>
                        </Text>
                      </div>
                    )}
                  </motion.div>
                );
              })}
              {/* {!loadMore && (
                <motion.div onViewportEnter={lastElementReached}> </motion.div>
              )}
              {loadMore && (
                <div className="divCenter MessageContainer-LoadMoreSpinner">
                  <Spinner size="xl" color="orange.500" />
                </div>
              )} */}
            </div>
          </AnimatePresence>
          <BottomMessageContainer
            id={props.conID}
            postID={props.postID}
            addNewMessage={addNewMessage}
          />
        </div>
      )}
    </div>
  );
}

export function MessagesPage(): JSX.Element {
  const [token, setToken, removeToken] = useCookies(["auth"]);


  const dispatch = useDispatch();
  const conversations = useSelector(selectConversationsState);

  function setConversations(conversations: ConversationProps[]) {
    dispatch(setConversationsRedux(conversations));
  }

  const [conversationsTrigger, setconversationsTrigger] =
    useState<boolean>(false);
  const [comradeID, setComradeID] = useState<number>(-1);
  const [comradeName, setComradeName] = useState<string>("");
  const [postID, setPostID] = useState<number>(-1);

  const selectedConversation = useSelector(selectActiveConIDState);

  function setSelectedConversation(conID: number) {
    dispatch(setActiveConIDRedux(conID));
  }
  const [loading, setLoading] = useState<boolean>(true);

  function parsePosts(newConversations: any) {
    let parsedConversations: ConversationProps[] = [];
    newConversations.forEach((con: any) => {
      parsedConversations.push({
        conID: con.conversationID,
        comID: con.comID,
        name: con.name,
        lastMessage: con.lastMessage,
        postID: con.postID,
        numberOfUnreadMessages: con.newMessages || 0,
        date: con.date,
      });
    });
    return parsedConversations.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

   async function getConversations() {
    console.log(token.auth);
    setLoading(true);
    axios
      .get(`${RestAPIHOST}/api/messages/allconversations`, {
        headers: {
          Authorization: `Bearer ${token.auth}`,
        },
      })
      .then((res) => {
        setConversations(parsePosts(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function selectConversation(
    conID: number,
    comID: number,
    name: string,
    postID: number
  ) {
    setComradeID(comID);
    setComradeName(name);
    setPostID(postID);
    setSelectedConversation(conID);
  }


  function updateLastMessage(conID: number, message: string) {

  const date = moment().toDate().toString()
  dispatch(setNewLastMessageRedux({conID, message, date}));
  
  }

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    console.log("Conversations updated");
  }, [conversationsTrigger]);

  return (
    <div className="MessagesPageContainer">
      <div className="MessagesPageContainer-Main">
        <div className="ConversationContainer">
          {conversations.length === 0 && loading === true && (
            <div className="ConversationContainer-Loading">
              <Text fontSize="xl" noOfLines={3}>
                Loading...
              </Text>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="orange.500"
                size="xl"
              />
            </div>
          )}
          {conversations.length === 0 && loading === false && (
            <div className="ConversationContainer-NoConversations">
              <Text fontSize="xl" noOfLines={3}>
                You have no conversations
              </Text>
              <Text fontSize="xs" noOfLines={3}>
                Start conversation by contacting posts's authors
              </Text>
            </div>
          )}
          <AnimatePresence>
            {conversations.map((con) => (
              <motion.div
                key={con.conID}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="ConversationContainer-Conversation"
              >
                <a
                  className={
                    (selectedConversation === con.conID ? "SelectedMessage" : 
                    (con.numberOfUnreadMessages > 0 ? "UnreadMessage" : ""))
                  }
                  onClick={() => {
                    selectConversation(
                      con.conID,
                      con.comID,
                      con.name,
                      con.postID
                    );
                  }}
                >
                  <div className={con.numberOfUnreadMessages > 0 ? "UnreadMessageValue" : "UnreadMessageValueHide" }>
                    <div>{con.numberOfUnreadMessages}</div>
                  </div>
                  <ConversationItem {...con} />

                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <Divider orientation="vertical" />
        <MessageContainer
          comID={comradeID}
          conID={selectedConversation}
          name={comradeName}
          postID={postID}
          updateLastMessage={updateLastMessage}
        />
      </div>
    </div>
  );
}
function toast(arg0: {
  title: string;
  description: string;
  status: string;
  duration: number;
  isClosable: boolean;
}) {
  throw new Error("Function not implemented.");
}

