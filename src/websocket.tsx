import { w3cwebsocket as W3CWebSocket } from "websocket";
import { selectAuthState } from "./redux/coreReducer";
import { useSelector } from "react-redux";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { pushNewIncomingMessageRedux, selectActiveMessagesState, pushActiveMessageRedux, setActiveMessagesRedux, MessageProps, setTotalUnreadMessagesRedux } from "./redux/messagesReducer";
import { useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import { RestAPIHOST, WebSocketHOST } from "./index";

interface Message {
    type: string;
    data: any;
}

export function WebSockets(): JSX.Element {

    // let websocket = new WebSocket('ws://localhost:8000');

    
    // websocket.onopen = () => {
    //     //console.log('Websocket connected');
    // };


    // websocket.onmessage = (message) => {
    //     console.log(message)
    //     let data = JSON.parse(message.data);
    //     const dataFromServer: Message = data
    //     console.log(dataFromServer)
    //     switch (dataFromServer.type) {
    //         case "connected":
    //             console.log("Connected to the WebSocket server");
    //             break;
    //         case "newMessage":
    //             console.log(dataFromServer)
    //             const data = {
    //                 conID: dataFromServer.data.conversationID,
    //                 message: dataFromServer.data.message
    //             }
    //             break
    //         default:
    //             console.log("Undefined message type: ", message.data);
    //             break
    //     }
    // };

      //Public API that will echo messages sent to it back to the client

  let auth = useSelector(selectAuthState);
  const [token, setToken, removeToken] = useCookies(["auth"]);
  const [URL, setURL] = useState(`${WebSocketHOST}`);

  const [messageHistory, setMessageHistory] = useState<any>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(URL);
  
  let allMessages = useSelector(selectActiveMessagesState);


  const dispatch = useDispatch();

  

  useEffect(() => {
    if (lastMessage !== null) {
        setMessageHistory([...messageHistory, lastMessage.data]);

        const message = lastMessage
        let data = JSON.parse(message.data);
        const dataFromServer: Message = data
        switch (dataFromServer.type) {
            case "connected":
                console.log("Connected to the WebSocket server");
                axios.post(`${RestAPIHOST}/api/messages/totalmessages`, { 
                    headers: {
                      authorization: `Bearer ${token.auth}`,
                    }
                })
                .then((res) => {
                    console.log(res.data);
                    dispatch(setTotalUnreadMessagesRedux(res.data));
                });

                break;
            case "newMessage":
                console.log(dataFromServer)
        
                
                const now = moment().toDate()

                //get current date            
                
                const id = dataFromServer.data.conversationID
                
                const newMessage: MessageProps = {
                    message: dataFromServer.data.message,
                    yours: false,
                    date: now.toString()
                }

                dispatch(pushNewIncomingMessageRedux({conId: id, message: newMessage}))       

                break
            default:
                console.log("Undefined message type: ", message.data);
                break
        }
        
    }
  }, [lastMessage, setMessageHistory]);


  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

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
    }, [auth]);

    return (
        <div style={{display: "none", flexDirection: "column"}}>
          <span>The WebSocket is currently {connectionStatus}</span>
          {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
          <ul>
            {messageHistory.map((message: { data: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, idx: Key | null | undefined) => (
              <span key={idx}>{message ? message.data : null}</span>
            ))}
          </ul>
        </div>
      );

}


// // When the connection is closed, print some data to the console.
// let websocket = new WebSocket("ws://localhost:8000");
  
// export function createWebSocketConnection() {
//     return websocket;
// }


// // When the connection is open, print some data to the console.
// websocket.onopen = () => {
//     console.log('WebSocket Client Connected');
// };
  
// FORMAT OF MESSAGE (JSON)
// {
//     "type": "SMTH",
//     "data": {
//         ...
//     }
// }



// websocket.onmessage = (message) => {

//     const dataFromServer: Message = JSON.parse(message.data?.toString());
//     switch (dataFromServer.type) {
//         case "newMessage":
//             console.log("newMessage: ", message.data);
//             const data = {
//                 conID: dataFromServer.data.conversationID,
//                 message: dataFromServer.data.message
//             }
//             break
//         default:
//             console.log("Undefined message type: ", message.data);
//             break
//     }
// }
