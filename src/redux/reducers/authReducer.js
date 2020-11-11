import { SET_USER, LOG_OUT } from '../actions/types';

const defaultState = {
  loggedIn: false,
  user: null,
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        loggedIn: true,
        user: { ...action.payload },
      };
    case LOG_OUT:
      localStorage.clear();
      return {
        loggedIn: false,
        user: {},
      };
    default:
      return state;
  }
};

export default authReducer;
