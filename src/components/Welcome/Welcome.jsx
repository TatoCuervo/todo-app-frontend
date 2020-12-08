import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import tableIcons from '../../commons/tableIcons/tableIcons';
import { Grid, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../../api/api';
import axios from 'axios';

function Welcome(props) {
  let history = props.history;
  const [loading, setLoading] = useState(true);
  const [iserror, setIserror] = useState(false);
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
        })
        .catch((error) => {
          setLoading(false);
          setIserror(true);
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
    <>
      <Grid container direction='column' alignItems='center' spacing={2}>
        <h3>Welcome {props.username}</h3>
        {loading && <CircularProgress />}
        <MaterialTable
          icons={tableIcons}
          columns={[
            { title: 'id', field: 'id', hidden: true },
            { title: 'Description', field: 'description' },
            { title: 'Done', field: 'done' },
            { title: 'Due Date', field: 'targetDate' },
          ]}
          data={todos}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve);
              }),
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                handleRowAdd(newData, resolve);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                handleRowDelete(oldData, resolve);
              }),
          }}
          options={{
            headerStyle: {
              backgroundColor: '#01579b',
              color: '#FFF',
            },
          }}
          title='TODO List'
        />
        <Button variant='contained' color='primary' onClick={handleLogout}>
          Logout
        </Button>
      </Grid>
      <Snackbar open={iserror} autoHideDuration={2000}>
        <MuiAlert elevation={6} variant='filled' severity='error'>
          Unable to fetch Todo list
        </MuiAlert>
      </Snackbar>
    </>
  );
}

const handleRowUpdate = (newData, oldData, resolve) => {
  console.log('handleRowUpdate');
  resolve();
};

const handleRowAdd = (newData, oldData, resolve) => {
  console.log('handleRowAdd');
  resolve();
};

const handleRowDelete = (newData, oldData, resolve) => {
  console.log('handleRowDelete');
  resolve();
};

const mapStateToProps = (state) => {
  return { username: state.auth.user };
};

export default connect(mapStateToProps, null)(Welcome);
