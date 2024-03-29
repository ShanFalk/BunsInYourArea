// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (payload) => async (dispatch) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    repeat,
    image_url,
    biography,
    city,
    state
  } = payload

  const form = new FormData();

  form.append('firstname', firstname)
  form.append('lastname', lastname)
  form.append('username', username)
  form.append('email', email)
  form.append('password', password)
  form.append('repeat', repeat)
  form.append('image_url', image_url)
  form.append('biography', biography)
  form.append('city', city)
  form.append('state', state)

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: form
    });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

const initialState = { isLoaded:false, user: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { isLoaded:true, user: action.payload }
    case REMOVE_USER:
      return { isLoaded:false, user: null }
    default:
      return state;
  }
}
