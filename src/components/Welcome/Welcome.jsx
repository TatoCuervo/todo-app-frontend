import React from 'react';
import { Grid, Button } from '@material-ui/core';

function Welcome() {
  return (
    <Grid container direction='column' alignItems='center' spacing={2}>
      <h3>Welcome Username</h3>
      <Button variant='contained' color='primary'>
        Logout
      </Button>
    </Grid>
  );
}

export default Welcome;
