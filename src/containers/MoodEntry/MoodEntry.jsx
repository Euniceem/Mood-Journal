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

    this.state = {
      selectedMood : 'Pick a mood!',
      isEditSlidersOpen : false,
      isNotesOpen : false,
      sliders : {}
    }
  }

  openEditSliders = () => {
    this.setState({ isEditSlidersOpen : !this.state.isEditSlidersOpen });
  }

  openNotesAndActions = () => {
    this.setState({ isNotesOpen : !this.state.isNotesOpen });
  }

  mapEmotionsToSliders = () => {
    console.log(this.props.emotions);
  }

  resetStateOnClick = () => {
    this.setState({
      isEditSlidersOpen : false,
      isNotesOpen : false
    });
  }

  handleSelectMood = e => {
    const name = e.target.dataset.name;

    this.setState({
      selectedMood : name
    });
  }

  handleSliderData = e => {
    const value = e.target.value;
    const field = e.target.dataset.field;

    let newSliders = {};
    newSliders = this.state.sliders;

    newSliders[field] = value;
    
    this.setState({ sliders : newSliders });
  }

  handleSubmit = e => {

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
    console.log(this.props.emotions);
    return (
      <>
        <Header resetStateOnClick={ this.resetStateOnClick } />

        { this.state.isEditSlidersOpen ?
          <EditSliders openEditSliders={ this.openEditSliders } isEditSlidersOpen={ this.state.isEditSlidersOpen } />
          : this.state.isNotesOpen ? 
          <NotesActions openNotesAndActions={ this.openNotesAndActions } isNotesOpen={ this.state.isNotesOpen } handleSubmit={ this.handleSubmit } />
          :
          <div className="component-mood-entry">
            <div className="select-emotion">
              <ul className="list-emotion">
                <ListEmotion handleSelectMood={ this.handleSelectMood } selectedMood={ this.state.selectedMood } mood="Amazing" mood-id="1" />
                <ListEmotion handleSelectMood={ this.handleSelectMood } selectedMood={ this.state.selectedMood } mood="Good" mood-id="2" />
                <ListEmotion handleSelectMood={ this.handleSelectMood } selectedMood={ this.state.selectedMood } mood="OK" mood-id="3" />
                <ListEmotion handleSelectMood={ this.handleSelectMood } selectedMood={ this.state.selectedMood } mood="Bad" mood-id="4" />
                <ListEmotion handleSelectMood={ this.handleSelectMood } selectedMood={ this.state.selectedMood } mood="Awful" mood-id="5" />
              </ul>
            </div>
      
            <SliderList emotions={ this.props.emotions } handleSliderData={ this.handleSliderData } sliderValues={ this.state.sliders } openEditSliders={ this.openEditSliders } />
      
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
