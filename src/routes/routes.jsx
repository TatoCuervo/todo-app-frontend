import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../components/Login/Login';
import Welcome from '../components/Welcome/Welcome';
import Error from '../components/Error/Error';

const routes = (
  <Switch>
    <Redirect exact from={'/'} to={'/login'} />
    <Route exact path={'/login'} component={Login} />
    <Route exact path={'/welcome'} component={Welcome} />
    <Route exact path='' component={Error} />
  </Switch>
);
export default routes;
