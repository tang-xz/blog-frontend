import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'

import MyComponent from './component';

ReactDOM.render(
  <AppContainer>
    <MyComponent/>
  </AppContainer>,
  document.getElementById('app')
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./component', () => {
    const NextApp = require('./component').default
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('app')
    )
  })
}