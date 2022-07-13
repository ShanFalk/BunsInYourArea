import React from 'react'
import { NavLink } from 'react-router-dom'

function NotFound() {

  return (
    <div className='error-block'>
        <h1 className='header-404'>404 - Page Not Found!</h1>
        <p>Sorry, we could not find the page you are looking for. Please click below to go back to our splash page.</p>
        <NavLink className="error-nav" exact to="/">Return to Splash</NavLink>
    </div>
  )
}

export default NotFound
