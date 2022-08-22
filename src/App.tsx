import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewPlace from "./places/pages/NewPlace";
import UserItem from "./user/components/UserItem";
import Users from "./user/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";

function App() {
    return (
        <BrowserRouter>
            <MainNavigation />
            <main>
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
                    <Redirect to="/" />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;
