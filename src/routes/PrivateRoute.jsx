import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props) {
  console.log(props);
  const token = getToken(props.user.sub);
  console.log(token);
  if (token !== null) {
    return <Route {...props} />;
  } else {
    return <Redirect to='/login' />;
  }
}

const getToken = (username) => localStorage.getItem(`TOKEN-${username}`);

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps, null)(PrivateRoute);
