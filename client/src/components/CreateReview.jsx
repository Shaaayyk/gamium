import React, { Component } from 'react'

export default class CreateReview extends Component {
  state = {
    review: '',
  }


  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }


  render() {
    console.log(this.props.gameId)
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault()
          this.props.createReview(this.props.gameId, this.state)
        }}>
          <textarea placeholder='Write Review Here' id='review' name='review' value={this.state.review} onChange={this.handleChange}>
          </textarea>
          <button>Submit Review</button>
        </form>
      </div>
    )
  }
}
