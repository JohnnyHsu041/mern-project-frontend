import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../../store/store";
import classes from "./NavLinks.module.css";
import { AuthAction } from "../../../store/auth-slice";

const NavLinks: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const userId = useSelector((state: RootState) => state.auth.userId);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(AuthAction.logout());
    };

    return (
        <ul className={classes["nav-links"]}>
            <li>
                <NavLink activeClassName={classes.active} to="/" exact>
                    ALL USERS
                </NavLink>
            </li>
            {isLoggedIn && (
                <li>
                    <NavLink
                        activeClassName={classes.active}
                        to={`/${userId}/places`}
                    >
                        MY PLACES
                    </NavLink>
                </li>
            )}
            {isLoggedIn && (
                <li>
                    <NavLink activeClassName={classes.active} to="/places/new">
                        ADD PLACE
                    </NavLink>
                </li>
            )}
            {!isLoggedIn && (
                <li>
                    <NavLink activeClassName={classes.active} to="/auth">
                        AUTHENTICATE
                    </NavLink>
                </li>
            )}
            {isLoggedIn && (
                <li>
                    <button onClick={logoutHandler}>LOGOUT</button>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
