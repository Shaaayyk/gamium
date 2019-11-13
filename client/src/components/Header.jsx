import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <nav>
      <Link to='/' id='home'>Games</Link>
      {
        props.currentUser ?
          <div id='header'>
            <p>Hello, {props.currentUser.username}</p>
            <Link to='/games/new'>
              <button>Add Game</button>
            </Link>
            <button onClick={props.handleLogout}>Logout</button>
          </div>
          :
          <Link to='/login'><button>Login/Register</button></Link>
      }
    </nav>
  )
}
