import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import bunnyReducer from './bunny';
import reviewReducer from './review';
import likesReducer from './like';
import userReducer from './user';
import conversationReducer from './conversation';
import messageReducer from './message';
import usersReducer from './users';


const rootReducer = combineReducers({
  session,
  bunnies: bunnyReducer,
  reviews: reviewReducer,
  likes: likesReducer,
  user: userReducer,
  conversations: conversationReducer,
  messages: messageReducer,
  users: usersReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
