import "./MessagesPage.css";
import { Divider, Text, Heading, Avatar, Input } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { ClassNames } from "@emotion/react";

function Conversation(): JSX.Element {
    return (
        <div className="Conversation">
            
        </div>
    )
}

interface Converstaion {
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
}

function Message(props: Message): JSX.Element {
    return (
        <div className="MessageItem">
            <Text className="imessage" fontSize='md'>{props.message}</Text>
        </div>
    )
}

function MessageContainer(props: {id: number}): JSX.Element {

  const [token, setToken, removeToken] = useCookies(["auth"]);

  const [messages, setMessages] = useState<Message[]>([]);

  function parseMessages(newMessages: any) {
    let parsedMessages: Message[] = [];
    newMessages.forEach((con: any) => {
      parsedMessages.push({
        message: con.message,
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
          "Comradeid": props.id,
        }
      })
      .then((res) => {
        console.log(res.data);
        setMessages(parseMessages(res.data));
      });
  }


    useEffect(() => {
      getMessages();
    }, [props])

    return (
        <div className="MessageContainer">
            {props.id === -1 && 
              <div className="MessageContainer-NoSelection">
                <ChatIcon/>
                <Text fontSize='xl' noOfLines={3}>
                  Select a conversation to start messaging
                </Text>
              </div>
            }
            { props.id !== -1 &&
              <div className="MessageContainer-Selected">
                <Heading as='h1' size='lg'>
                  {props.id}
                </Heading>
                {messages.map((message) => (
                  <Message message={message.message}/>
                ))}

                <Input placeholder='Your message...' />
              </div>
            }
        </div>
    )
}


export function MessagesPage(): JSX.Element {
  
  const [token, setToken, removeToken] = useCookies(["auth"]);

  const [conversations, setConversations] = useState<Converstaion[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<number>(-1);

  function parsePosts(newConversations: any) {
    let parsedConversations: Converstaion[] = [];
    newConversations.forEach((con: any) => {
      parsedConversations.push({
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
            <a className={selectedConversation === con.comID ? "SelectedMessage" : ""} onClick={() => setSelectedConversation(con.comID) }>
              <ConversationItem comID={con.comID} name={con.name} lastMessage={con.lastMessage} />
            </a>
            
          ))}
        </div>
        <Divider orientation='vertical'/>
          <MessageContainer id={selectedConversation}/>
      </div>
    </div>
  );
}
