import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { extendTheme, ChakraProvider, ThemeConfig } from '@chakra-ui/react'
import { customTheme } from './ChakraTheme';
import { ColorModeScript } from '@chakra-ui/react'
import { WebSockets } from './websocket'; 

export const RestAPIHOST = (process.env.NODE_ENV === "production") ? "https://bkl1.kzoocss.org" : "http://localhost:3000" 
export const WebSocketHOST = (process.env.NODE_ENV === "production") ? "wss://bkl1.kzoocss.org/ws/" : "ws://localhost:4500"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const config: ThemeConfig = {

  initialColorMode: "light",
  useSystemColorMode: false,

}

const theme = extendTheme({ config })


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ColorModeScript/>
      <ChakraProvider>
        <WebSockets/>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
