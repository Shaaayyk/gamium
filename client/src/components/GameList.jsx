import React from 'react'
import { Link } from 'react-router-dom'

export default function GameList(props) {
  return (
    <div id="game-list">
      <h1 id='gamium'>Gamium</h1>
      <p id='mission'>"We at Gamium are dedicated to the production and promotion of indie games and game designers. We strive to provide a platform where designers can share products and get live feedback on those products. Our mission is to provide a platform where we can better ourselves and our projects, together."</p>
      {props.games.map(game => (
        <Link id='game-box' key={game.id} to={`/games/${game.id}`}>
          <div id='game-overlay'>
            <h3 id='game-name'>{game.name}</h3>
            <line id='line'></line>
          </div>
          <img src={game.image_url} alt={game.id} id='game-image' />
        </Link>
      ))}
    </div>
  )
}
