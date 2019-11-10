import React, { Component } from 'react';
import './App.css';
import { getAllGames, } from './services/api-helper'
import GameList from './components/GameList'
import { Route, Link, withRouter } from 'react-router-dom'
import SingleGame from './components/SingleGame'


class App extends Component {
  state = {
    currentUser: '',
    games: [],
    review: [],
  }

  async componentDidMount() {
    const games = await getAllGames()
    console.log(games)
    this.setState({
      games
    })
    console.log(games)
  }











  render() {
    return (
      <div className="App" >
        <GameList games={this.state.games} />

        <Route exact path='/games/:id' render={(props) => (
          <SingleGame
            games={this.state.games}
            gameId={props.match.params.id}
            destroyGame={this.destroyGame}
          />
        )}
        />
      </div>
    )
  }
}

export default withRouter(App);
