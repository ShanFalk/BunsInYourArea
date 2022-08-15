import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';
import './NavBar.css'
import '../../styles/display.css'
import logo from './logo.png'
import SearchBar from '../Search';

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
        {!sessionUser && (
          <>
          <NavLink to='/' exact={true} className='playfair no-decor logo'>
            <img id='logo-pic' src={logo} alt='the buns in your area logo'/>in your area
          </NavLink>
          <SearchBar />
          <div className='nav-links-container'>
            <button className='button yellow' onClick={onClick}>Demo</button>
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
          <NavLink to='/home' exact={true} className='playfair no-decor logo'>
            <img id='logo-pic' src={logo} alt='the buns in your area logo'/>in your area
          </NavLink>
          <SearchBar />
          <div className='nav-links-container'>
          <NavLink to={`/profile/${sessionUser.id}`} exact={true} className='nav-link no-decor'>
            Profile
          </NavLink>
          <NavLink to='/conversations' className='button blue'>
          <i className="fa-regular fa-envelope"></i>
          </NavLink>
          <LogoutButton />
          </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
