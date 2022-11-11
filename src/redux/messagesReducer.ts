import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store';


interface Conversation {
    conID: number;
    comID: number;
    postID: number;
    name: string;
    lastMessage: string;
    messages?: String[];
    numberOfUnreadMessages: number;
}

export interface messagesState {
    totalMessages: number;
    conversations: Conversation[];
}

const initialState: messagesState = {
    totalMessages: 0,
    conversations: []
};

export const coresSlice = createSlice({
    name: 'coresSlice',
    initialState: initialState,
    reducers: {
        setTotalUnreadMessagesRedux: (state, action) => {
            state.totalMessages = action.payload;
        },
        setConversationsRedux: (state, action) => {
            state.conversations = action.payload 
        },
        addConversationRedux: (state, action) => { 
            state.conversations.push(action.payload)
        },
        addMessageToConversationRedux: (state, action) => {
            const conID = action.payload.conID;
            const message = action.payload.message;
            const conversation = state.conversations.find(conversation => conversation.conID === conID);
            if (conversation) {
                if (conversation.messages) {
                    conversation.messages.push(message);
                } else {
                    conversation.messages = [message];
                }
                conversation.numberOfUnreadMessages += 1;
                state.totalMessages += 1;
            }
        },
    }
  })

export const { setTotalUnreadMessagesRedux, setConversationsRedux, addConversationRedux, addMessageToConversationRedux  } = coresSlice.actions
export const selectTotalMessagesState = (state: RootState) => state.messages.totalMessages
export const selectConversationsState = (state: RootState) => state.messages.conversations
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
