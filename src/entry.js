import React from 'react';
import '../css/app.scss';
import ReactDOM       from 'react-dom';
import Root           from './containers/Root';
import configureStore from './store/configureStore';
import createHistory        from 'history/lib/createBrowserHistory';

const store  = configureStore({}, createHistory);

const node = (
  <Root store={store} />
);

ReactDOM.render(node, document.getElementById('app') );
