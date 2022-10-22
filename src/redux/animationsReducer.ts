import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store';

export interface AnimationState {
    headerClass: string;
}

const initialState: AnimationState = {
    headerClass: "Header-Logout",
};

export const animationsSlice = createSlice({
    name: 'animationsSlice',
    initialState: initialState,
    reducers: {
      changeHeaderClass: (state, action) => {
        state.headerClass = action.payload;
      }
    }
  })
  
export const { changeHeaderClass } = animationsSlice.actions
export const selectHeaderClass = (state: RootState) => state.animations.headerClass;
export default animationsSlice.reducer


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
