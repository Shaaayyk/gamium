import React, { Component } from 'react';
import './App.css';
import { getAllGames } from './services/api-helper'
import GameList from './components/GameList'

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
      </div>
    );
  }
}

export default App;
