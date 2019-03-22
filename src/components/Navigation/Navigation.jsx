import React from 'react';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faListAlt,
  faCalendarAlt,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import './Navigation.scss';

library.add(faHome);
library.add(faCalendarAlt);
library.add(faChartLine);
library.add(faListAlt);

const Navigation = props => {
  return (
    <footer className="navigation-container">
      {props.setHomePage === 'calendar' ? (
        <div className="navbar">
          <div className="data">
            <Link to="/data" className="link">
              <FontAwesomeIcon className="fa-icon" icon="chart-line" />
            </Link>
          </div>

          <div id="home" className="calendar">
            <Link to="/calendar" className="link">
              <FontAwesomeIcon className="fa-icon" icon="home" />
            </Link>
          </div>

          <div className="feed">
            <Link to="/feed" className="link">
              <FontAwesomeIcon className="fa-icon" icon="list-alt" />
            </Link>
          </div>
        </div>
      ) : null}

      {props.setHomePage === 'feed' ? (
        <div className="navbar">
          <div className="data">
            <Link to="/data" className="link">
              <FontAwesomeIcon className="fa-icon" icon="chart-line" />
            </Link>
          </div>

          <div id="home" className="feed">
            <Link to="/feed" className="link">
              <FontAwesomeIcon className="fa-icon" icon="home" />
            </Link>
          </div>

          <div className="calendar">
            <Link to="/calendar" className="link">
              <FontAwesomeIcon className="fa-icon" icon="calendar-alt" />
            </Link>
          </div>
        </div>
      ) : null}

      {props.setHomePage === 'data' ? (
        <div className="navbar">
          <div className="feed">
            <Link to="/feed" className="link">
              <FontAwesomeIcon className="fa-icon" icon="list-alt" />
            </Link>
          </div>

          <div id="home" className="data">
            <Link to="/data" className="link">
              <FontAwesomeIcon className="fa-icon" icon="home" />
            </Link>
          </div>

          <div className="calendar">
            <Link to="/calendar" className="link">
              <FontAwesomeIcon className="fa-icon" icon="calendar-alt" />
            </Link>
          </div>
        </div>
      ) : null}

      {props.setHomePage === null ? (
        <div className="navbar">
          <div className="data">
            <Link to="/data" className="link">
              <FontAwesomeIcon className="fa-icon" icon="chart-line" />
            </Link>
          </div>

          <div id="home" className="feed">
            <Link to="/feed" className="link">
              <FontAwesomeIcon className="fa-icon" icon="home" />
            </Link>
          </div>

          <div className="calendar">
            <Link to="/calendar" className="link">
              <FontAwesomeIcon className="fa-icon" icon="calendar-alt" />
            </Link>
          </div>
        </div>
      ) : null}
    </footer>
  );
};

export default Navigation;
