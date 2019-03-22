import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddPreset.scss';

import { addPreset } from '../../actions';

class AddPreset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      presetName : ''
    };
  }

  updateInput = e => {
    const value = e.target.value;

    return this.setState({ presetName : value });
  }

  addToPresets = e => {
    const preset = this.state.presetName;

    return this.props.onUpdate(
      { name : preset },
      this.props.routeOnUpdate
    )
      .then(() => {
        this.props.onReloadData();
      });
  }

  render() {
    return (
      <div className="form-add-preset">
          <div className="form-wrap">
            <input onChange={ this.updateInput } type="text" value={ this.state.presetName } placeholder="Name your preset" />
            <button onClick={ this.addToPresets }>Create Preset</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdate : (presetObject, route) => {
      const actionObject = addPreset(presetObject, route);

      return dispatch(actionObject);
    }
  }
}

AddPreset = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPreset);

export default AddPreset;
