import { createSlice } from "@reduxjs/toolkit";

export interface Auth {
    isLoggedIn: boolean;
    token: string | null;
    userId: string | null;
    tokenExpiration: string | null;
}

const AuthInitialState: Auth = {
    isLoggedIn: false,
    token: null,
    userId: null,
    tokenExpiration: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: AuthInitialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.isLoggedIn = !!action.payload.token;

            const tokenExpirationDate =
                action.payload.expiration ||
                new Date(new Date().getTime() + 1000 * 60 * 60); // validity: 1 hr from now on

            state.tokenExpiration = tokenExpirationDate;

            localStorage.setItem(
                "userData",
                JSON.stringify({
                    userId: action.payload.userId,
                    token: action.payload.token,
                    expiration: tokenExpirationDate.toISOString(),
                })
            );
        },
        logout(state) {
            state.token = null;
            state.isLoggedIn = false;
            state.userId = null;
            state.tokenExpiration = null;
            localStorage.removeItem("userData");
        },
    },
});

export const AuthAction = authSlice.actions;
