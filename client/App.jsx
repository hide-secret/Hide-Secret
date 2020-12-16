import React from "react"
import Login from "./containers/Login"
import Signup from './containers/Signup'
import HomePage from './containers/HomePage'
import Stash from "./components/Stash";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/signup' component={Signup} />
                <Route path='/homepage' component={HomePage} />
                <Route path='/stash' component={Stash} />
            </Switch>
        </Router>
    )
}

export default App

