import React from 'react';

import Homepage from './pages/homepage';
import Login from './pages/login/index';

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Homepage/>
        <Login/>
      </div>
    )
  }
}