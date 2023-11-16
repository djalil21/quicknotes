import { privateRequest, publicRequest } from "../services/api";
import { addNoteStart, addNoteSuccess, deleteNoteStart, deleteNoteSuccess, getNotesFailure, getNotesStart, getNotesSuccess, updateNoteFailure, updateNoteStart, updateNoteSuccess } from "../redux/noteSlice";
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess } from "../redux/userSlice";
import { store } from "../redux/store";

const useNotes = () => {
    const login = async (dispatch, user) => {
        dispatch(loginStart());
        try {
            const res = await publicRequest.post("/auth/login", user);
            dispatch(loginSuccess(res.data));
        } catch (error) {
            dispatch(loginFailure());
        }
    };

    const register = async (dispatch, user) => {
        dispatch(loginStart());
        try {
            const res = await publicRequest.post("/auth/register", user);
            dispatch(loginSuccess(res.data));
        } catch (error) {
            dispatch(loginFailure());
        }
    }

    const logout = async (dispatch) => {
        const refreshToken = store.getState().user.refreshToken;
        dispatch(logoutStart());
        try {
            await privateRequest.post("/auth/logout", { refreshToken });
            dispatch(logoutSuccess());
        } catch (error) {
            dispatch(logoutFailure());
        }
    }

    const getNotes = async (dispatch) => {
        dispatch(getNotesStart());
        try {
            const res = await privateRequest.get("/note");
            dispatch(getNotesSuccess(res.data));
        } catch (error) {
            dispatch(getNotesFailure());
        }
    }

    const addNote = async (dispatch, note) => {
        dispatch(addNoteStart());
        try {
            const res = await privateRequest.post("/note", note);
            dispatch(addNoteSuccess(res.data));
        } catch (error) {
            dispatch(getNotesFailure());
        }
    }

    const deleteNote = async (dispatch, id) => {
        dispatch(deleteNoteStart());
        try {
            await privateRequest.delete(`/note/${id}`);
            dispatch(deleteNoteSuccess({ id }));
        } catch (error) {
            dispatch(getNotesFailure());
        }
    }

    const updateNote = async (dispatch, note) => {
        dispatch(updateNoteStart());
        try {
            const res = await privateRequest.put(`/note/${note.id}`, note);
            dispatch(updateNoteSuccess(res.data));
        } catch (error) {
            dispatch(updateNoteFailure());
        }
    }


    return {
        login,
        register,
        logout,
        getNotes,
        addNote,
        deleteNote,
        updateNote,
    }

}

export default useNotes;

