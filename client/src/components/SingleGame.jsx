import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SingleGame extends Component {
  state = {
    currentGame: null
  }

  componentDidMount() {
    this.setCurrentGame()
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
            {
              currentUser && currentUser.id === currentGame.userId && (
                <>
                  <button onClick={() => {
                    this.props.destroyGame(currentUser.id, currentGame.id)
                  }}>
                    Delete
                    </button>
                  <Link to={`/game/${currentGame.id}/edit`}><button>edit</button></Link>
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