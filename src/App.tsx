import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LoginPage } from './pages/login/LoginPage';
import { MainPage } from './pages/main/MainPage';
import { Header } from './components/Header';

function Footer(): JSX.Element{
  return(
    <footer>
    </footer>
  )
}

function App(): JSX.Element {
  return(
    <Router>
      <Header/>
      {/* The dynamic part of the page */
       /* Load different components depending on the current URL */
      }
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        {/* <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} /> */}
        <Route path="/main" element={<MainPage/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App;

