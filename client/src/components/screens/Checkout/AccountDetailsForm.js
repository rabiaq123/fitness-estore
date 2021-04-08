import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
}));


export default function AccountDetailsForm() {
    
  const classes = useStyles();

  const [value, setValue] = React.useState('');
  const handleRadioChange = (event) => {
      setValue(event.target.value);
      console.log("event.target.value =", event.target.value);
  };

  const renderLoginMethod = (option) => {
      //if path to image is null, then just display name in card
      if (option === "Login") {
          return (
              <form onSubmit={handleSubmit(onSubmit)}>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField fullWidth
                          name="email"
                          ref={register({ required: true, maxLength: 20 })}
                          label="Email"
                          size="small"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Password"
                          name="password"
                          size="small"
                          type="password"
                          variant="outlined"
                          ref={register({ required: true })}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Button color="secondary" disabled={isSubmitting} fullWidth type="submit" variant="contained">
                      Log in
                    </Button>
                  </Grid>
                </Grid>
              </form>
          );
      } else {
        return (
          <form>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField fullWidth
                          name="firstName"
                          ref={register({ required: true, maxLength: 20 })}
                          label="First Name"
                          size="small"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField fullWidth
                          name="lastName"
                          ref={register({ required: true, maxLength: 20 })}
                          label="Last Name"
                          size="small"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth
                          name="email"
                          ref={register({ required: true, maxLength: 20 })}
                          label="Email"
                          size="small"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth
                          name="phoneNumber"
                          ref={register({ required: true, maxLength: 20 })}
                          label="Phone Number"
                          size="small"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                </Grid>
            </Grid>
          </form>
        );
      }
    }

    const { register,
      handleSubmit,
      errors,
      setError,
      clearError,
      formState: { isSubmitting }} = useForm();

    const onSubmit = data => {
      alert("Login Successful!");
    };

    return (
      <Container className={classes.container} maxWidth="sm">
        <Grid container spacing={3}>
          <Grid container xs={12}>
            <FormControl component="fieldset" >
              <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                <div>
                  <FormControlLabel value="GuestCheckout" control={<Radio />} label="Guest Checkout" />
                  <FormControlLabel value="Login" control={<Radio />} label="Login" />
                </div>
              </RadioGroup>
            </FormControl>
          </Grid>

          {renderLoginMethod(value)}

        </Grid>
      </Container>
    );
} 
