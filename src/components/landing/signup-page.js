import React, { useRef, useState } from "react";
import { navigate } from "gatsby";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import Logo from "../../images/commandt-logo-sm.svg";
import { Autocomplete } from "@material-ui/lab";
import cities from "../../cities";
import * as auth from "../../api/auth";
const useStyles = makeStyles({
  errorMessage: {
    color: "red",
  },
});

const SignupPage = () => {
  // Using states to store the values put on the form fields by the user
  const classes = useStyles();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState({});
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // The function that fires when the user clicks to submit the form
  const register = () => {
    setError(false);
    setDisabled(true);
    const data = {
      name: fullName,
      username: username,
      email: email,
      password: password,
      city: city,
    };
    auth.register(data, setError, setDisabled);
  };
  const handleOnChangeCountry = (e) => {
    setCountry(e.target.value);
    const ele = autoC.current.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];
    if (ele) ele.click();
  };
  const autoC = useRef(null);

  return (
    <Grid item xs={12} md={6} lg={6}>
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <div className="logotype-wrapper">
            <img src={Logo} width="50" height="32" alt="CommandT Logo"></img>{" "}
            <span className="landing-text-black">CommandT</span>
          </div>
          <h1 className="landing-text-black">Create an account</h1>
          <h5 className="landing-text-gray">
            Enter your information below to create a new account.
          </h5>
          <Card variant="outlined">
            <CardContent>
              <form id="signup-page-form" autoComplete="off">
                <TextField
                  id="sign-page-form-name"
                  fullWidth
                  label="Full name"
                  type="name"
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete
                  disabled={disabled}
                />
                <TextField
                  id="sign-page-form-username"
                  fullWidth
                  label="Username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={disabled}
                />
                <TextField
                  id="sign-page-form-email"
                  fullWidth
                  label="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={disabled}
                />
                <TextField
                  id="sign-page-form-password"
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={disabled}
                />

                <TextField
                  id="sign-page-form-city"
                  select
                  fullWidth
                  label="Country"
                  onChange={(e) => handleOnChangeCountry(e)}
                  defaultValue=""
                  disabled={disabled}
                >
                  <MenuItem key="usa" value="usa">
                    United State
                  </MenuItem>
                  <MenuItem key="korea" value="korea">
                    South Korea
                  </MenuItem>
                </TextField>
                <Autocomplete
                  onChange={(e, newValue) => {
                    setCity(newValue);
                  }}
                  options={cities[country]}
                  getOptionLabel={(option) => option.name}
                  ref={autoC}
                  disabled={cities[country] == null || disabled}
                  renderInput={(params) => (
                    <TextField {...params} label="Cities" variant="standard" />
                  )}
                ></Autocomplete>
              </form>
              {error ? (
                <div className={classes.errorMessage}>User already exists!</div>
              ) : (
                <></>
              )}
              <Button
                variant="contained"
                color="primary"
                disableElevation
                disableTouchRipple
                onClick={register}
                disabled={disabled}
              >
                Create an account
              </Button>
            </CardContent>
          </Card>

          <Button
            disableElevation
            disableTouchRipple
            onClick={() => {
              navigate("/");
            }}
            className="landing-text-gray"
          >
            &larr; Back
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignupPage;
