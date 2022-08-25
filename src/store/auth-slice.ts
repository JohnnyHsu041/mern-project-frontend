import { createSlice } from "@reduxjs/toolkit";

export interface Auth {
    isLoggedIn: boolean;
}

const AuthInitialState: Auth = {
    isLoggedIn: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: AuthInitialState,
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
    },
});

export const AuthAction = authSlice.actions;
