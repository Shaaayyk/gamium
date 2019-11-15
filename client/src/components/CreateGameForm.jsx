import React, { Component } from 'react'

export default class CreateGameForm extends Component {
  state = {
    name: '',
    image_url: '',
    description: '',
  }


  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }


  render() {
    return (
      <div className="createMain" id='login-box'>
        <form className="create" id='login-page' onSubmit={(e) => {
          e.preventDefault()
          this.props.createGame(this.props.currentUser.id, this.state)
        }
        }>
          <label htmlFor="name">Name of Game</label>
          <input type="text" id="username" name="name" value={this.state.name} onChange={this.handleChange} />
          <br />
          <label htmlFor="image_url">Image url</label>
          <input type="text" id="username" name="image_url" value={this.state.image_url} onChange={this.handleChange} />
          <br />
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" value={this.state.description} onChange={this.handleChange} />
          <br />
          <button className="createButton">Submit</button>
        </form>
      </div>
    )
  }
}