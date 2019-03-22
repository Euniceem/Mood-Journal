import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

const Navigation = (props) => {


  return (
    <footer className="navigation-container">

      <div className="data">
        <Link to="/data" className="link"> DATA</Link>
      </div>

      <div className="feed">
        <Link to="/feed" className="link"> FEED </Link>
      </div>

      <div className="calendar">
        <Link to="/calendar" className="link"> CALENDAR </Link>
      </div>

    </footer>

  )
}

export default Navigation;