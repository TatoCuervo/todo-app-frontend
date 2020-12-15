import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import tableIcons from '../../commons/tableIcons/tableIcons';
import { Grid, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../../api/api';
import axios from 'axios';
import { logOut } from '../../redux/actions/authActions';

const useStyles = makeStyles((theme) => ({
  logoutButton: {
    backgroundColor: 'red',
    margin: '25px',
  },
}));

function Welcome(props) {
  let history = props.history;
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [iserror, setIserror] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState();

  useEffect(() => {
    async function getTodos() {
      const token = getToken();
      await axios
        .get(api.TODOS, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          // check if the data is populated
          setToken(token);
          setTodos(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setIserror(true);
          setErrorMessage('Unable to load TODO list');
        });
    }
    if (loading) {
      // if the result is not ready make the call
      getTodos();
    }
  }, []);

  const getToken = () => localStorage.getItem(`TOKEN-${props.user.sub}`);

  const handleRowAdd = (newTodo, resolve) => {
    axios
      .post(api.TODOS, newTodo, { headers: { Authorization: `Bearer ${token}` } })
      .then((_) => {
        let todoToAdd = [...todos];
        todoToAdd.push(newTodo);
        setTodos(todoToAdd);
        resolve();
        setIserror(false);
        setErrorMessage('');
      })
      .catch((error) => {
        setIserror(true);
        setErrorMessage('Unable to add new Todo item');
        resolve();
      });
  };

  const handleRowDelete = (oldTodo, resolve) => {
    axios
      .delete(api.TODOS + '/' + oldTodo.id, { headers: { Authorization: `Bearer ${token}` } })
      .then((_) => {
        const todoDelete = [...todos];
        const index = oldTodo.tableData.id;
        todoDelete.splice(index, 1);
        setTodos([...todoDelete]);
        setIserror(false);
        setErrorMessage('');
        resolve();
      })
      .catch((error) => {
        setIserror(true);
        setErrorMessage(`Unable to add delete Todo ${oldTodo.tableData.id}`);
        resolve();
      });
  };

  const handleRowUpdate = (newTodo, oldTodo, resolve) => {
    axios
      .patch(api.TODOS + '/' + oldTodo.id, newTodo, { headers: { Authorization: `Bearer ${token}` } })
      .then((_) => {
        const updatedTodoList = [...todos];
        const index = oldTodo.tableData.id;
        updatedTodoList[index] = newTodo;
        setTodos([...updatedTodoList]);
        setIserror(false);
        setErrorMessage('');
        resolve();
      })
      .catch((error) => {
        setIserror(true);
        setErrorMessage(`Unable to add update Todo ${oldTodo.id}`);
        resolve();
      });
  };

  const handleLogout = () => {
    props.logOut();
    history.push('/login');
  };

  return (
    <>
      <Grid container direction='column' alignItems='center'>
        <Grid item xs={12}>
          <h1>Welcome {props.user.sub}</h1>
        </Grid>
        {loading && <CircularProgress />}
        <Grid item xs={12}>
          <MaterialTable
            icons={tableIcons}
            columns={[
              { title: 'id', field: 'id', hidden: true },
              { title: 'Description', field: 'description', validate: (rowData) => (rowData.description === '' ? 'Description cannot be empty' : '') },
              { title: 'Due Date', field: 'targetDate', type: 'date', validate: (rowData) => (rowData.description === '' ? 'Date cannot be empty' : '') },
              { title: 'Done', field: 'done', type: 'boolean' },
            ]}
            data={todos}
            editable={{
              onRowUpdate: (newTodo, oldTodo) =>
                new Promise((resolve) => {
                  handleRowUpdate(newTodo, oldTodo, resolve);
                }),
              onRowAdd: (newTodo) =>
                new Promise((resolve) => {
                  handleRowAdd(newTodo, resolve);
                }),
              onRowDelete: (oldTodo) =>
                new Promise((resolve) => {
                  handleRowDelete(oldTodo, resolve);
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
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.logoutButton} variant='contained' color='primary' onClick={handleLogout}>
            Logout
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={iserror} autoHideDuration={2000}>
        <MuiAlert elevation={6} variant='filled' severity='error'>
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut),
  };
};

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
