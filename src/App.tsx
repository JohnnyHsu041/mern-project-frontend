import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewPlace from "./places/pages/NewPlace";
import Users from "./user/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpatePlace";
import Auth from "./user/pages/Auth";

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
                    <Route path="/places/:placeId" exact>
                        <UpdatePlace />
                    </Route>
                    <Route path="/auth" exact>
                        <Auth />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;
