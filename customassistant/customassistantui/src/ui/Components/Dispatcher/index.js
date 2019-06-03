import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main'
import Login from '../Login'

const Dispatcher = () => (
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/login" component={Login}/>
        </Switch>
);

export default Dispatcher;