import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'

export const MOBILE_DEVELOPMENT = false;

let ONLINE_REST_HOST = "https://bkl1.kzoocss.org";
let ONLINE_WS_HOST ="wss://bkl1.kzoocss.org/ws/"

let LOCAL_REST_HOST = "http://localhost:3000"
let LOCAL_WS_HOST = "ws://localhost:4500"

if (MOBILE_DEVELOPMENT) {
  console.log("WARNING: Mobile Development Mode is enabled. This should only be used for testing on a mobile device. Real server is in use.");
  LOCAL_REST_HOST = ONLINE_REST_HOST
  LOCAL_WS_HOST = ONLINE_WS_HOST
}
 

export const RestAPIHOST = (process.env.NODE_ENV === "production") ? ONLINE_REST_HOST : LOCAL_REST_HOST 
export const WebSocketHOST = (process.env.NODE_ENV === "production") ? "wss://bkl1.kzoocss.org/ws/" : LOCAL_WS_HOST
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);




root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ColorModeScript/>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
