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
