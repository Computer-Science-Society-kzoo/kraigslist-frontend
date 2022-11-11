import { setActiveConversationRedux, setConversationsRedux } from "./redux/messagesReducer";
import { useDispatch } from "react-redux";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { storeRef } from "./redux/store";


// When the connection is closed, print some data to the console.
const client = new W3CWebSocket('ws://localhost:8000')
  
export function createWebSocketConnection() {
    return client;
}

// When the connection is open, print some data to the console.
client.onopen = () => {
    console.log('WebSocket Client Connected');
  };
  
// FORMAT OF MESSAGE (JSON)
// {
//     "type": "SMTH",
//     "data": {
//         ...
//     }
// }

interface Message {
    type: string;
    data: any;
}


client.onmessage = (message) => {


    const dataFromServer: Message = JSON.parse(message.data?.toString());
    switch (dataFromServer.type) {
        case "newMessage":
            console.log("newMessage: ", message.data);
            const data = {
                conID: dataFromServer.data.conversationID,
                message: dataFromServer.data.message
            }
            storeRef.dispatch(setActiveConversationRedux(data));
            break
        default:
            console.log("Undefined message type: ", message.data);
            break
    }
}
