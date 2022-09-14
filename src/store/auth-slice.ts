import { createSlice } from "@reduxjs/toolkit";

export interface Auth {
    isLoggedIn: boolean;
    token: string | null;
    userId: string | null;
}

const AuthInitialState: Auth = {
    isLoggedIn: false,
    token: null,
    userId: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: AuthInitialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.isLoggedIn = !!action.payload.token;
        },
        logout(state) {
            state.token = null;
            state.isLoggedIn = false;
            state.userId = null;
        },
    },
});

export const AuthAction = authSlice.actions;
