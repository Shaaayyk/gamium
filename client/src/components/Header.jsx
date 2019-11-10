import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <nav>
      <Link to='/'>Games</Link>
      {
        props.currentUser ?
          <div>
            <p>Hello, {props.currentUser.username}</p>
            <button onClick={props.handleLogout}>Logout</button>
          </div>
          :
          <Link to='/login'><button>Login/Register</button></Link>
      }
    </nav>
  )
}
