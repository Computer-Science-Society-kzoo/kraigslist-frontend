import "./MessagesPage.css";
import { Divider, Text, Heading, Avatar, Input, InputGroup, InputRightElement, Button} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

export function SendMessage(props: {id: number}): JSX.Element {

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
      axios
          .post("http://localhost:3000/api/messages/send", {
              conversationID: props.id,
              message: message
          }, {
              headers: {
                  "Authorization": "Bearer " + token.auth
              }
          })
          .then((res) => {
              console.log(res);

          })
          .catch((err) => {
              messageFailure("Error", "Something went wrong.");
              }
          );
    }
  }

  return (
    <div className="SendMessageContainer">
     <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type="text"
        placeholder='Enter message...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <InputRightElement width='4.5rem'>
        <Button colorScheme="orange" h='1.75rem' size='sm' onClick={sendMessage}>
          Send
        </Button>
      </InputRightElement>
    </InputGroup>
    </div>
  );
}


interface Converstaion {
  conID: number;
  comID: number;
  name: string;
  lastMessage: string;
}

function ConversationItem(props: Converstaion): JSX.Element {

    return (
        <div className="ConversationItem">
              <Avatar size='lg' name={props.name}/>
              <div>
                <Heading as='h2' size='md' noOfLines={1}>
                  {props.name}
                </Heading>
                <Text fontSize='md'>{props.lastMessage}</Text>
              </div>
        </div>
    )
}

interface Message {
  message: string;
  yours: boolean;
}

function Message(props: Message): JSX.Element {
    return (
        <div className={props.yours ? "MessageItem YourMessage" : "MessageItem"}>
            <Text fontSize='md'>{props.message}</Text>
        </div>
    )
}

function MessageContainer(props: {conID: number, comID: number}): JSX.Element {

  const [token, setToken, removeToken] = useCookies(["auth"]);

  const [messages, setMessages] = useState<Message[]>([]);

  function parseMessages(newMessages: any) {
    let parsedMessages: Message[] = [];
    newMessages.forEach((con: any) => {
      parsedMessages.push({
        message: con.message,
        yours: (con.receiverUID === props.comID) ? true : false
      });
    });
    return parsedMessages;
  }

  async function getMessages() {
    console.log(token.auth);
    axios
      .get("http://localhost:3000/api/messages/allmessages", { 
        "headers":
        {
          "Authorization": `Bearer ${token.auth}`,
          "Comradeid": props.comID,
        }
      })
      .then((res) => {
        console.log(res.data);
        setMessages(parseMessages(res.data));
      });
  }

    useEffect(() => {
      getMessages();
    }, [props.comID])

    return (
        <div className="MessageContainer">
            {props.conID === -1 && 
              <div className="MessageContainer-NoSelection">
                <ChatIcon/>
                <Text fontSize='xl' noOfLines={3}>
                  Select a conversation to start messaging
                </Text>
              </div>
            }
            { props.conID !== -1 &&
              <div className="MessageContainer-Selected">
                <div>
                  <Heading as='h1' size='lg'>
                    Conversation ID: {props.conID}, Comrade ID: {props.comID}
                  </Heading>
                </div>
                <div className="MessageContainer-Selected-Messages" id="MessagesContainer">
                {messages.map((message) => (
                  <Message message={message.message} yours={message.yours} />
                ))}
                </div>  
                <SendMessage id={props.conID}/>
              </div>
            }
        </div>
    )
}


export function MessagesPage(): JSX.Element {
  
  const [token, setToken, removeToken] = useCookies(["auth"]);

  const [conversations, setConversations] = useState<Converstaion[]>([]);
  const [comradeID, setComradeID] = useState<number>(-1);
  const [selectedConversation, setSelectedConversation] = useState<number>(-1);

  function parsePosts(newConversations: any) {
    let parsedConversations: Converstaion[] = [];
    newConversations.forEach((con: any) => {
      parsedConversations.push({
        conID: con.conversationID,
        comID: con.comID,
        name: con.name,
        lastMessage: con.lastMessage,
      });
    });
    return parsedConversations;
  }

  async function getConversations() {
    console.log(token.auth);
    axios
      .get("http://localhost:3000/api/messages/allconversations", { 
        "headers":
        {
          "Authorization": `Bearer ${token.auth}`
        }
      })
      .then((res) => {
        console.log(res.data);
        setConversations(parsePosts(res.data));
      });
  }

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <div className="MessagesPageContainer">
      <div className="MessagesPageContainer-Main">
        <div className="ConversationContainer">
          {conversations.map((con) => (
            <a className={selectedConversation === con.conID ? "SelectedMessage" : ""} onClick={() => {setSelectedConversation(con.conID); setComradeID(con.comID)} }>
              <ConversationItem conID={con.conID} comID={con.comID} name={con.name} lastMessage={con.lastMessage}  />
            </a>
          ))}
        </div>
        <Divider orientation='vertical'/>
          <MessageContainer comID={comradeID} conID={selectedConversation}/>
      </div>
    </div>
  );
}
function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean; }) {
  throw new Error("Function not implemented.");
}

