import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class RegisterForm extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  render() {
    window.scrollTo(0, 0)
    return (
      <div id='login-box'>
        <form className="register" id='login-page' onSubmit={(e) => {
          e.preventDefault()
          this.props.handleRegister(this.state)
          this.setState({
            username: '',
            password: ''
          })
        }}>
          <h2 id='form-title'>Register</h2>
          <label htmlFor="username">Username</label>
          <input
            autoFocus
            name="username"
            id="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button className="registerText">Register</button>
          <br />
          <Link className='loginButton' to='/login'>Login</Link>
          <p>{this.props.authErrorMessage}</p>
        </form>
      </div>
    )
  }
}
