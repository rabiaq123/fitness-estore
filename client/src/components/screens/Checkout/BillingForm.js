import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import { useForm } from 'react-hook-form';


const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
}));


export default function BillingForm() {
    
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const { register,
    handleSubmit,
    errors,
    setError,
    clearError,
    formState: { isSubmitting }} = useForm();

  const onSubmit = data => {
    alert(JSON.stringify(data));
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <Grid container spacing={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth
                    required
                    label="Credit Card Number"
                    name="creditCardNo"
                    size="small"
                    variant="outlined"
                    defaultValue="9925  7365  5632  3627"
                    ref={register({ required: true, maxLength: 22 })}
                  />
                </Grid>
                <Grid item xs={12}>
                  Expiration Date:
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    required
                    label="MM"
                    name="expMonth"
                    size="small"
                    variant="outlined"
                    defaultValue="12"
                    ref={register({ required: true })}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    required
                    label="YYYY"
                    name="expYear"
                    size="small"
                    variant="outlined"
                    defaultValue="2022"
                    ref={register({ required: true })}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    required
                    label="Security Code"
                    name="securityCode"
                    size="small"
                    variant="outlined"
                    type="password"
                    ref={register({ required: true })}
                  />
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </form>
      </Grid>
    </Container>
  );
} 
