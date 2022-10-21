import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewNoteInput } from './NewNoteInput';
import { noteSlice, NoteState } from './redux/notesReducer';
import { addNoteREDUX, selectNotes } from './redux/notesReducer';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/Signup';
import { MainPage } from './pages/main/MainPage';
import { Button, useToast } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { Header } from './components/Header';

function Home(props: {text: string}) {
  const notes = useSelector(selectNotes);

  const dispatch = useDispatch();

  const addNote = (note: string) => {
    dispatch(addNoteREDUX(note))
  };

  return (
    <>
      {props.text}
      <NewNoteInput addNote={addNote}/>
      <hr />
      <ul>
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </>
  );
}

// function Header(): JSX.Element{
//   const [token, setToken, removeToken] = useCookies(["auth"]);
//   const toast = useToast()
//   return(
//     <header>
//       <Link to='/'>
//         <Button>Home</Button>
//       </Link>
//       <Link to='/login'>
//         <Button>Login</Button>
//       </Link>
//       <Link to='/signup'>
//         <Button>SignUp</Button>
//       </Link>
//       <Link to='/main'>
//         <Button>Main</Button>
//       </Link>
//       <Button onClick={() => { removeToken("auth"); 
//       toast({
//         title: "Warning",
//         description:"You are now logged out.",
//         status: "warning",
//         duration: 9000,
//         isClosable: true,
//       });
//     }}
//       colorScheme='orange'
//       >Sign Out</Button>
//     </header>

//   )
// }

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
        <Route path="/" element={<Home text="I am home"/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/main" element={<MainPage/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App;

