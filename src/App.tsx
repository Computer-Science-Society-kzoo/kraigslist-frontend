import React from 'react';
import { useSelector } from 'react-redux';
import { NewNoteInput } from './NewNoteInput';
import { NoteState } from './notesReducer';


function App() {
  const notes = useSelector<NoteState, NoteState["notes"]>((state) => state.notes);

  return (
    <>
      <NewNoteInput addNote={alert}/>
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
