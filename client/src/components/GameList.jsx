import React from 'react'
import { Link } from 'react-router-dom'

export default function GameList(props) {
  return (
    <div>
      {props.games.map(game => (
        <Link to={`/games/${game.id}`}><h3>{game.name}</h3>
          <img src={game.image_url} />
        </Link>
      ))}
    </div>
  )
}
