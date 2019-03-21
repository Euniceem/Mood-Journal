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

import { submitEntry } from '../../actions';

library.add(faArrowLeft);

class MoodEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMood : 'Pick a mood!',
      isEditSlidersOpen : false,
      isNotesOpen : false,
      sliders : {},
      notes : ''
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
    const mood_id = e.target.dataset.mood_id;

    console.log(name, mood_id);

    this.setState({
      selectedMood : name,
      moodId : mood_id
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

  handleNotes = e => {
    const value = e.target.value;

    console.log(value);

    this.setState({
      notes : value
    });
  }

  handleSubmit = e => {
    const { emotions } = this.props;
    let customEmotions = [];
    let defaultEmotions = [];
    
    emotions.forEach(emotion => {
      if (emotion.is_custom) {
        customEmotions.push({
          name : emotion.name,
          custom_emotion_id : emotion.id,
          percent : this.state.sliders[emotion.name] || "0"
         });
      }

      if (!emotion.is_custom) {
        defaultEmotions.push({
          name : emotion.name,
          custom_emotion_id : emotion.id,
          percent : this.state.sliders[emotion.name] || "0"
         });
      }
    });
    
    const submitData = {
      mood_id : this.state.moodId,
      custom_emotions : customEmotions,
      default_emotions : defaultEmotions,
      notes : this.state.notes
     };

    console.log(submitData);

    this.props.onSubmit(submitData);
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
    return (
      <>
        <Header resetStateOnClick={ this.resetStateOnClick } />

        { this.state.isEditSlidersOpen ?
          <EditSliders openEditSliders={ this.openEditSliders } isEditSlidersOpen={ this.state.isEditSlidersOpen } />
          : this.state.isNotesOpen ? 
          <NotesActions selectedMood={ this.state.selectedMood } openNotesAndActions={ this.openNotesAndActions } isNotesOpen={ this.state.isNotesOpen } handleNotes={ this.handleNotes } notes={ this.state.notes } handleSubmit={ this.handleSubmit } />
          :
          <div className="component-mood-entry">
            <div className="select-emotion">
              <ul className="list-emotion">
                <ListEmotion handleSelectMood={ this.handleSelectMood } selectedMood={ this.state.selectedMood } mood="Amazing" mood_id="1" />
                <ListEmotion handleSelectMood={ this.handleSelectMood } selectedMood={ this.state.selectedMood } mood="Good" mood_id="2" />
                <ListEmotion handleSelectMood={ this.handleSelectMood } selectedMood={ this.state.selectedMood } mood="OK" mood_id="3" />
                <ListEmotion handleSelectMood={ this.handleSelectMood } selectedMood={ this.state.selectedMood } mood="Bad" mood_id="4" />
                <ListEmotion handleSelectMood={ this.handleSelectMood } selectedMood={ this.state.selectedMood } mood="Awful" mood_id="5" />
              </ul>
            </div>
      
            <SliderList emotions={ this.props.emotions } handleSliderData={ this.handleSliderData } sliderValues={ this.state.sliders } openEditSliders={ this.openEditSliders } />
      
            <div className="buttons">
              <div className="buttons-wrap">
                <div className="add-more">
                  <button onClick={ this.openNotesAndActions }>+ Notes/Actions</button>
                </div>
      
                <div className="submit-wrap">
                  <button onClick={ this.handleSubmit } disabled={ this.state.selectedMood === 'Pick a mood!' } className={ this.state.selectedMood === 'Pick a mood!' ? "disabled" : "" }>Submit Entry</button>
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
    },
    onSubmit: (data) => {
      return dispatch(submitEntry(data));
    }
  };
}

MoodEntry = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoodEntry);

export default MoodEntry;
