import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store';

export interface coreState {
    auth: boolean;
    createPost: boolean;
    openPost: boolean;
    pullNewPosts: boolean;
}


const initialState: coreState = {
    auth: false,
    createPost: false,
    openPost: false,
    pullNewPosts: false,
};

export const coresSlice = createSlice({
    name: 'coresSlice',
    initialState: initialState,
    reducers: {
        setAuthRedux: (state, action) => {
        state.auth = action.payload;
      },
        setCreatePost: (state, action) => {
          state.createPost = action.payload; 
        },
        setOpenPost: (state, action) => {
          state.openPost = action.payload; 
        },
        reduxPullNewPosts: (state, action) => {
          state.pullNewPosts = action.payload
        }
    }
  })
  
export const { setAuthRedux, setCreatePost, setOpenPost, reduxPullNewPosts } = coresSlice.actions
export const selectAuthState = (state: RootState) => state.core.auth;
export const selectCreatePostSate = (state: RootState) => state.core.createPost;
export const selectOpenPostSate = (state: RootState) => state.core.openPost;
export const selectPullNewPosts = (state: RootState) => state.core.pullNewPosts;
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
