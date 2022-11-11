import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store';

export interface MessageProps {
    message: string;
    yours: boolean;
    date: string;
  }

export interface ConversationProps {
    conID: number;
    comID: number;
    postID: number;
    name: string;
    lastMessage: string;
    numberOfUnreadMessages: number;
}

export interface messagesState {
    totalMessages: number;
    conversations: ConversationProps[];
    activeMessages: MessageProps[];
}

const initialState: messagesState = {
    totalMessages: 0,
    conversations: [],
    activeMessages: []
};

export const coresSlice = createSlice({
    name: 'coresSlice',
    initialState: initialState,
    reducers: {
        setTotalUnreadMessagesRedux: (state, action) => {
            state.totalMessages = action.payload;
        },
        setConversationsRedux: (state, action) => {
            console.log("setConversationsRedux: ", action.payload);
            state.conversations = action.payload 
        },
        setActiveMessagesRedux: (state, action) => {
            console.log("setActiveMessagesRedux: ", action.payload);
            state.activeMessages = action.payload 
        }
    }
  })

export const { setTotalUnreadMessagesRedux,  setConversationsRedux, setActiveMessagesRedux  } = coresSlice.actions
export const selectTotalMessagesState = (state: RootState) => state.messages.totalMessages
export const selectConversationsState = (state: RootState) => state.messages.conversations
export const selectActiveMessagesState = (state: RootState) => state.messages.activeMessages
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