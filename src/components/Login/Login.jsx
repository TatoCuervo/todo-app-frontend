import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/authActions';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { Typography, Button, Card, Grid, CircularProgress, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import api from '../../api/api';

const useStyles = makeStyles({
  card: {
    width: 'fit-content',
    padding: '5em',
  },
});

function Login(props) {
  let history = props.history;
  const classes = useStyles(props);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={Yup.object({
          username: Yup.string().required('Required'),
          password: Yup.string().required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // display loading indicator
          setError(false);
          setSubmitting(true);

          // Call Authenticate API
          axios
            .post(api.AUTHENTICATE, { ...values })
            .then((response) => {
              // decode jwt token
              const token = jwt_decode(response.data.jwtToken);
              const user = _.pick(token, ['sub', 'userId']);

              // store token and update store with user details
              setSubmitting(false);
              setError(false);
              props.setUser(user);
              setErrorMessage('');
              localStorage.setItem(`TOKEN-${token.sub}`, response.data.jwtToken);

              // redirect to welcome page
              history.push('/welcome');
            })
            .catch((err) => {
              setErrorMessage(err.response.data.message);
              setSubmitting(false);
              setError(true);
            });
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Card className={classes.card}>
              <Grid container direction='column' alignItems='center' spacing={2}>
                <Typography variant='h2'>Login</Typography>
                <Grid item>
                  <Field component={TextField} variant='outlined' name='username' label='User' />
                </Grid>
                <Grid item>
                  <Field component={TextField} variant='outlined' type='password' label='Password' name='password' />
                </Grid>
                <Grid item>
                  <Button variant='contained' color='primary' disabled={isSubmitting} type='submit'>
                    Submit
                    {isSubmitting && <CircularProgress />}
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Form>
        )}
      </Formik>
      <Snackbar open={error} autoHideDuration={2000}>
        <MuiAlert elevation={6} variant='filled' severity='error'>
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (username) => dispatch(setUser(username)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
