import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store';

export interface postModalState {
    date_created: string;
    title: string;
    text: string;
    username: string;
    type: string;
    img: string;
    offer_deadline: string;
    userID: number;
    postID: number;
    price: number;
}


const initialState: postModalState = {
    date_created: "",
    title: '',
    text: '',
    username: '',
    type: '',
    img: '',
    offer_deadline: '',
    userID: -1,
    postID: -1,
    price: 0
};

export const postModalSlice = createSlice({
    name: 'postModalSlice',
    initialState: initialState,
    reducers: {
        setPostModalRedux: (state, action) => {
            state.date_created = action.payload.date_created;
            state.title = action.payload.title;
            state.text = action.payload.text;
            state.username = action.payload.username;
            state.type = action.payload.type;
            state.img = action.payload.img;
            state.offer_deadline = action.payload.offer_deadline;
            state.userID = action.payload.userID;
            state.postID = action.payload.postID;
            state.price = action.payload.price;
        }
    }
  })
  
export const { setPostModalRedux } = postModalSlice.actions
export const selectPostModalRedux = (state: RootState) =>{
    return {
        date_created: state.postModal.date_created,
        title: state.postModal.title,
        text: state.postModal.text,
        username: state.postModal.username,
        type: state.postModal.type,
        img: state.postModal.img,
        offer_deadline: state.postModal.offer_deadline,
        userID: state.postModal.userID,
        postID: state.postModal.postID,
        price: state.postModal.price
    }
}

export default postModalSlice.reducer


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
