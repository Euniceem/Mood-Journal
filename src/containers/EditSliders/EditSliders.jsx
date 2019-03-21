import React, { Component } from 'react';
// import { connect } from 'react-redux';
import './EditSliders.scss';

import Tag from '../../components/Tag';

class EditSliders extends Component {
  constructor(props) {
    super(props);

    this.state = {

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

            {/* going to have to load these presets in dynamically */}
            <div className="current-presets">
              <Tag className="preset" tagName="Happiness" removeHandler={ this.removePreset } />
              <Tag className="preset" tagName="Stress" removeHandler={ this.removePreset } />
              <Tag className="preset" tagName="Anxiety" removeHandler={ this.removePreset } />
              <Tag className="preset" tagName="Fatigue" removeHandler={ this.removePreset } />
            </div>
          </div>

          <div className="add-presets-wrap">
            <div className="title">Add a Preset</div>

            {/* this will require communication with the back-end as well */}
            <div className="add-presets">
              <Tag className="preset" tagName="Frustration" removeHandler={ this.removePreset } />
              <Tag className="preset" tagName="Irritation" removeHandler={ this.removePreset } />
              <Tag className="preset" tagName="Boredom" removeHandler={ this.removePreset } />
              <Tag className="preset" tagName="Tension" removeHandler={ this.removePreset } />
            </div>
          </div>
        </div>

        {/* the custom feature is pretty much like POSTing a new kanban card to the database */}
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
              <button onClick={ this.updateSliders }>Done</button>
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
