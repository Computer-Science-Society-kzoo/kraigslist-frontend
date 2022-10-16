import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewNoteInput } from './NewNoteInput';
import { noteSlice, NoteState } from './redux/notesReducer';
import { addNoteREDUX, selectNotes } from './redux/notesReducer';


function App() {
  const notes = useSelector(selectNotes);

  const dispatch = useDispatch();

  const addNote = (note: string) => {
    dispatch(addNoteREDUX(note))
  };

  return (
    <>
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

export default App;
