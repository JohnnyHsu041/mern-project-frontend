import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewPlace from "./places/pages/NewPlace";
import Users from "./user/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpatePlace";
import Auth from "./user/pages/Auth";
import { RootState } from "./store/store";
import { useAuth } from "./shared/hooks/auth-hook";

function App() {
    useAuth();

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    let routes: JSX.Element;

    if (isLoggedIn) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Users />
                </Route>
                <Route path="/:userId/places" exact>
                    <UserPlaces />
                </Route>
                <Route path="/places/new" exact>
                    <NewPlace />
                </Route>
                <Route path="/places/:placeId" exact>
                    <UpdatePlace />
                </Route>
                <Redirect to="/" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Users />
                </Route>
                <Route path="/:userId/places" exact>
                    <UserPlaces />
                </Route>
                <Route path="/auth" exact>
                    <Auth />
                </Route>
                <Redirect to="/auth" />
            </Switch>
        );
    }

    return (
        <>
            <MainNavigation />
            <main>{routes}</main>
        </>
    );
}

export default App;
