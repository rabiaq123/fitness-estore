import React from "react";
import { Button, Link, Grid, TextField } from "@material-ui/core"
import { Image } from "grommet";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import loggedIn from '../../state/actions/loginAction.js';
import loginPopup from '../../state/actions/loginPopupAction';

import guy from '../../../assets/fitnova_fist.png'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


export default function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const routeChange = () => {
    if (password === "password") {
      dispatch(loggedIn());
      dispatch(loginPopup());

      let path = ``; 
      history.push(path);
      
    } else {
      setIsValid(false);
    }
  };

  document.title = "User Login";

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#fe838b",
        main: "#FE646F",
        dark: "#b1464d",
        contrastText: "#fff",
      },
      secondary: {
        light: "#fe838b",
        main: "#FE646F",
        dark: "#b1464d",
        contrastText: "#000",
      },
    },
  });

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);
  var inputFields;

  if (isValid) {
    inputFields = (
      <div>
        <TextField
          required
          id="outlined-required"
          label="Email"
          defaultValue=""
          variant="outlined"
          style={{ marginTop: "50px", width: "400px" }}
          onChange={(event) => setEmail(event.target.value)}
        />{" "}
        <br />
        <TextField
          required
          id="filled-password-input"
          label="Password"
          type="password"
          variant="outlined"
          style={{ marginTop: "10px", width: "400px" }}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
    );
  } else {
    inputFields = (
      <div>
        <TextField
          error
          label="Email"
          defaultValue={email}
          variant="outlined"
          style={{ marginTop: "50px", width: "400px" }}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />

        <TextField
          error
          label="Password"
          defaultValue={password}
          type="password"
          variant="outlined"
          helperText="Invalid Credentials"
          style={{ marginTop: "10px", width: "400px" }}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
    );
  }

  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <h1 style={{ color: "#FE646F", marginTop: "100px", fontSize: "60px" }}>
          Welcome
        </h1>
        <Image fit="contain" src={guy} style={{ marginTop: "20px" }} />

        {inputFields}

        <ThemeProvider theme={theme}>
          <Button
            label="Login"
            variant="contained"
            color="primary"
            borderRadius={500}
            style={{ marginTop: "30px" }}
            onClick={() => routeChange()}
          >
            Login
          </Button>
        </ThemeProvider>

        <Link
          component="button"
          variant="body2"
          color="black"
          style={{ marginTop: "30px" }}
          onClick={() => {
            alert("Take me to reset password"); //not going to happen
          }}
        >
          Forgot your password?
        </Link>
        <br />

        <Link
          component="button"
          variant="body2"
          style={{ marginBottom: "100px" }}
          color="black"
          onClick={() => {
            alert("Take me to register"); //not going to happen
          }}
        >
          Don’t have an account? Sign up!
        </Link>
        <br />
      </Grid>
    </div>
  );
}
