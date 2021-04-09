import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccountDetailsForm from './AccountDetailsForm';
import PickupMethodForm from './PickupMethodForm';
import BillingForm from './BillingForm';
// import OrderReview from '../../../assets/Checkout_imgs/OrderReview';
import guy from "../../../assets/Checkout_imgs/OrderReview.jpg";
import {  Image } from "grommet";
import Grid from '@material-ui/core/Grid';
import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),

    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    stepper: {
        alignItems: 'flex-start',
    }
}));


function getSteps() {
    return ['Account Details', 'Delivery/Pickup Method', 'Billing Information', 'Review Order'];
}


function getStepContent(step) {
    switch (step) {
        case 0:
            return (
                <AccountDetailsForm/>
            )
        case 1:
            return (
                <PickupMethodForm/>
            )
        case 2:
            return (
                <BillingForm/>
            )
        case 3:
            return (

                    <Image fit="contain" style={{ width: '100%', height: '80%' }} src={guy} />
            )
        default:
            return 'Unknown step';
    }
}


export default function VerticalLinearStepper() {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const theme = createMuiTheme({
        palette: {
            primary: {
                light: '#fe838b',
                main: '#FE646F',
                dark: '#b1464d',
                contrastText: '#fff',
            },
            secondary: {
                light: '#fe838b',
                main: '#FE646F',
                dark: '#b1464d',
                contrastText: '#000',
            },
        },
    });

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>

            <Stepper className={classes.appbar} activeStep={activeStep} orientation="vertical"  >
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel><Typography variant="h6"><b>{label}</b></Typography></StepLabel>
                        <StepContent>
                            {getStepContent(index)}
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (

                    <Grid style={{ padding: 20 }} item >
                        <Paper square elevation={5} className={classes.resetContainer}>
                            <Grid style={{ padding: 20 }} container justify="center" spacing={3}>
                                <Grid style={{ padding: 20 }} item >

                                    <Grid justify="center" style={{ padding: 10 }}item xs={12}>

                                        <Typography align="center" variant="h6">
                                            <Box color="#FE646F">
                                                Your order has been placed !
                                            </Box>
                                        </Typography>
                                    </Grid>

                                    <Grid justify="center" style={{ padding: 10 }}item xs={12}>

                                        <Typography align="center" variant="subtitle1">
                                            <Box fontWeight="fontWeightBold">
                                                Confirmation Number: 5896 2233 1367 1989    
                                            </Box>
                                        </Typography>

                                    </Grid>

                                    <Grid justify="center" style={{ padding: 10 }} item wrap="wrap"  xs={12}>

                                        <Typography align="center" variant="body2">{"Your order will be ready for curbside pickup at the"}</Typography>
                                        <Typography align="center" variant="body2">{"22 Mill St, Toronto location, April 10th from 1:00 pm to 1:30 pm"}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
            )}
            </ThemeProvider>
        </div>
    );
}
