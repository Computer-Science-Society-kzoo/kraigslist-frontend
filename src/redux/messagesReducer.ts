import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from './store';
import { useCookies } from 'react-cookie';


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
    date: string;
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
            state.totalMessages = action.payload.total;
        },
        setConversationsRedux: (state, action) => {


            state.conversations = action.payload 
        },
        setActiveMessagesRedux: (state, action) => {
            console.log(action.payload)
            state.activeMessages = action.payload 
        },
        pushActiveMessageRedux: (state, action) => {
            state.activeMessages = [action.payload, ...state.activeMessages]
        },
        pushNewIncomingMessageRedux: (state, action) => {
            const conID = action.payload.conId;
            const message = action.payload.message;

            state.conversations.forEach(element => {
                if (element.conID === conID) {
                    element.lastMessage = message.message;
                    element.numberOfUnreadMessages += 1;
                    element.date = message.date;
                } 
            });
            state.totalMessages += 1;

        },
        pushMoreMessagesRedux: (state, action) => {
            state.activeMessages = [ ...action.payload, ...state.activeMessages]
        },
        eraseActiveMessagesRedux: (state, action) => {
            state.activeMessages = []
        },
        setNewLastMessageRedux: (state, action) => {
            state.conversations.forEach(conversation => {
                //HERE MIGHT BE A BUG IF THE NEW MESSAGE IS THE SAME AS THE OLD ONE, WE BETTER PASS IDs
                if (conversation.conID === action.payload.conID && conversation.lastMessage !== action.payload.message) {
                    conversation.lastMessage = action.payload.message
                    conversation.date = action.payload.date
                    // Deduct total messages by the number of unread messages
                    state.totalMessages = state.totalMessages - conversation.numberOfUnreadMessages;
                    conversation.numberOfUnreadMessages = 0;
                } else if (conversation.conID === action.payload.conID){
                    // Deduct total messages by the number of unread messages
                    state.totalMessages= state.totalMessages - conversation.numberOfUnreadMessages;
                    conversation.numberOfUnreadMessages = 0;
                }
            })
            state.conversations.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
        }
    }
  })

export const { pushNewIncomingMessageRedux, setNewLastMessageRedux, eraseActiveMessagesRedux, pushMoreMessagesRedux, pushActiveMessageRedux, setTotalUnreadMessagesRedux,  setConversationsRedux, setActiveMessagesRedux  } = coresSlice.actions
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