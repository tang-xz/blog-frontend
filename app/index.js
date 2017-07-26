import React from 'react'
import ReactDOM from 'react-dom'
import Root from './router'

import { AppContainer } from 'react-hot-loader'


ReactDOM.render(
  <AppContainer>
    <Root/>
  </AppContainer>,
  document.getElementById('app')
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router', () => {
    const NextApp = require('./router').default
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('app')
    )
  })
}