import { configureStore } from '@reduxjs/toolkit'

import coreReducer from './coreReducer';
import messagesReducer from './messagesReducer';

export const store = configureStore({
    reducer: {
        core: coreReducer,
        messages: messagesReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch