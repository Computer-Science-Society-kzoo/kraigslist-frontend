import { configureStore } from '@reduxjs/toolkit'

import notesReducer, { addNoteREDUX } from "./notesReducer";
import animationsReducer, { changeHeaderClass } from "./animationsReducer";

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        animations: animationsReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch