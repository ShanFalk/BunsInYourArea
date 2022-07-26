import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NavBar from './components/NavBar';
import UsersList from './components/UsersList';
import User from './components/User';
import BunniesList from './components/Home';
import Profile from './components/Profile';
import { authenticate } from './store/session';
import { getAllBunnies } from './store/bunny';
import { getReviews } from './store/review';
import Bunny from './components/Bunny';
import NotFound from './components/NotFound';
import Splash from './components/Splash';
import Footer from './components/Footer';
import AboutMe from './components/About';
import SearchResults from './components/Search/SearchResults';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllBunnies())
    dispatch(getReviews())
  }, [dispatch])

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <div id='main-content'>
      <Switch>

        <Route path='/' exact={true}>
          <Splash />
        </Route>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
          </ProtectedRoute>

          <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <Route path='/home' exact={true} >
          <BunniesList />
        </Route>

        <Route path='/search' >
          <SearchResults />
        </Route>

        <Route path='/profile/:userId' exact={true}>
          <Profile />
        </Route>

        <Route path='/bunnies/:bunId' exact={true}>
          <Bunny />
        </Route>

        <Route path='/about' exact={true}>
          <AboutMe />
        </Route>

        <Route>
        <NotFound />
        </Route>

      </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
