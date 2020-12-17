import React from "react"
import Login from "./containers/Login"
import Signup from './containers/Signup'
import HomePage from './containers/HomePage'
import Stash from "./components/Stash";
import Ranking from "./components/Ranking";
import MenuProvider from "react-flexible-sliding-menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
    return (
        <Router>
            <Switch>
            <MenuProvider MenuComponent={Ranking} direction="left" animation="push">
                <Route path='/' exact component={Login} />
                <Route path='/signup' component={Signup} />
                <Route path='/homepage' component={HomePage} />
                <Route path='/stash' component={Stash} />
            </MenuProvider>
            </Switch>
        </Router>
    )
}

export default App

