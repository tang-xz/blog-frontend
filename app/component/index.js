import React from 'react';

import css from './index.less';

export default class MyComponent extends React.Component {
  render() {
    return (
      <h1 className={css.title}>My Component</h1>
    );
  }
}