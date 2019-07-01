import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main'
import Login from '../Login'
import Shipment from '../../Containers/Shipment'

const Dispatcher = () => (
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/login" component={Login}/>
            <Route path="/shipments/:id" component={Shipment}/>
        </Switch>
);

export default Dispatcher;