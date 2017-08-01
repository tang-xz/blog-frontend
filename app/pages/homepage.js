import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

export default class Homepage extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Homepage</Link></li>
          <li><Link to="/login">logout</Link></li>
          <li><Link to="/no_match">no match</Link></li>
        </ul>
      </div>
    )
  }
}