import React, { useState } from "react";
import { navigate } from "gatsby";
import {
  Grid,
  Card,
  CardContent,
  Button,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Logo from "../../images/commandt-logo-sm.svg";
import * as auth from "../../api/auth";
const useStyles = makeStyles({
  errorMessage: {
    color: "red",
  },
  progressBar: {},
});
const LoginPage = () => {
  // state variables since I haven't read how to use ref objects yet
  // should aim to use the ref objects that Janar put in here
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState(false);
  const handleChangeEmail = (e) => {
    if (error) {
      setError(false);
    }
    setEmail(e.target.value);
  };
  const handleChangePw = (e) => {
    if (error) {
      setError(false);
    }
    setPassword(e.target.value);
  };
  const login = () => {
    const data = { email: email, password: password };
    auth.login(data, setError, setFilter);
  };
  return (
    <Grid item xs={12} md={6} lg={6}>
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <div className="logotype-wrapper">
            <img src={Logo} width="50" height="32" alt="CommandT Logo"></img>{" "}
            <span className="landing-text-black">CommandT</span>
          </div>
          <h1 className="landing-text-black">Log in</h1>
          <h5 className="landing-text-gray">
            Already have an account? Log in with your email below.
          </h5>

          <Card variant="outlined">
            <CardContent>
              <form id="login-page-form" autoComplete="off">
                <TextField
                  id="login-page-form-email"
                  fullWidth
                  label="Email"
                  type="email"
                  onChange={handleChangeEmail}
                  error={error}
                  disabled={filter}
                />
                <TextField
                  id="login-page-form-password"
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChangePw}
                  error={error}
                  disabled={filter}
                />
              </form>

              {error ? (
                <div className={classes.errorMessage}>
                  Please check your email or password
                </div>
              ) : (
                <></>
              )}
              <Button
                variant="contained"
                color="primary"
                disableElevation
                disableTouchRipple
                onClick={login}
                disabled={filter}
              >
                Log in
              </Button>
            </CardContent>
            {filter ? <LinearProgress /> : <></>}
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

export default LoginPage;
