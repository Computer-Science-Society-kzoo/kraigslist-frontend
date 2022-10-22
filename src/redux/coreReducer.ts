import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store';

export interface coreState {
    auth: boolean;
}

const initialState: coreState = {
    auth: false,
};

export const coresSlice = createSlice({
    name: 'coresSlice',
    initialState: initialState,
    reducers: {
        setAuthRedux: (state, action) => {
        state.auth = action.payload;
      }
    }
  })
  
export const { setAuthRedux } = coresSlice.actions
export const selectHeaderState = (state: RootState) => state.core.auth;
export default coresSlice.reducer


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
