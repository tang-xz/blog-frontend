import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import Homepage from 'pages/homepage'
import Login from 'pages/auth/login'
import Register from 'pages/auth/register'
import NotFound from 'pages/error/404'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

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
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/no_match">no match</Link></li>
          </ul>

          <hr/>

          <Switch>
            <PrivateRoute exact path="/" component={Homepage}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    )
  }
}