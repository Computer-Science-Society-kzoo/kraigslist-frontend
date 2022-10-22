import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store';

export interface AnimationState {
    headerFull: boolean;
}

const initialState: AnimationState = {
    headerFull: false,
};

export const animationsSlice = createSlice({
    name: 'animationsSlice',
    initialState: initialState,
    reducers: {
        setHeaderFull: (state, action) => {
        state.headerFull = action.payload;
      }
    }
  })
  
export const { setHeaderFull } = animationsSlice.actions
export const selectHeaderState = (state: RootState) => state.animations.headerFull;
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
