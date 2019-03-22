import React, { Component } from 'react';
// import { connect } from 'react-redux';
import './EditSliders.scss';

import EntryList from '../../components/EntryList';

class EditSliders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emotions : this.props.emotions
    };
  }

  updateSliders = () => {
    // call an action to update the database with the new sliders. update the state in MoodEntry.jsx and cause the page to re-render with the updated sliders.
  }

  render() {
    return (
      <div className="edit-sliders">
        <div className="presets">
          <div className="title">Presets</div>

          <div className="current-wrap">
            <div className="title">Your Presets</div>

            <div className="current-presets">
              <EntryList clickHandler={ this.props.removeSliderHandler } presets={ this.props.selected } className="preset" />
            </div>
          </div>

          <div className="add-presets-wrap">
            <div className="title">Add a Preset</div>

            <div className="add-presets">
              <EntryList clickHandler={ this.props.addSliderHandler } presets={ this.props.unselected } className="preset" />
            </div>
          </div>
        </div>

        <div className="custom-wrap">
          <span className="text">Custom Slider</span>
          <span className="button">+</span>
        </div>

        <div className="buttons-wrap">
          <div className="buttons">
            <div className="close">
              <button onClick={ this.props.openEditSliders }>Close</button>
            </div>
  
            <div className="done">
              <button onClick={ this.props.openEditSliders }>Done</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {};
// }
// 
// const mapDispatchToProps = dispatch => {
//   return {
//     handleUpdateSliders : () => { }
//   }
// }
// 
// EditSliders = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(EditSliders);

export default EditSliders;
