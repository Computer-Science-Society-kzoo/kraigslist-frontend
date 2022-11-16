import { selectAuthState } from "./redux/coreReducer";
import { useSelector } from "react-redux";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { pushNewIncomingMessageRedux, MessageProps, setTotalUnreadMessagesRedux } from "./redux/messagesReducer";
import { useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import { RestAPIHOST, WebSocketHOST } from "./index";
import { createStandaloneToast } from '@chakra-ui/react'
import { useLocation } from "react-router-dom";


interface Message {
    type: string;
    data: any;
}

const { ToastContainer, toast } = createStandaloneToast()

export function WebSockets(): JSX.Element {
  let location = useLocation()

  let auth = useSelector(selectAuthState);
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken, removeToken] = useCookies(["auth"]);
  const [URL, setURL] = useState(`${WebSocketHOST}`);

  const [messageHistory, setMessageHistory] = useState<any>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sendMessage, lastMessage, readyState } = useWebSocket(URL);
  
  const dispatch = useDispatch();

  function pushNotification(user: string, message: string) {


    if (location.pathname !== "/messages") {
      toast({
        title: user,
        description: message,
        status: 'info',
        duration: 6000,
        isClosable: true,
        position: "bottom-right",
        variant: "subtle",
      })
    
    }
  }

  useEffect(() => {
    if (lastMessage !== null) {
        setMessageHistory([...messageHistory, lastMessage.data]);

        const message = lastMessage
        let data = JSON.parse(message.data);
        const dataFromServer: Message = data
        switch (dataFromServer.type) {
            case "connected":
                axios
                .get(`${RestAPIHOST}/api/messages/totalmessages`, {
                  headers: {
                    Authorization: `Bearer ${token.auth}`
                    //page: page,
                  },
                })
                .then((res) => {
                    dispatch(setTotalUnreadMessagesRedux(res.data));
                });

                break;
            case "newMessage":
        
                
                const now = moment().toDate()

                //get current date            
                
                const id = dataFromServer.data.conversationID
                
                const newMessage: MessageProps = {
                    sender: dataFromServer.data.sender,
                    message: dataFromServer.data.message,
                    yours: false,
                    date: now.toString()
                }

                dispatch(pushNewIncomingMessageRedux({conId: id, message: newMessage}))   
                
                pushNotification(dataFromServer.data.sender, dataFromServer.data.message)

                break
            default:
                console.log("Undefined message type: ", message.data);
                break
        }
        
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage, setMessageHistory]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

    useEffect(() => {
        if (auth) {
            setURL(`${WebSocketHOST}?access_token=` + token.auth);
        }
    }, [auth, token.auth]);

    return (
      <>
        <div style={{display: "none", flexDirection: "column"}}>
        <div className="ToastContainerAccess">
          <ToastContainer />
        </div>

          <span>The WebSocket is currently {connectionStatus}</span>
          {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
          <ul>
            {messageHistory.map((message: { data: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, idx: Key | null | undefined) => (
              <span key={idx}>{message ? message.data : null}</span>
            ))}
          </ul>
        </div>
        </>
      );
}
