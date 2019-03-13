import React, { Component } from 'react';
import './App.css';

import MoodEntry from '../MoodEntry';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header /> */}
        <MoodEntry />
      </div>
    );
  }
}

export default App;
