import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import UserItem from "./user/components/UserItem";
import Users from "./user/pages/Users";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact></Route>
                <Route path="/user" exact>
                    <Users />
                </Route>
                <Route path="/places/new" exact>
                    <NewPlace />
                </Route>
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
