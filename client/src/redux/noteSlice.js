import { createSlice } from '@reduxjs/toolkit'

const noteSlice = createSlice({
    name: 'note',
    initialState: {
        notes: [],
        loading: false,
        error: false,
    },
    reducers: {
        getNotesStart: (state) => {
            state.loading = true
            state.error = false;
        },
        getNotesSuccess: (state, action) => {
            state.notes = action.payload
            state.loading = false
            state.error = false
        },
        getNotesFailure: (state) => {
            state.loading = false
            state.error = true
        },
        addNoteStart: (state) => {
            state.loading = true
            state.error = false
        },
        addNoteSuccess: (state, action) => {
            state.notes.unshift(action.payload)
            state.loading = false
            state.error = false
        },
        addNoteFailure: (state) => {
            state.loading = false
            state.error = true
        },
        deleteNoteStart: (state) => {
            state.loading = true
            state.error = false
        },
        deleteNoteSuccess: (state, action) => {
            state.notes = state.notes.filter(
                (note) => note.id !== action.payload.id
            )
            state.loading = false
            state.error = false
        },
        deleteNoteFailure: (state) => {
            state.loading = false
            state.error = true
        },
        updateNoteStart: (state) => {
            state.loading = true
            state.error = false
        },
        updateNoteSuccess: (state, action) => {
            state.notes = state.notes.filter(
                (note) => note.id !== action.payload.id
            )
            state.notes.unshift(action.payload)
            state.loading = false
            state.error = false
        },
        updateNoteFailure: (state) => {
            state.loading = false
            state.error = true
        },
    },
}
)

export const { getNotesStart, getNotesSuccess, getNotesFailure, addNoteStart, addNoteSuccess, addNoteFailure, updateNoteStart, updateNoteSuccess, updateNoteFailure, deleteNoteStart, deleteNoteSuccess, deleteNoteFailure } = noteSlice.actions
export default noteSlice.reducer