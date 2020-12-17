import React, { useState } from "react"
import Login from "./containers/Login"
import Signup from './containers/Signup'
import HomePage from './containers/HomePage'
import Stash from "./components/Stash";
import Ranking from "./components/Ranking";
import MenuProvider from "react-flexible-sliding-menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {

    const [userid, setUserid] = useState(-1)

    return (
        <div className="main-route-container">
        <Router>
            <Switch>
            <MenuProvider MenuComponent={() => <Ranking userId={userid}/>} direction="left" animation="push">
                <Route path='/' exact component={() => <Login setUserId={setUserid}/>} />
                <Route path='/signup' component={() => <Signup setUserId={setUserid}/>} />
                <Route path='/homepage' component={HomePage} />
                <Route path='/stash' component={Stash} />
            </MenuProvider>
            </Switch>
        </Router>
        </div>
    )
}

export default App

