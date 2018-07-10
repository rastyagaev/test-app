import App from './containers/app';
import React from 'react';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';

import createStore from './state/store';

const store = createStore(window.__PRELOADED_STATE__);

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/app', () => {
    hydrate(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
  });
}
