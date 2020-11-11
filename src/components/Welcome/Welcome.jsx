import React from 'react';
import { Grid, Button } from '@material-ui/core';

function Welcome(props) {
  let history = props.history;

  const handleLogout = () => {
    history.push('/login');
  };
  
  return (
    <Grid container direction='column' alignItems='center' spacing={2}>
      <h3>Welcome Username</h3>
      <Button variant='contained' color='primary' onClick={handleLogout}>
        Logout
      </Button>
    </Grid>
  );
}

export default Welcome;
