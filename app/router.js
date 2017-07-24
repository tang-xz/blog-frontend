import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import Homepage from 'pages/homepage'
import Login from 'pages/login/index'

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
            <li><Link to="/">Homepage</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>

          <hr/>

          <PrivateRoute exact path="/" component={Homepage}/>
          <Route path="/login" component={Login}/>
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