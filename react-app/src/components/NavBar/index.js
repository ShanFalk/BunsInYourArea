import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';
import './NavBar.css'
import '../../styles/display.css'
import logo from './logo.png'

const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const history = useHistory();

  const onClick = async (e) => {
    e.preventDefault();

    const data = await dispatch(login("demo@aa.io", "password"))
      .then(history.push('/home'))
  }

  return (
    <nav className='nav'>
      <div className='nav-container'>
          <NavLink to='/home' exact={true} className='playfair no-decor logo'>
            <img id='logo-pic' src={logo} alt='the buns in your area logo'/>in your area
          </NavLink>
        {!sessionUser && (
          <>
          <div className='nav-links-container'>
            <button onClick={onClick}>Demo</button>
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
