import React from 'react'
import { Link } from 'react-router-dom'

export default function GameList(props) {
  return (
    <div id="game-list">
      {props.games.map(game => (
        <Link id='game-box' key={game.id} to={`/games/${game.id}`}>
          <div id='game-overlay'>
            <h3 id='game-name'>{game.name}</h3>
          </div>
          <img src={game.image_url} alt={game.id} id='game-image' />
        </Link>
      ))}
    </div>
  )
}
