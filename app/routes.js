import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home } from './containers';

export default (
	<Route path="/">
    <IndexRoute component={Home} />
    <Route path="viewer" component={App} />
  </Route>
);
