import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export default function GuestCheckoutForm({firstName, lastName, email, number}) {

    return (
        <form>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>

                        <Grid item xs={6}>
                            <TextField fullWidth
                                name="firstName"
                                label="First Name"
                                size="small"
                                variant="outlined"
                                defaultValue={firstName}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField fullWidth
                                name="lastName"
                                label="Last Name"
                                size="small"
                                variant="outlined"
                                defaultValue={lastName}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth
                                name="email"
                                label="Email"
                                size="small"
                                variant="outlined"
                                defaultValue={email}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth
                                name="phoneNumber"
                                label="Phone Number"
                                size="small"
                                variant="outlined"
                                defaultValue={number}
                            />
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
}