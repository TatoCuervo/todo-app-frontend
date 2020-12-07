import React, { useEffect, useState } from "react";
import {connect} from 'react-redux'
import { Grid, Button } from '@material-ui/core';
import api from '../../api/api';
import axios from 'axios';

function Welcome(props) {
  let history = props.history;
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      await axios
        .get(api.TODOS)
        .then((response) => {
          // check if the data is populated
          console.log(response.data);
          setTodos(response.data);
          setLoading(false);
        });
    }
    if (loading) {
      // if the result is not ready make the axios call
      getTodos();
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
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
