import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.scss';

import Navigation from '../../components/Navigation';
import Feed from '../../containers/Feed';
import Data from '../../containers/Data';
import CalendarView from '../../containers/CalendarView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <>
            <Switch>
              <Route exact={true} path='/feed' component={Feed} />
              <Route exact={true} path='/data' component={Data} />
              <Route exact={true} path='/calender' component={CalendarView} />
            </Switch>
            <Navigation />
          </>
        </Router>
      </div>
    );
  }
}

export default App;
