import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Stepper from "./CheckoutStepper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    alignItems: "center",
    background: "#FE646F",
    padding: "5px",
  },
}));

function Checkout(props) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.appbar}>
        <Typography variant="h6">Checkout</Typography>
      </AppBar>
      <Container style={{ marginTop: 10 }}>
        <Stepper></Stepper>
      </Container>
    </div>
  );
}

export default Checkout;
