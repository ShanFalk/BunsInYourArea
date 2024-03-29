import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import { removeAllLikes } from '../../store/like';
import '../../styles/button.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = async (e) => {
    await dispatch(logout())
    .then(async () => await dispatch(removeAllLikes()))
      .then(() => history.push('/login'))
  };

  return <button className='button yellow' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
