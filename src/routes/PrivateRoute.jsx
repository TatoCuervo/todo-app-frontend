import React from 'react';
import {connect} from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props) {
  console.log(props);
    if(props.username !== null)
    {
      return <Route {...props }/>
    } else {
      return <Redirect to='/login' />
    }
}

const mapStateToProps = state => {
  return { username: state.auth.user };
};

export default connect(mapStateToProps, null)(PrivateRoute);