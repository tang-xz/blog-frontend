import React from 'react'

const NotFound = ({ location }) => (
  <div>
    <h1>404 not found !</h1>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

export default NotFound;