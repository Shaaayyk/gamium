import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CreateReview from './CreateReview'
import { postReview, getReviews } from '../services/api-helper'
import ReviewList from './ReviewList'

export default class SingleGame extends Component {
  state = {
    currentGame: null,
    reviews: []
  }

  async componentDidMount() {
    this.setCurrentGame()
    const reviews = await getReviews(this.props.currentUser, this.props.gameId)
    this.setState({
      reviews
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.gameId !== this.props.gameId) {
      this.setCurrentGame()
    }
  }

  setCurrentGame = () => {
    const currentGame = this.props.games.find(game => {
      return game.id === parseInt(this.props.gameId)
    })
    this.setState({ currentGame })
  }
  createReview = async (userId, gameId, reviewData) => {
    const newReview = await postReview(userId, gameId, reviewData)
    this.setState(prevState => ({
      reviews: [...prevState.reviews, newReview]
    }))
  }



  render() {
    const { currentGame } = this.state
    const { currentUser } = this.props;
    return (
      <div id='game-info'>
        {currentGame && (
          <>
            <h1>{currentGame.name}</h1>
            <h3>Description</h3>
            <p>{currentGame.description}</p>
            <img src={currentGame.image_url} alt={currentGame.name} />
            <Link to={`/users/${currentGame.userId}`}>{`${currentGame.userId}`}</Link>
            <CreateReview
              currentUser={currentUser}
              gameId={this.props.gameId}
              createReview={this.createReview}
            />
            <ReviewList
              reviews={this.state.reviews}
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