import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions';
import { Link } from "react-router-dom";
import Header from '../Header';
import './Register.scss';

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      emailInput: "",
      passwordInput: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const value = e.target.value;

    switch (e.target.name) {
      case 'email':
        this.setState({ emailInput: value })
        break;
      case 'password':
        this.setState({ passwordInput: value })
        break;
      default:
        break;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = {};
    user.email = this.state.emailInput;
    user.password = this.state.passwordInput;

    this.props.register(user)
      .then(() => {
        this.props.history.push('/login')
      })

    this.setState({
      emailInput: '',
      passwordInput: ''
    })
  }

  render() {
    return (
      <div className="register-container">
        <Header />
        <h1 className="register-title">Register Here:</h1>

        <div className="register-form-container">
          <form className="register-form">
            <div className="email-label-container">
              <label> Email: </label>
            </div>
            <div>
              <input type="text" name="email" value={this.state.emailInput} onChange={this.handleInputChange} />
            </div>
            <div className="password-label-container">
              <label>Password: </label>
            </div>
            <div>
              <input type="password" name="password" value={this.state.passwordInput} onChange={this.handleInputChange} />
            </div>

            <div className="register-form-btn-container">
              <button className="register-form-btn" onClick={this.handleSubmit}>REGISTER</button>
            </div>

            <div className="login-link-container">
              <Link to='/login' className="link" >Already have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    register: user => {
      return dispatch(register(user))
    }
  }
}

Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default Register;