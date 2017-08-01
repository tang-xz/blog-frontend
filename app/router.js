import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import {auth} from 'tools'

import Homepage from 'pages/homepage'
import Login from 'pages/auth/login'
import Register from 'pages/auth/register'
import NotFound from 'pages/error/404'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isLogin() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>)

export default class Root extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <PrivateRoute exact path="/" component={Homepage}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <PrivateRoute component={NotFound}/>
          </Switch>
        </div>
      </Router>
    )
  }
}