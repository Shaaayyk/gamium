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
      <div id="createMain">
        <form id="create" onSubmit={(e) => {
          e.preventDefault()
          this.props.createGame(this.props.currentUser.id, this.state)
        }
        }>
          <label htmlFor="name">name</label>
          <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
          <br />
          <label htmlFor="image_url">Image url</label>
          <input type="text" id="image_url" name="image_url" value={this.state.image_url} onChange={this.handleChange} />
          <br />
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" value={this.state.description} onChange={this.handleChange} />
          <br />
          <button id="createButton">Submit</button>
        </form>
      </div>
    )
  }
}