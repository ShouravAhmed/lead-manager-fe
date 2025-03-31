import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route {...rest} render={(props) => (
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
      )} />
    );
  }
}

export default PrivateRoute;
