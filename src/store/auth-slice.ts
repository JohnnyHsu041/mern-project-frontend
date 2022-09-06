import { createSlice } from "@reduxjs/toolkit";

export interface Auth {
    isLoggedIn: boolean;
    userId: string | null;
}

const AuthInitialState: Auth = {
    isLoggedIn: false,
    userId: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: AuthInitialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.userId = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.userId = null;
        },
    },
});

export const AuthAction = authSlice.actions;
