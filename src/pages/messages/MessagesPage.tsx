import "./MessagesPage.css";
import { Divider, Text, Heading, Avatar } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

function Conversation(): JSX.Element {
    return (
        <div className="Conversation">
            
        </div>
    )
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

interface Converstaion {
    name: string;
    lastMessage: string;
}

export function MessagesPage(): JSX.Element {
  
  const [token, setToken, removeToken] = useCookies(["auth"]);

  const [conversations, setConversations] = useState<Converstaion[]>([]);

  function parsePosts(newConversations: any) {
    let parsedConversations: Converstaion[] = [];
    newConversations.forEach((con: any) => {
      parsedConversations.push({
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
            <ConversationItem name={con.name} lastMessage={con.lastMessage} />
          ))}
        </div>
        <Divider orientation='vertical'/>
        <div>
          hello 2
        </div>
      </div>
    </div>
  );
}
