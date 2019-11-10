import React from 'react'
import { Link } from 'react-router-dom'

export default function GameList(props) {
  return (
    <div id="game-list">
      {props.games.map(game => (
        <Link id='game-box' key={game.id} to={`/games/${game.id}`}>
          <img src={game.image_url} alt={game.id} />
          <h3 id='game-name'>{game.name}</h3>
        </Link>
      ))}
    </div>
  )
}
