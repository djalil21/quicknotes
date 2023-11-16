import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = {
                id: action.payload.id,
                username: action.payload.username,
            };
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
        },
        logoutStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        logoutSuccess: (state) => {
            state.currentUser = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
        logoutFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        registerStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = {
                id: action.payload.id,
                username: action.payload.username,
            };
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        registerFailure: (state) => {
            state.loading = false;
            state.error = true;
        }
    },
});

export const { loginStart, loginFailure, loginSuccess, updateAccessToken, logoutStart, logoutSuccess, logoutFailure, registerStart, registerSuccess, registerFailure } =
    userSlice.actions;
export default userSlice.reducer;
