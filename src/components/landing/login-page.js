import React, { useRef, useState } from "react";
import { Grid, Card, CardContent, Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Logo from "../../images/commandt-logo-sm.svg";

const LoginPage = () => {
  // Ref objects for obtaining input values
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = () => {};

  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);

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
              <form id="login-page-form">
                <TextField
                  id="login-page-form-email"
                  fullWidth
                  label="Email"
                  type="email"
                  inputRef={emailRef}
                  error={isEmailError}
                />
                <TextField
                  id="login-page-form-password"
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  inputRef={passwordRef}
                  error={isPasswordError}
                />
              </form>

              <Button
                variant="contained"
                color="primary"
                disableElevation
                disableTouchRipple
                // onClick={handleLogin}
                href="home"
              >
                Log in
              </Button>
            </CardContent>
          </Card>

          <Button
            disableElevation
            disableTouchRipple
            href="/"
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
