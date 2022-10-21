import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewNoteInput } from './NewNoteInput';
import { noteSlice, NoteState } from './redux/notesReducer';
import { addNoteREDUX, selectNotes } from './redux/notesReducer';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/Signup';
import { MainPage } from './pages/main/MainPage';
import { Button } from '@chakra-ui/react';

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

function Header(): JSX.Element{
  return(
    <header>
      <Link to='/'>
        <Button>Home</Button>
      </Link>
      <Link to='/login'>
        <Button>Login</Button>
      </Link>
      <Link to='/signup'>
        <Button>SignUp</Button>
      </Link>
      <Link to='/main'>
        <Button>Main</Button>
      </Link>
    </header>
  )
}

function Footer(): JSX.Element{
  return(
    <footer>
      <p>I will be a footer at one point</p>
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
