import { SET_USER, LOG_OUT } from './types';

// Action Creators

export const setUser = (userId) => {
  return {
    type: SET_USER,
    payload: userId,
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

// Methods (Async)

export const authenticate = (username, password) => (dispatch) => {
  /*fetch(`http://localhost:4000/login`, {
    //TODO: update API url
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
    .then((res) => res.json())
    .then((data) => {
      //TODO: extract user from JWT token
      //TODO: handle wrong credentials and throw exception
      localStorage.setItem('token', data.token);
      dispatch(setUser(data.user));
    });*/

  //mocked for now
  localStorage.setItem('token', data.token);
  dispatch(setUser(data.user));
};
