import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

const Navigation = (props) => {


  return (
    <div className="navigation-container">

      <div className="data">
        <Link to="/data" className="link"> DATA</Link>
      </div>

      <div className="feed">
        <Link to="/feed" className="link"> FEED </Link>
      </div>

      <div className="calender">
        <Link to="/calender" className="link"> CALENDER </Link>
      </div>

    </div>

  )
}

export default Navigation;