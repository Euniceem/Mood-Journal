import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { loadEntries } from '../../actions';
import './Feed.scss';

class Feed extends Component {
  constructor(props) {
    super(props)

    //Dummy Data
    this.state = {
      time: "10.00AM",
      date: "March 12 2019",
      emotions: ["happy", "proud", "relaxed"],
      mood: "Great",
      actions: ["hiking", "good time with someone", "travel"],
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mollis nunc sed id semper risus in. Fringilla urna porttitor rhoncus dolor purus non enim praesent. Malesuada fames ac turpis egestas maecenas pharetra convallis. Consectetur adipiscing elit duis tristique sollicitudin nibh sit."
    }
  }

  componentDidMount() {
    this.props.loadEntries()
  }

  render() {
    console.log(this.props)
    return (
      <div className="feed-container">
        <Header />
        <h1 className="title">Feed</h1>
        <div className="entry-container">

          <div className="time-date-container">
            <span className="date">{this.state.date}</span>
            <span className="time">{this.state.time}</span>
          </div>

          <div className="content-container">

            <div className="emotions-main-container">
              <div className="mood">{this.state.mood}</div>
              <div className="emotions-second-container">
                <div className="emotion-title">Emotions:</div>
                <div className="emotion">{this.state.emotions[0]}</div>
                <div className="emotion">{this.state.emotions[1]}</div>
                <div className="emotion">{this.state.emotions[2]}</div>
              </div>
            </div>

            <div className="actions-container">
              <div className="action">{this.state.actions[0]}</div>
              <div className="action">{this.state.actions[1]}</div>
              <div className="action">{this.state.actions[2]}</div>
            </div>

            <div className="notes">Notes: {this.state.notes}</div>

          </div>
        </div>

        <div className="entry-container">

          <div className="time-date-container">
            <span className="date">{this.state.date}</span>
            <span className="time">{this.state.time}</span>
          </div>

          <div className="content-container">

            <div className="emotions-main-container">
              <div className="mood">{this.state.mood}</div>
              <div className="emotions-second-container">
                <div className="emotion-title">Emotions:</div>
                <div className="emotion">{this.state.emotions[0]}</div>
                <div className="emotion">{this.state.emotions[1]}</div>
                <div className="emotion">{this.state.emotions[2]}</div>
              </div>
            </div>

            <div className="actions-container">
              <div className="action">{this.state.actions[0]}</div>
              <div className="action">{this.state.actions[1]}</div>
            </div>

            <div className="notes">Notes: {this.state.notes}</div>

          </div>
        </div>

        <div className="entry-container">

          <div className="time-date-container">
            <span className="date">{this.state.date}</span>
            <span className="time">{this.state.time}</span>
          </div>

          <div className="content-container">

            <div className="emotions-main-container">
              <div className="mood">{this.state.mood}</div>
              <div className="emotions-second-container">
                <div className="emotion-title">Emotions:</div>
                <div className="emotion">{this.state.emotions[0]}</div>
                <div className="emotion">{this.state.emotions[1]}</div>
                <div className="emotion">{this.state.emotions[2]}</div>
              </div>
            </div>

            <div className="actions-container">
              <div className="action">{this.state.actions[0]}</div>
              <div className="action">{this.state.actions[1]}</div>
            </div>

            <div className="notes">Notes: {this.state.notes}</div>

          </div>
        </div>

        <div className="entry-container">

          <div className="time-date-container">
            <span className="date">{this.state.date}</span>
            <span className="time">{this.state.time}</span>
          </div>

          <div className="content-container">

            <div className="emotions-main-container">
              <div className="mood">{this.state.mood}</div>
              <div className="emotions-second-container">
                <div className="emotion-title">Emotions:</div>
                <div className="emotion">{this.state.emotions[0]}</div>
                <div className="emotion">{this.state.emotions[1]}</div>
                <div className="emotion">{this.state.emotions[2]}</div>
              </div>
            </div>

            <div className="actions-container">
              <div className="action">{this.state.actions[0]}</div>
              <div className="action">{this.state.actions[1]}</div>
            </div>

            <div className="notes">Notes: {this.state.notes}</div>

          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadEntries: () => {
      const actionObject = loadEntries()
      return dispatch(actionObject);
    }
  }
}

Feed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default Feed;