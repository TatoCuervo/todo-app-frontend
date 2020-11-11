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

// Methods (Async --> thunk)

export const authenticate = (username, password) => (dispatch) => {
  console.log('Action authenticate dispatched with ' + username + ' and ' + password);
  //TODO: call authenticate API with axios

  //mocked for now
  //localStorage.setItem('token', 'fake-mocked-token');
  dispatch(setUser(username));
};
