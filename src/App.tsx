import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { MainPage } from "./pages/main/MainPage";
import { Header } from "./components/Header";
import { selectAuthState, setAuthRedux } from "./redux/coreReducer";
import { useCookies } from "react-cookie";
import { YourPostsPage } from "./pages/main/YourPosts";
import { MakePost } from "./pages/main/makePost";
import { MessagesPage } from "./pages/messages/MessagesPage";
import { Profile } from "./pages/main/Profile";
import { Guidelines } from "./pages/main/Guidelines";
import { ModalPost } from "./pages/main/PostModal";
import { Helmet } from "react-helmet";
import { selectTotalMessagesState } from "./redux/messagesReducer";
import { WebSockets } from "./websocket";

function Footer(): JSX.Element {
  return <footer></footer>;
}

function LoginOrHome(): JSX.Element {
  const dispatch = useDispatch();

  const auth = useSelector(selectAuthState);

  const [token, setToken, removeToken] = useCookies(["auth"]);

  useEffect(() => {
    if (token.auth) {
      dispatch(setAuthRedux(true));
    } else {
      dispatch(setAuthRedux(false));
    }
  }, [auth, token]);

  return <>{auth ? <HomePage /> : <LoginPage />}</>; // If the auth state is true, show the main page, otherwise show the login page
}

function HomePage(): JSX.Element {
  let location = useLocation();
  const totalMessages = useSelector(selectTotalMessagesState);
 
  function newMesssagesOrTitle() {
    if (totalMessages >= 0) {
      if (totalMessages === 1) {
        return `* New message | Kraigslist`;
      } else {
        return `* ${totalMessages} messages | Kraigslist`;
      }
    } else {
      return "Kraigslist";
    }
  }

  return (
    <>
      <Helmet>
        <title>{newMesssagesOrTitle()}</title>
        <meta name="description" content="Helmet application" />
        <link rel="canonical" href={location.pathname}></link>
      </Helmet>

      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path="/YourPostsPage" element={<YourPostsPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/Guidelines" element={<Guidelines />} />
      </Routes>
      <MakePost />
      <ModalPost />
      <Footer />
    </>
  );
}

function App(): JSX.Element {
  return (
    <>
      {/* The <Router> element need to wrap both the header (we have links there) and internal "route" (<Routes>) handlings */}
      <Router>
        <WebSockets/>
        <Header />
        <LoginOrHome />
        <Footer />
      </Router>
    </>
  );
}


export default App;
