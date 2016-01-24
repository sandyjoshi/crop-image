import React                 from 'react';
import { Route, IndexRedirect, IndexRoute, Redirect } from 'react-router';
import HomeView              from '../components/homeView';

export default (
  <Route path='/' >
    <IndexRoute component={HomeView} />
    <Redirect from='*' to='/' />
  </Route>
);
