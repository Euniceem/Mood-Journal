import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadEntries } from '../../actions';
import Header from '../../components/Header';
import FeedList from '../../components/FeedList';
import './Feed.scss';

class Feed extends Component {
  componentDidMount() {
    this.props.loadEntries();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.props.loadEntries();
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="feed-container">
          <h1 className="title">Recent Activity</h1>
          <FeedList entries={this.props.entries} />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    entries: state.entries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadEntries: () => {
      const actionObject = loadEntries();
      return dispatch(actionObject);
    }
  };
};

Feed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default Feed;
