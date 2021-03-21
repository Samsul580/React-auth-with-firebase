import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import NoMatch from './components/NoMatch/NoMatch';
import Destination from './components/Destination/Destination';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
    return (
        <div className="App">
            <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
                <Router>
                    <Header></Header>
                    <Switch>
                        <Route path="/home">
                            <Home></Home>
                        </Route>
                        <Route path="/login">
                            <Login></Login>
                        </Route>
                        <PrivateRoute path="/destination/:Vehicle">
                            <Destination></Destination>
                        </PrivateRoute>
                        <Route exact path="/">
                            <Home></Home>
                        </Route>
                        <Route path="*">
                            <NoMatch></NoMatch>
                        </Route>
                    </Switch>
                </Router>
            </UserContext.Provider>
        </div>
    );
}

export default App;
