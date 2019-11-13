import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getUserGames } from '../services/api-helper'

export default class UserProfile extends Component {
  state = {
    userGames: []
  }

  componentDidMount() {
    this.setUserGames(this.props.userId)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.gameId !== this.props.gameId) {
      this.setUsergames()
    }
  }

  setUserGames = async (userId) => {
    const userGames = await getUserGames(userId)
    console.log(userGames)
    this.setState({ userGames })
  }


  render() {
    return (
      <div id='user-game-list'>
        {
          this.state.userGames.map(game => (
            <>
              <h1 id='profile-user'>username</h1>
              <Link id='game-box' key={game.id} to={`/games/${game.id}`}>
                <img src={game.image_url} alt={game.id} />
                <h3 id='game-name'>{game.name}</h3>
              </Link>
            </>
          ))
        }
      </div >
    )
  }
}