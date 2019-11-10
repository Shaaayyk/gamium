import React, { Component } from 'react';
import './App.css';
import { Route, Link, withRouter } from 'react-router-dom';
import { getAllGames, registerUser, loginUser, verifyUser, deleteGame, putGame, postGame } from './services/api-helper'
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import GameList from './components/GameList';
import Header from './components/Header'
import SingleGame from './components/SingleGame'
import EditGames from './components/EditGames';
import CreateGameForm from './components/CreateGameForm'
import UserProfile from './components/UserProfile'

class App extends Component {
  state = {
    currentUser: '',
    games: [],
    reviews: [],
    authErrorMessage: ''
  }

  handleLogin = async (loginData) => {
    const currentUser = await loginUser(loginData);
    if (currentUser.error) {
      this.setState({
        authErrorMessage: currentUser.error
      })
    } else {
      this.setState({ currentUser })
      this.props.history.push('/')
    }
  }

  handleRegister = async (registerData) => {
    const currentUser = await registerUser(registerData)
    if (currentUser.error) {
      this.setState({
        authErrorMessage: currentUser.error
      })
    } else {
      this.setState({ currentUser })
      this.props.history.push('/')
    }
  }
  destroyGame = async (userId, gameId) => {
    await deleteGame(userId, gameId)
    this.setState(prevState => ({
      games: prevState.games.filter(game => {
        return game.id !== gameId
      })
    }))
    this.props.history.push('/games')
  }

  handleLogout = () => {
    this.setState({
      currentUser: null
    })
    localStorage.removeItem('authToken')
  }

  handleVerify = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser })
    }
  }

  updateGame = async (id, gamesData) => {
    const updatedGame = await putGame(id, gamesData);
    this.setState(prevState => ({
      games: prevState.games.map(game => game.id === parseInt(id) ? updatedGame : game)
    }))
    this.props.history.push("/")
  }
  createGame = async (userId, gameData) => {
    const newGame = await postGame(userId, gameData)
    this.setState(prevState => ({
      games: [...prevState.games, newGame]
    }))
    this.props.history.push('/games')
  }

  async componentDidMount() {
    const games = await getAllGames()
    this.setState({
      games
    })
    this.handleVerify();
  }

  render() {
    return (
      <div className="App" >
        <Header currentUser={this.state.currentUser} handleLogout={this.handleLogout} />
        <Route exact path='/' render={() => (
          <GameList games={this.state.games}
            currentUser={this.state.currentUser} />
        )} />
        <Route path='/login' render={() => (
          <LoginForm
            handleLogin={this.handleLogin}
            authErrorMessage={this.state.authErrorMessage}
          />
        )} />
        <Route path='/register' render={() => (
          <RegisterForm
            handleRegister={this.handleRegister}
            authErrorMessage={this.state.authErrorMessage}
          />
        )} />
        <Route exact path='/games/:id' render={(props) => (
          <SingleGame
            games={this.state.games}
            currentUser={this.state.currentUser}
            gameId={props.match.params.id}
            destroyGame={this.destroyGame}
            reviews={this.state.reviews}
          />
        )}
        />
        <Route path='/games/new' render={() => (
          <CreateGameForm
            createGame={this.createGame}
            currentUser={this.currentUser}
          />
        )} />
        <Route path='/game/:id/edit' render={(props) => (
          <EditGames
            games={this.state.games}
            updateGame={this.updateGame}
            gameId={props.match.params.id}
          />
        )} />
        <Route path='/users/:id' render={(props) => (
          <UserProfile
            currentUser={this.state.currentUser}
          />
        )} />
      </div>
    )
  }
}

export default withRouter(App);
