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
import GuestCheckoutForm from './GuestCheckoutForm';


const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
}));


export default function AccountDetailsForm() {

    
    
    const classes = useStyles();

    const [value, setValue] = React.useState('');
    const [loggedIn, setLoggedIn] = React.useState(false);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };

    const renderLoginMethod = (option) => {
        //if path to image is null, then just display name in card
        if (option === "Login") {

            if (loggedIn === false){
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
                    <GuestCheckoutForm firstName={"Tony"} lastName={"Stark"} email={"tony@starkIndustries.com"} number={"(905)-254-3214"}/>
                );
            }
            
        } else {
            return (
                <GuestCheckoutForm firstName={""} lastName={""} email={""} number={""}/>
            );
        }
    }


    const { register,
        handleSubmit,
        formState: { isSubmitting }} = useForm();

    const onSubmit = data => {
        alert("Login Successful!");
        setLoggedIn(true);
        renderLoginMethod(value);
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
