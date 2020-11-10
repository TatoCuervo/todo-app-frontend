import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import routes from '../../routes/routes';

function App() {
  return (
    <Container className='App'>
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
        {routes}
      </Box>
    </Container>
  );
}

export default App;
