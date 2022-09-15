import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store/store";
import { AuthAction } from "../../store/auth-slice";

let logoutTimer: NodeJS.Timeout;

export const useAuth = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const tokenExpirationDate = useSelector(
        (state: RootState) => state.auth.tokenExpiration
    );

    const dispatch = useDispatch();

    useEffect(() => {
        // auto login
        const storedUserData = JSON.parse(localStorage.getItem("userData")!);

        if (
            storedUserData &&
            storedUserData.token &&
            new Date(storedUserData.expiration) > new Date()
        ) {
            dispatch(
                AuthAction.login({
                    userId: storedUserData.userId,
                    token: storedUserData.token,
                    expiration: new Date(storedUserData.expiration),
                })
            );
        }
    }, [dispatch]);

    useEffect(() => {
        // logout timer
        if (token && tokenExpirationDate) {
            const remainingTime =
                new Date(tokenExpirationDate).getTime() - new Date().getTime();

            logoutTimer = setTimeout(
                dispatch.bind(null, AuthAction.logout()),
                remainingTime
            );
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, tokenExpirationDate, dispatch]);
};
