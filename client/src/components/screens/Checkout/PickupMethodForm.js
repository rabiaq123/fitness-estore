import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
    marginTop: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PickupMethodForm() {
  const classes = useStyles();

  const [value, setValue] = React.useState("");
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    console.log("event.target.value =", event.target.value);
  };

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2021-04-09T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [location, setLocation] = React.useState("");

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const [time, setTime] = React.useState("");

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const renderDisplay = (option) => {
    //if path to image is null, then just display name in card
    if (option === "Delivery") {
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
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
              <Button
                color="secondary"
                disabled={isSubmitting}
                fullWidth
                type="submit"
                variant="contained"
                style={{ color: "white" }}
              >
                Log in
              </Button>
            </Grid>
          </Grid>
        </form>
      );
    } else {
      return (
        <form>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={13}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="Location">Location</InputLabel>
                      <Select
                        labelId="Location"
                        id="Location"
                        value={location}
                        onChange={handleLocationChange}
                      >
                        <MenuItem value={"Toronto"}>
                          22 Mill St, Toronto
                        </MenuItem>
                        <MenuItem value={"Milton"}>
                          19 Mavis Rd, Milton
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="pickupDate"
                      label="Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="Time">Time</InputLabel>
                      <Select
                        labelId="Time"
                        id="Time"
                        value={time}
                        onChange={handleTimeChange}
                      >
                        <MenuItem value={"8:00am - 8:30am"}>
                          8:00am - 8:30am
                        </MenuItem>
                        <MenuItem value={"9:00am - 9:30am"}>
                          9:00am - 9:30am
                        </MenuItem>
                        <MenuItem value={"10:30am - 11:00am"}>
                          10:30am - 11:00am
                        </MenuItem>
                        <MenuItem value={"10:00am - 11:30am"}>
                          10:00am - 11:30am
                        </MenuItem>
                        <MenuItem value={"1:00pm - 1:30pm"}>
                          1:00pm - 1:30pm
                        </MenuItem>
                        <MenuItem value={"1:30pm - 2:00pm"}>
                          1:30pm - 2:00pm
                        </MenuItem>
                        <MenuItem value={"2:00pm - 2:30pm"}>
                          2:00pm - 2:30pm
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </form>
      );
    }
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <Grid container spacing={3}>
        <Grid container xs={12}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              value={value}
              onChange={handleRadioChange}
            >
              <div>
                <FormControlLabel
                  value="CurbsidePickup"
                  control={<Radio />}
                  label="Curbside Pickup"
                />
                <FormControlLabel
                  value="Delivery"
                  control={<Radio />}
                  label="Delivery"
                />
              </div>
            </RadioGroup>
          </FormControl>
        </Grid>

        {renderDisplay(value)}
      </Grid>
    </Container>
  );
}
