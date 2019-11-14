import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getUserGames, getOneUser } from '../services/api-helper'

export default class UserProfile extends Component {
  state = {
    userGames: [],
    user: ''
  }

  componentDidMount() {
    this.setUserGames(this.props.userId)
    this.setUser(this.props.userId)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.gameId !== this.props.gameId) {
      this.setUsergames()
    }
  }

  setUserGames = async (userId) => {
    const userGames = await getUserGames(userId)
    this.setState({ userGames })
  }

  setUser = async (userId) => {
    const user = await getOneUser(userId)
    this.setState({
      user
    })
  }


  render() {
    return (
      <div id='user-game-list'>
        <h1 id='profile-user'>{this.state.user.username}</h1>
        {
          this.state.userGames.map(game => (
            <>
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