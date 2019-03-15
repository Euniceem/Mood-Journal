import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import './App.scss';

import Navigation from '../../components/Navigation';
import Feed from '../../containers/Feed';
import Data from '../../containers/Data';
import CalendarView from '../../containers/CalendarView';
import Settings from '../../containers/Settings';
import Register from '../../components/Register';
import Login from '../../components/Login';

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

class App extends Component {

  render() {
    let isAuthenticated = this.props.email ? this.props.isLoggedIn : null

    return (
      <div className="App">
        <Router>
          <>
            <Switch>
              <Route exact={true} path='/register' component={Register} />
              <Route exact={true} path='/login' component={Login} />
              <PrivateRoute isAuth={isAuthenticated} exact={true} path='/feed' component={Feed} />
              <PrivateRoute isAuth={isAuthenticated} exact={true} path='/data' component={Data} />
              <PrivateRoute isAuth={isAuthenticated} exact={true} path='/calendar' component={CalendarView} />
              <PrivateRoute isAuth={isAuthenticated} exact={true} path='/settings' component={Settings} />
            </Switch>
            <Navigation />
          </>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.email,
    isLoggedIn: state.loggedIn
  }
}

App = connect(
  mapStateToProps,
)(App);

export default App;
