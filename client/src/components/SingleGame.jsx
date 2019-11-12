import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CreateReview from './CreateReview'
import { postReview, getReviews, getOneGame, getOneUser } from '../services/api-helper'
import ReviewList from './ReviewList'
import axios from 'axios';


export default class SingleGame extends Component {
  state = {
    currentGame: null,
    reviews: [],
    user: ''
  }

  async componentDidMount() {
    await this.setCurrentGame()
    await this.setUser(this.state.currentGame.userId)
    const reviews = await getReviews(this.props.gameId)
    this.setState({
      reviews
    })
  }
  componentDidUpdate(prevProps) {
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
    const { currentGame } = this.state
    const { currentUser } = this.props;
    const reviews = this.state.reviews.filter(review => (
      review.gameId == currentGame.id
    ))
    return (
      <div id='game-info'>
        {currentGame && (
          <>
            <img src={currentGame.image_url} alt={currentGame.name} id='game-pic' />
            <h1>{currentGame.name}</h1>
            <h3>Description</h3>
            <p>{currentGame.description}</p>
            <Link to={`/users/${this.state.user.id}/games`}>{`${this.state.user.username}`}</Link>

            <ReviewList
              reviews={reviews}
            />
            <CreateReview
              currentUser={currentUser}
              gameId={this.props.gameId}
              createReview={this.createReview}
            />
            {
              currentUser && currentUser.id === currentGame.userId && (
                <>
                  <button onClick={() => {
                    this.props.destroyGame(currentUser.id, currentGame.id)
                  }}>
                    Delete Game
                    </button>
                  <Link to={`/game/${currentGame.id}/edit`}><button>Edit Game</button></Link>
                </>
              )
            }
          </>
        )
        }
      </div >
    )
  }
}