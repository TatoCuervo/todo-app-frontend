import React from 'react';
import {connect} from 'react-redux'
import { Grid, Button } from '@material-ui/core';

function Welcome(props) {
  let history = props.history;

  const handleLogout = () => {
    history.push('/login');
  };
  
  return (
    <Grid container direction='column' alignItems='center' spacing={2}>
      <h3>Welcome {props.username}</h3>
      <Button variant='contained' color='primary' onClick={handleLogout}>
        Logout
      </Button>
    </Grid>
  );
}

const mapStateToProps = state => {
  return { username: state.auth.user };
};

export default connect(mapStateToProps, null)(Welcome);
