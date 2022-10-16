export interface NoteState {
    notes: string[];
}

const initialState: NoteState = {
    notes: ["Note 1", "Note 2"]
};

type Action = { type: 'ADD_NOTE', payload: string };

export const notesReducer = (state:NoteState = initialState ,action: Action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            return {
                ...state, notes: [...state.notes, action.payload]
            };
        default:
            return state;
    }
}
