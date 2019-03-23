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

import { loadActivities, submitEntry } from '../../actions';

library.add(faArrowLeft);

class MoodEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMood: 'Pick a mood!',
      isEditSlidersOpen: false,
      isNotesOpen: false,
      sliders: {},
      selectedSliders: [],
      unselectedSliders: [],
      selectedActivities: [],
      unselectedActivities: [],
      notes: ''
    };
  }

  openEditSliders = () => {
    this.setState({ isEditSlidersOpen: !this.state.isEditSlidersOpen });
  };

  reloadActivities = () => {
    this.props.onLoad().then(() => {
      const { activities } = this.props;
      let tempArray = [];

      activities.forEach(activity => {
        let foundMatch = false;

        this.state.selectedActivities.forEach(selectedActivity => {
          if (selectedActivity.name === activity.name) {
            foundMatch = true;
          }
        });

        if (!foundMatch) {
          tempArray.push(activity);
        }
      });

      this.setState({
        unselectedActivities: tempArray
      });
    });
  };

  openNotesAndActions = () => {
    this.reloadActivities();
    this.setState({ isNotesOpen: !this.state.isNotesOpen });
  };

  mapEmotionsToSliders = () => {};

  resetStateOnClick = () => {
    this.setState({
      isEditSlidersOpen: false,
      isNotesOpen: false
    });
  };

  addSlider = e => {
    const { selectedSliders, unselectedSliders } = this.state;
    const name = e.target.innerHTML;

    let count = 0;
    let index = 0;

    unselectedSliders.filter(slider => {
      if (slider.name === name) {
        index = count;

        const splicedArray = [...unselectedSliders];

        splicedArray.splice(index, 1);

        return this.setState({
          selectedSliders: [...selectedSliders, slider],
          unselectedSliders: splicedArray
        });
      }

      return count++;
    });
  };

  removeSlider = e => {
    const { selectedSliders, unselectedSliders } = this.state;
    const name = e.target.innerHTML;

    let count = 0;
    let index = 0;

    selectedSliders.filter(slider => {
      if (slider.name === name) {
        const splicedArray = [...selectedSliders];

        index = count;
        splicedArray.splice(index, 1);

        return this.setState({
          selectedSliders: splicedArray,
          unselectedSliders: [...unselectedSliders, slider]
        });
      }

      return count++;
    });
  };

  addActivity = e => {
    const { selectedActivities, unselectedActivities } = this.state;
    const name = e.target.innerHTML;

    let count = 0;
    let index = 0;

    unselectedActivities.filter(activity => {
      if (activity.name === name) {
        index = count;

        const splicedArray = [...unselectedActivities];

        splicedArray.splice(index, 1);

        return this.setState({
          selectedActivities: [...selectedActivities, activity],
          unselectedActivities: splicedArray
        });
      }

      return count++;
    });
  };

  removeActivity = e => {
    const { selectedActivities, unselectedActivities } = this.state;
    const name = e.target.innerHTML;

    let count = 0;
    let index = 0;

    selectedActivities.filter(activity => {
      if (activity.name === name) {
        index = count;

        const splicedArray = [...selectedActivities];

        splicedArray.splice(index, 1);

        return this.setState({
          selectedActivities: splicedArray,
          unselectedActivities: [...unselectedActivities, activity]
        });
      }
      return count++;
    });
  };

  handleSelectMood = e => {
    const name = e.target.dataset.name;
    const mood_id = e.target.dataset.mood_id;

    this.setState({
      selectedMood: name,
      moodId: mood_id
    });
  };

  handleSliderData = e => {
    const value = e.target.value;
    const field = e.target.dataset.field;

    let newSliders = {};
    newSliders = this.state.sliders;

    newSliders[field] = value;

    this.setState({ sliders: newSliders });
  };

  handleNotes = e => {
    const value = e.target.value;

    this.setState({
      notes: value
    });
  };

  handleSubmit = e => {
    const { selectedActivities, selectedSliders } = this.state;
    let customEmotions = [];
    let defaultEmotions = [];
    let customActivities = [];
    let defaultActivities = [];

    selectedActivities.forEach(activity => {
      if (activity.is_custom) {
        customActivities.push(activity.id);
      }

      if (!activity.is_custom) {
        defaultActivities.push(activity.id);
      }
    });

    selectedSliders.forEach(emotion => {
      if (emotion.is_custom) {
        customEmotions.push({
          name: emotion.name,
          custom_emotion_id: emotion.id,
          percent: this.state.sliders[emotion.name] || '0'
        });
      }

      if (!emotion.is_custom) {
        defaultEmotions.push({
          name: emotion.name,
          default_emotion_id: emotion.id,
          percent: this.state.sliders[emotion.name] || '0'
        });
      }
    });

    const submitData = {
      mood_id: this.state.moodId,
      custom_emotions: customEmotions,
      default_emotions: defaultEmotions,
      custom_activities: customActivities,
      default_activities: defaultActivities,
      notes: this.state.notes
    };

    this.props.onSubmit(submitData);
    this.props.history.push('/');
  };

  sortEmotions = () => {
    return this.props.onLoad().then(() => {
      const { emotions } = this.props;

      this.setState({
        unselectedSliders: [],
        selectedSliders: []
      });

      emotions.forEach(emotion => {
        if (emotion.is_custom) {
          this.setState({
            unselectedSliders: [...this.state.unselectedSliders, emotion]
          });
        }
        if (!emotion.is_custom) {
          this.setState({
            selectedSliders: [...this.state.selectedSliders, emotion]
          });
        }
      });
    });
  };

  // doesn't load in time for componentDidMount. i need a safe alternative.
  componentDidMount() {
    // render a list of all existing sliders so we can access them in the state.
    this.setState({
      isEditSlidersOpen: false,
      isNotesOpen: false
    });

    this.props.onLoad().then(() => {
      const { emotions } = this.props;

      emotions.forEach(emotion => {
        if (emotion.is_custom) {
          this.setState({
            unselectedSliders: [...this.state.unselectedSliders, emotion]
          });
        }
        if (!emotion.is_custom) {
          this.setState({
            selectedSliders: [...this.state.selectedSliders, emotion]
          });
        }
      });
    });
  }

  render() {
    return (
      <>
        <Header resetStateOnClick={this.resetStateOnClick} />

        {this.state.isEditSlidersOpen ? (
          <EditSliders
            selected={this.state.selectedSliders}
            unselected={this.state.unselectedSliders}
            addSliderHandler={this.addSlider}
            removeSliderHandler={this.removeSlider}
            sortEmotions={this.sortEmotions}
            openEditSliders={this.openEditSliders}
            isEditSlidersOpen={this.state.isEditSlidersOpen}
          />
        ) : this.state.isNotesOpen ? (
          <NotesActions
            selectedMood={this.state.selectedMood}
            selected={this.state.selectedActivities}
            unselected={this.state.unselectedActivities}
            reloadActivities={this.reloadActivities}
            openNotesAndActions={this.openNotesAndActions}
            isNotesOpen={this.state.isNotesOpen}
            addActivityHandler={this.addActivity}
            removeActivityHandler={this.removeActivity}
            handleNotes={this.handleNotes}
            selectedActivites={this.state.selectedActivities}
            notes={this.state.notes}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          <div className="component-mood-entry">
            <div className="select-emotion">
              <ul className="list-emotion">
                <ListEmotion
                  handleSelectMood={this.handleSelectMood}
                  selectedMood={this.state.selectedMood}
                  mood="Amazing"
                  mood_id="1"
                />
                <ListEmotion
                  handleSelectMood={this.handleSelectMood}
                  selectedMood={this.state.selectedMood}
                  mood="Good"
                  mood_id="2"
                />
                <ListEmotion
                  handleSelectMood={this.handleSelectMood}
                  selectedMood={this.state.selectedMood}
                  mood="OK"
                  mood_id="3"
                />
                <ListEmotion
                  handleSelectMood={this.handleSelectMood}
                  selectedMood={this.state.selectedMood}
                  mood="Bad"
                  mood_id="4"
                />
                <ListEmotion
                  handleSelectMood={this.handleSelectMood}
                  selectedMood={this.state.selectedMood}
                  mood="Awful"
                  mood_id="5"
                />
              </ul>
            </div>

            <SliderList
              emotions={this.state.selectedSliders}
              handleSliderData={this.handleSliderData}
              sliderValues={this.state.sliders}
              openEditSliders={this.openEditSliders}
            />

            <div className="buttons">
              <div className="buttons-wrap">
                <div className="add-more">
                  <button onClick={this.openNotesAndActions}>
                    + Notes/Actions
                  </button>
                </div>

                <div className="submit-wrap">
                  <button
                    onClick={this.handleSubmit}
                    disabled={this.state.selectedMood === 'Pick a mood!'}
                    className={
                      this.state.selectedMood === 'Pick a mood!'
                        ? 'disabled'
                        : ''
                    }
                  >
                    Submit Entry
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    emotions: state.emotions,
    activities: state.activities
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(loadActivities());
      return dispatch(loadEmotions());
    },
    onSubmit: data => {
      return dispatch(submitEntry(data));
    }
  };
};

MoodEntry = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoodEntry);

export default MoodEntry;
