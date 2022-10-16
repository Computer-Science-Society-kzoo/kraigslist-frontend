import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewNoteInput } from './NewNoteInput';
import { NoteState } from './notesReducer';



function App() {
  const notes = useSelector<NoteState, NoteState["notes"]>((state) => state.notes);

  const dispatch = useDispatch();

  const addNote = (note: string) => {
    dispatch({type: "ADD_NOTE", payload: note})
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
