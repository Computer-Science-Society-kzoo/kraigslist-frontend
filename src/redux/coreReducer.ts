import { createSlice } from '@reduxjs/toolkit'
import { useCookies } from 'react-cookie';
import { RootState } from './store';

export interface coreState {
    auth: boolean;
    createPost: boolean;
}


const initialState: coreState = {
    auth: false,
    createPost: false
};

export const coresSlice = createSlice({
    name: 'coresSlice',
    initialState: initialState,
    reducers: {
        setAuthRedux: (state, action) => {
        state.auth = action.payload;
      },
        setCreatePost: (state, action) => {
          state.createPost = action.payload 
        }
    }
  })
  
export const { setAuthRedux, setCreatePost } = coresSlice.actions
export const selectAuthState = (state: RootState) => state.core.auth;
export const selectCreatePostSate = (state: RootState) => state.core.createPost;
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
