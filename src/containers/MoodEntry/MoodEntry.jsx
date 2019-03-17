import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './MoodEntry.scss';

import Header from '../../components/Header';
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
      isNotesOpen : false,
      // initial slider values
      happiness : 3,
      stress : 3,
      anxiety : 3,
      fatigue : 3
    };

    this.sliderHappiness = React.createRef();
    this.sliderStress = React.createRef();
    this.sliderAnxiety = React.createRef();
    this.sliderFatigue = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(e) {
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

  handleSubmit(e) {
    console.log(`Made a submission!`);
  }

  componentDidMount() {
    // render a list of all existing sliders so we can access them in the state.
    this.setState({
      isEditSlidersOpen : false,
      isNotesOpen : false
    });
  }

  render() {
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

        <Header />

        { this.state.isEditSlidersOpen ?
          <EditSliders openEditSliders={ this.openEditSliders } isEditSlidersOpen={ this.state.isEditSlidersOpen } />
          : this.state.isNotesOpen ? 
          <NotesActions openNotesAndActions={ this.openNotesAndActions } isNotesOpen={ this.state.isNotesOpen } handleSubmit={ this.handleSubmit } />
          :
          <div className="component-mood-entry">
            <div className="select-emotion">
              <ul className="list-emotion">
                <li>
                  <img src="" alt=""/>
                  <div className="text">Amazing</div>
                </li>
                
                <li>
                  <img src="" alt=""/>
                  <div className="text">Good</div>
                </li>
                
                <li>
                  <img src="" alt=""/>
                  <div className="text">OK</div>
                </li>
                
                <li>
                  <img src="" alt=""/>
                  <div className="text">Bad</div>
                </li>
                
                <li>
                  <img src="" alt=""/>
                  <div className="text">Awful</div>
                </li>
              </ul>
            </div>
      
            <div className="sliders">
              {/* Number of sliders will be loaded onto props and dynamically rendered eventually */}
              <div className="slider-wrap">
                <div className="affect">
                  <span className="field">Happiness:</span> <span className="percentage">{ this.state.happiness }%</span>
                </div>
    
                <input onChange={ this.updateInput } data-field="happiness" ref={ this.happiness } type="range" min="0" max="100" value={ this.state.happiness } className="slider" />
              </div>
      
              <div className="slider-wrap">
                <div className="affect">
                <span className="field">Stress:</span> <span className="percentage">{ this.state.stress }%</span>
                </div>
    
                <input onChange={ this.updateInput } data-field="stress" ref={ this.stress } type="range" min="0" max="100" value={ this.state.stress } className="slider" />
              </div>
      
              <div className="slider-wrap">
                <div className="affect">
                <span className="field">Anxiety:</span> <span className="percentage">{ this.state.anxiety }%</span>
                </div>
    
                <input onChange={ this.updateInput } data-field="anxiety" ref={ this.anxiety } type="range" min="0" max="100" value={ this.state.anxiety } className="slider" />
              </div>
      
              <div className="slider-wrap">
                <div className="affect">
                <span className="field">Fatigue:</span> <span className="percentage">{ this.state.fatigue }%</span>
                </div>
    
                <input onChange={ this.updateInput } data-field="fatigue" ref={ this.fatigue } type="range" min="0" max="100" value={ this.state.fatigue } className="slider" />
              </div>

              <div className="edit-sliders">
                <div className="button-wrap">
                  <button onClick={ this.openEditSliders }>Edit Sliders</button>
                </div>
              </div>
            </div>
      
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

export default MoodEntry;
