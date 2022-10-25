import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { MainPage } from "./pages/main/MainPage";
import { Header } from "./components/Header";
import { selectAuthState, setAuthRedux } from "./redux/coreReducer";
import { useCookies } from "react-cookie";
import { YourPostsPage } from "./pages/main/YourPosts";

function Footer(): JSX.Element {
  return <footer></footer>;
}

function LoginOrHome(): JSX.Element {
  const [token, setToken, removeToken] = useCookies(["auth"]); // Get the token from the cookie
  const dispatch = useDispatch();
  dispatch(setAuthRedux(token["auth"] ? true : false)); // Set the auth state to true if the token exists
  const auth = useSelector(selectAuthState);
  return <>{auth ? <HomePage /> : <LoginPage />}</>; // If the auth state is true, show the main page, otherwise show the login page
}

function HomePage(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/YourPostsPage" element={<YourPostsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

function App(): JSX.Element {
  return (
    <>
      {/* The <Router> element need to wrap both the header (we have links there) and internal "route" (<Routes>) handlings */}
      <Router>
        <Header />
        <LoginOrHome />
        <Footer />
      </Router>
    </>
  );
}

export default App;
