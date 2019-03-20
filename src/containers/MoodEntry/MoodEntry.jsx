import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadEmotions } from '../../actions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './MoodEntry.scss';

import Header from '../../components/Header';
import ListEmotion from '../ListEmotion';
import SliderList from '../../components/SliderList';
import EditSliders from '../EditSliders';
import NotesActions from '../NotesActions';

library.add(faArrowLeft);

class MoodEntry extends Component {
  constructor(props) {
    super(props);

    // The refs will need to be dynamic later on. When we reach the point of pulling an array of mood sliders from the database, we need to run a .map on that array and create the React refs inside of that function along with the HTML.
    // To prevent the refs from being the same, we need to append the key or id of each mood slider to the ref name.

    this.state = {
      isEditSlidersOpen : false,
      isNotesOpen : false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateInput = e => {
    const value = e.target.value;
    const field = e.target.dataset.field;

    this.setState({ [field] : value });
  }

  openEditSliders = () => {
    console.log(`User wants to edit their sliders!`);

    this.setState({ isEditSlidersOpen : !this.state.isEditSlidersOpen });
  }

  openNotesAndActions = () => {
    console.log(`User toggled entry details page!`);

    this.setState({ isNotesOpen : !this.state.isNotesOpen });
  }

  mapEmotionsToSliders = () => {
    console.log(this.props.emotions);
  }

  resetStateOnClick = () => {
    console.log('RESETTING STATE');

    this.setState({
      isEditSlidersOpen : false,
      isNotesOpen : false
    });
  }

  handleSubmit(e) {
    console.log(`Made a submission!`);
  }

  // doesn't load in time for componentDidMount. i need a safe alternative.
  componentDidMount() {
    // render a list of all existing sliders so we can access them in the state.
    this.setState({
      isEditSlidersOpen : false,
      isNotesOpen : false
    });

    this.props.onLoad();
  }

  render() {
    console.log(this.props);

    return (
      <>
        {/* <div className="header">
          <div className="title-wrap"> */}
            {/* possible switch to React router in the future. pass in Header component with dynamic information on its props. For example, pass in the function that decides what to do when you click the "back" button on props and call it in the header component in an onClick. */}
            {/* <Link to="/feed" className="link">
              <FontAwesomeIcon 
                onClick={ 
                  this.state.isEditSlidersOpen ? this.openEditSliders
                  : this.state.isNotesOpen ? this.openNotesAndActions 
                  : null } 
                className="fa-icon" 
                icon="arrow-left" 
              />
            </Link>
            <span className="title">{ 
                this.state.isEditSlidersOpen ? 'Edit Sliders'
                : this.state.isNotesOpen ? 'Notes & Actions'
                : 'Add an Entry' }
            </span>
          </div>
        </div> */}

        <Header resetStateOnClick={ this.resetStateOnClick } />

        { this.state.isEditSlidersOpen ?
          <EditSliders openEditSliders={ this.openEditSliders } isEditSlidersOpen={ this.state.isEditSlidersOpen } />
          : this.state.isNotesOpen ? 
          <NotesActions openNotesAndActions={ this.openNotesAndActions } isNotesOpen={ this.state.isNotesOpen } handleSubmit={ this.handleSubmit } />
          :
          <div className="component-mood-entry">
            <div className="select-emotion">
              <ul className="list-emotion">
                <ListEmotion mood="Amazing" />
                <ListEmotion mood="Good" />
                <ListEmotion mood="OK" />
                <ListEmotion mood="Bad" />
                <ListEmotion mood="Awful" />
              </ul>
            </div>
      
            <SliderList emotions={ this.props.emotions } />
      
            <div className="buttons">
              <div className="buttons-wrap">
                <div className="add-more">
                  <button onClick={ this.openNotesAndActions }>+ Notes/Actions</button>
                </div>
      
                <div className="submit-wrap">
                  <button onClick={ this.handleSubmit }>Submit Entry</button>
                </div>
              </div>
            </div>
          </div>
        }
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    emotions: state.emotions
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      return dispatch(loadEmotions());
    }
  };
}

MoodEntry = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoodEntry);

export default MoodEntry;
