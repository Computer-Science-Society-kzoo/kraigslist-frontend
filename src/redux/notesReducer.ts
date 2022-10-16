import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store';

export interface NoteState {
    notes: string[];
}

const initialState: NoteState = {
    notes: ["Note 1", "Note 2"]
};

export const noteSlice = createSlice({
    name: 'notes',
    initialState: initialState,
    reducers: {
      addNoteREDUX: (state, action) => {
        state.notes = [...state.notes, action.payload];
      }
    }
  })
  
export const { addNoteREDUX } = noteSlice.actions
export const selectNotes = (state: RootState) => state.notes.notes;
export default noteSlice.reducer


// type Action = { type: 'ADD_NOTE', payload: string };

// export const notesReducer = (state:NoteState = initialState ,action: Action) => {
//     switch (action.type) {
//         case 'ADD_NOTE':
//             return {
//                 ...state, notes: [...state.notes, action.payload]
//             };
//         default:
//             return state;
//     }
// }
