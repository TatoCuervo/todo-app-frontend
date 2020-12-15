import { SET_USER, LOG_OUT } from './types';

// Action Creators

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

// Methods (Async --> thunk)
