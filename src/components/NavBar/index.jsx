import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.scss'

const NavBar = () => {
  return (
    <div id="nav">
      <Link to="/">
        <span>RiverDB</span>
      </Link>
      <span>
        <Link to="/about">
          <span>About Us</span>
        </Link>
        <Link to="/safetoswim">
          <span>Safe To Swim Map</span>
        </Link>
      </span>
    </div>
  )
}

export default NavBar
