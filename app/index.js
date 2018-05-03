// React
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';

// Redux
import { syncHistoryWithStore } from 'react-router-redux';

// Styles
import './styles/main.scss';
import './styles/reset.scss';
import './styles/fonts.scss';

import configureStore from './store/configureStore';

import Root from './containers/Root';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
