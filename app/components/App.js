import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import List from './List';
import Home from './Home';
import Estate from './Estate';
import { PrivateRoute } from './MaterialComponents';


export default function App(props) {

    return (
        <div className="imgbox">
            <Switch>
                <Route exact path="/" component={Home} /> 
                <PrivateRoute exact path="/estate" component={Estate} />
            </Switch>
        </div>
    )
};
