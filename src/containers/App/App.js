import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import { generateEntries } from '../../actions';

import MoodEntry from '../MoodEntry';
import Navigation from '../../components/Navigation';
import Feed from '../../containers/Feed';
import Data from '../../containers/Data';
import CalendarView from '../../containers/CalendarView';
import Settings from '../../containers/Settings';
import Register from '../../components/Register';
import Login from '../../components/Login';
import SingleEntryView from '../../containers/SingleEntryView';

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
  constructor(props) {
    super(props)

    this.state = {
      setHomePage: this.props.setHomePage
    }
    this.generateEntries = this.generateEntries.bind(this)
  }

  generateEntries() {
    const start = new Date('2019-01-01 20:19:21.637+00');
    const end = new Date();

    for (let i = 0; i < 216; i++) {
      let entry = {
        mood_id: Math.ceil(Math.random() * 5),
        notes: `Lorem ipsum dolor sit amet`,
        default_activities: [
          Math.ceil(Math.random() * 3),
          Math.ceil(Math.random() * 2 + 3)
        ],
        custom_activities: [Math.ceil(Math.random() * 3)],
        default_emotions: [
          {
            default_emotion_id: 1,
            percent: Math.ceil(Math.random() * 100)
          },
          {
            default_emotion_id: 2,
            percent: Math.ceil(Math.random() * 100)
          },
          {
            default_emotion_id: 3,
            percent: Math.ceil(Math.random() * 100)
          },
          {
            default_emotion_id: 4,
            percent: Math.ceil(Math.random() * 100)
          }
        ],
        custom_emotions: [
          {
            custom_emotion_id: Math.ceil(Math.random() * 2),
            percent: Math.ceil(Math.random() * 100)
          }
        ],
        created_at: new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        )
      };

      this.props.generateEntries(entry);
    }
  }

  render() {
    let isAuthenticated = this.props.email ? this.props.isLoggedIn : null
    return (
      <div className="App">
        <button onClick={this.generateEntries}> asdasd</button>
        <Router>
          <>
            <Switch>
              <Route exact={true} path='/register' component={Register} />
              <Route exact={true} path='/login' component={Login} />
              {this.props.setHomePage === "data" ?
                <PrivateRoute isAuth={isAuthenticated} exact={true} path='/' component={Data} />
                : null}
              {this.props.setHomePage === "feed" || !this.props.setHomePage ?
                <PrivateRoute isAuth={isAuthenticated} exact={true} path='/' component={Feed} />
                : null}
              {this.props.setHomePage === "calendar" ?
                <PrivateRoute isAuth={isAuthenticated} exact={true} path='/' component={CalendarView} />
                : null}
              <PrivateRoute isAuth={isAuthenticated} exact={true} path='/feed' component={Feed} />
              <PrivateRoute isAuth={isAuthenticated} exact={true} path='/data' component={Data} />
              <PrivateRoute isAuth={isAuthenticated} exact={true} path='/calendar' component={CalendarView} />
              <PrivateRoute isAuth={isAuthenticated} exact={true} path='/settings' component={Settings} homePage={this.state.setHomePage} />
              <PrivateRoute isAuth={isAuthenticated} exact={true} path='/entry' component={MoodEntry} />
              <PrivateRoute isAuth={isAuthenticated} exact={true} path='/entry/:id' component={SingleEntryView} />
            </Switch>
            {this.props.isLoggedIn === "true" || this.props.isLoggedIn === true
              ?
              <Navigation setHomePage={this.props.setHomePage} />
              : null
            }
          </>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.email,
    isLoggedIn: state.loggedIn,
    setHomePage: state.setHomePage
  }
}


const mapDispatchToProps = (dispatch) => {
  return {

    generateEntries: entry => {
      generateEntries(entry)

    }
  }
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;
