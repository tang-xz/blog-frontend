import React from 'react';

import css from './index.css';

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {

    };
  }
  render() {
    return (
      <div className={css.container}>
        <form>
          <label htmlFor="name">name:</label>
          <input type="text" placeholder="namex"/>
          <br/>
          <label htmlFor="password">password:</label>
          <input type="text" placeholder="password"/>
        </form>
      </div>
    )
  }
}