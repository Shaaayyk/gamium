import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CreateReview from './CreateReview'
import { postReview, getReviews, getOneGame, getOneUser, deleteReview } from '../services/api-helper'
import ReviewList from './ReviewList'
import axios from 'axios';


export default class SingleGame extends Component {
  state = {
    currentGame: null,
    reviews: [],
    user: ''
  }

  destroyReview = async (gameId, reviewId) => {
    await deleteReview(gameId, reviewId)
    this.setState(prevState => ({
      reviews: prevState.reviews.filter(review => {
        return review.id !== reviewId
      })
    }))
  }

  async componentDidMount() {
    await this.setCurrentGame()
    await this.setUser(this.state.currentGame.userId)
    const reviews = await getReviews(this.props.gameId)
    this.setState({
      reviews
    })
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.gameId !== this.props.gameId) {
      this.setCurrentGame()
    }
  }

  setCurrentGame = async () => {
    const response = await axios.get(`http://localhost:3000/games/${this.props.gameId}`)
    const currentGame = response.data
    this.setState({
      currentGame
    })

  }

  createReview = async (userId, gameId, reviewData) => {
    const newReview = await postReview(userId, gameId, reviewData)
    this.setState(prevState => ({
      reviews: [...prevState.reviews, newReview]
    }))
  }

  setUser = async (userId) => {
    const user = await getOneUser(userId)
    this.setState({
      user
    })
  }


  render() {
    window.scrollTo(0, 0)
    const { currentGame } = this.state
    const { currentUser } = this.props;
    const reviews = this.state.reviews.filter(review => (
      review.gameId == currentGame.id
    ))
    return (
      <div id='game-info'>
        {currentGame && (
          <div id='single-game'>
            <h1 id='single-game-title'>{currentGame.name}</h1>
            <div id='single-game-box'>
              <img src={currentGame.image_url} alt={currentGame.name} id='game-pic' />
              <p id='game-description'>{currentGame.description}</p>
            </div>
            <div id='reviews-box'>
              <CreateReview
                currentUser={currentUser}
                gameId={this.props.gameId}
                createReview={this.createReview}
              />
              <ReviewList
                reviews={reviews}
                currentGame={currentGame}
                currentUser={currentUser}
                destroyReview={this.destroyReview}
              />
            </div>
            {
              currentUser.id === currentGame.userId && (
                <div id='buttons'>
                  <Link to={`/game/${currentGame.id}/edit`}><h5 id='edit-game'>Edit Game</h5></Link>
                  <h5 id='delete-game' onClick={() => {
                    this.props.destroyGame(currentUser.id, currentGame.id)
                  }}>
                    Delete Game
                    </h5>
                </div>
              )
            }
          </div>
        )
        }
      </div >
    )
  }
}