import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import Homepage from 'pages/homepage'
import Login from 'pages/login/index'

const fakeAuth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const NoMatch = ({ location }) => (
  <div>
    <h1>404 not found !</h1>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default class Root extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Homepage22</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/no_match">no match</Link></li>
            <li><Link to="/will-not-match">Will Not Match</Link></li>
            <li><Link to="/also/will/not/match">Also Will Not Match</Link></li>
          </ul>

          <hr/>

          <Switch>
            <PrivateRoute exact path="/" component={Homepage}/>
            <Route path="/login" component={Login}/>
            <Route component={NoMatch}/>
          </Switch>
        </div>
      </Router>
    )
    return (
      <div>
        <Homepage/>
        <Login/>
      </div>
    )
  }
}