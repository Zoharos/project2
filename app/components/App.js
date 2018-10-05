import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import List from './List';
import Home from './Home';
import Estate from './Estate';
import { PrivateRoute } from './MaterialComponents';


export default function App(props) {

    const { pokemon } = props;

    return (
        <div className="imgbox">
            <Switch>
                <Route exact path="/" component={Home} /> 
                <PrivateRoute exact path="/estate" component={Estate} />
                <Route path="/pokemon/ability/:ability" render={(location) => (<List pokemon={pokemon.list} location={location} />)} />
            </Switch>
        </div>
    )
};
