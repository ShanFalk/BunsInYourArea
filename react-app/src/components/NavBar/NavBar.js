
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import '../../styles/display.css'
import logo from './logo.png'

const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user)

  return (
    <nav className='nav'>
      <div className='nav-container'>
          <NavLink to='/home' exact={true} className='roboto no-decor logo'>
            <img id='logo-pic' src={logo}/>in your area
          </NavLink>
        {!sessionUser && (
          <>
          <div className='nav-links-container'>
            <NavLink to='/login' exact={true} className='no-decor nav-link'>
              Log in
            </NavLink>
            <NavLink to='/sign-up' exact={true} className='no-decor nav-link'>
              Sign up
            </NavLink>
          </div>
          </>
        )}
        {sessionUser && (
          <>
          <NavLink to={`/profile/${sessionUser.id}`} exact={true} className='nav-link'>
            Profile
          </NavLink>
          <LogoutButton />
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
