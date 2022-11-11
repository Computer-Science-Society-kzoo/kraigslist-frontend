import { w3cwebsocket as W3CWebSocket } from "websocket";
import { selectAuthState } from "./redux/coreReducer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useCookies } from "react-cookie";


export function WebSockets(): JSX.Element {

    let auth = useSelector(selectAuthState);
    const [token, setToken, removeToken] = useCookies(["auth"]);

    let websocket = new W3CWebSocket('ws://localhost:8000');

    websocket.onopen = () => {
        console.log('Websocket connected');
    };

    useEffect(() => {
        if (auth) {
            websocket = new W3CWebSocket('ws://localhost:8000/token?' + token.auth  );        
        }
    }, [auth]);

    return <span style={{display: "none"}}></span>
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
