import React, { Component } from 'react'

export default class EditGames extends Component {
  state = {
    name: "",
    description: "",
    image_url: ""
  }

  setFormData = () => {
    if (this.props.games.length) {
      const {
        name,
        description,
        image_url,
        ...otherData
      } = this.props.games.find(game => {
        return game.id === parseInt(this.props.gameId)
      })
      this.setState({
        name,
        description,
        image_url
      })
    }
  }

  componentDidMount() {
    this.setFormData();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.posts !== this.props.posts) {
      this.setFormData();
    }
  }

  render() {
    const { name, image_url, description } = this.state;

    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.updateGame(this.props.gameId, this.state);
        }}>
          <label htmlFor="title">title</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="description">description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="image_url">image url</label>
          <input
            type="text"
            name="image_url"
            id="image_url"
            value={image_url}
            onChange={this.handleChange}
          />
          <br />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
