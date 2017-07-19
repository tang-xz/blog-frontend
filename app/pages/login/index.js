import React from 'react';

import css from './index.css';

export default class Homepage extends React.Component {
  render() {
    return (
      <div className={css.container}>
        Login page
        <div className={css.name}>tangxz</div>
      </div>
    )
  }
}