import React, { useState } from 'react';
import SmartButton from '../SmartButton/SmartButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

function Counter() {
  const [count, setCount] = useState(0);

  const updateCount = (value) => setCount(count + value);

  const resetCounter = () => setCount(0);

  return (
    <Box display='flex' flexDirection='column'>
      <SmartButton onClickCallback={updateCount} />
      <SmartButton by={5} onClickCallback={updateCount} />
      <SmartButton by={10} onClickCallback={updateCount} />
      <SmartButton by={-1} onClickCallback={updateCount} />
      <SmartButton by={-5} onClickCallback={updateCount} />
      <SmartButton by={-10} onClickCallback={updateCount} />
      <Typography variant='h1'>{count}</Typography>
      <Button variant='contained' color='secondary' onClick={resetCounter}>
        RESET
      </Button>
    </Box>
  );
}

export default Counter;
