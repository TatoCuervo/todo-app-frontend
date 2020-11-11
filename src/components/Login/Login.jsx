import React, { useState } from 'react';
import {connect} from 'react-redux'
import {authenticate} from '../../redux/actions/authActions'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Typography, Button, Card, Grid, CircularProgress, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';

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

  return (
    <>
      <Formik
        initialValues={{ user: '', password: '' }}
        validationSchema={Yup.object({
          user: Yup.string().required('Required'),
          password: Yup.string().required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // display loading indicator
          setError(false);
          setSubmitting(true);
          
          // Dispatch authenticate action
          props.authenticate(values.user, values.password);
          history.push('/welcome');

          //TODO: add error handling

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Card className={classes.card}>
              <Grid container direction='column' alignItems='center' spacing={2}>
                <Typography variant='h2'>Login</Typography>
                <Grid item>
                  <Field component={TextField} variant='outlined' name='user' label='User' />
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
          Wrong credentials!
        </MuiAlert>
      </Snackbar>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (username, password) => dispatch(authenticate(username, password))
  }
}

export default connect(null, mapDispatchToProps)(Login);
