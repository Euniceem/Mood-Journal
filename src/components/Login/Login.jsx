import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from '../../actions';
import Header from '../Header';
import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      emailInput: '',
      passwordInput: ''
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

    this.props.login(user)
      .then(() => {
        this.props.history.push('/feed');
      })
    this.setState({
      emailInput: '',
      passwordInput: ''
    })
  }

  render() {
    return (
      <div className="login-container">
        <Header />
        <div className="title-container">
          <h1 className="title">Login:</h1>
        </div>
        <div className="login-form-container">
          <form className="login-form">
            <div>
              <label name="email"> Email: </label>
            </div>
            <div className="input-container">
              <input className="login-input" type="text" name="email" value={this.state.emailInput} onChange={this.handleInputChange} />
            </div>
            <div>
              <label name="password">Password: </label>
            </div>
            <div className="input-container">
              <input className="login-input" type="password" name="password" value={this.state.passwordInput} onChange={this.handleInputChange} />
            </div>
            <div className="login-btn-container">
              <button className="login-btn" onClick={this.handleSubmit}>LOGIN</button>
            </div>
            <div className="register-link-container">
              <Link to='/register' className="link" >Need an account?</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    user: state.moodJournalReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => {
      return dispatch(login(user))
    }
  }
}

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default Login;