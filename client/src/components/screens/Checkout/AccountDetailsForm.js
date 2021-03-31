import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';

export default function AccountDetailsForm() {

    // const { values, handleChange } = this.props;
    return (
        <form>
            <Grid container alignItems="flex-end" spacing={2}>
                <Paper style={{ padding: 16 }}>
                <Grid item xs={6}>
                    <TextField
                        id="firstName"
                        label="Full Name"
                        defaultValue=" "
                        type="text"
                    />

                    {/* <Field
                        fullWidth
                        required
                        name="firstName"
                        component={TextField}
                        type="text"
                        label="First Name"
                    /> */}
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="LastName"
                        label="Last Name"
                        defaultValue=" "
                        type="text"
                    />
                    {/* <Field
                        fullWidth
                        required
                        name="lastName"
                        component={TextField}
                        type="text"
                        label="Last Name"
                    /> */}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="Email"
                        label="Email"
                        defaultValue=" "
                        type="text"
                    />
                    {/* <Field
                        name="email"
                        fullWidth
                        required
                        component={TextField}
                        type="email"
                        label="Email"
                    /> */}
                </Grid>
                </Paper>

            </Grid>
        </form>

        );
} 
