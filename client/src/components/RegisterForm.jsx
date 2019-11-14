import React, { Component } from 'react'

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
    return (
      <form className="register" onSubmit={(e) => {
        e.preventDefault()
        this.props.handleRegister(this.state)
        this.setState({
          username: '',
          password: ''
        })
      }}>
        <h2>Register</h2>
        <label htmlFor="username">username</label>
        <input
          name="username"
          id="username"
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <label htmlFor="password">password</label>
        <input
          name="password"
          id="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button className="registerButton">Submit</button>
        <br />
        <p>{this.props.authErrorMessage}</p>
      </form>
    )
  }
}
