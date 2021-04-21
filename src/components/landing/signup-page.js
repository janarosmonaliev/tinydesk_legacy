import React, { useRef } from "react";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";

const SignupPage = () => {
  const fullNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cityRef = useRef();

  return (
    <Grid item xs={12} md={6} lg={6}>
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <h1 className="landing-text-black">Create an account</h1>
          <h5 className="landing-text-gray">
            Enter your information below to create a new account.
          </h5>
          <Card variant="outlined">
            <CardContent>
              <form id="signup-page-form">
                <TextField
                  id="sign-page-form-name"
                  fullWidth
                  label="Full name"
                  type="name"
                  inputRef={fullNameRef}
                />
                <TextField
                  id="sign-page-form-username"
                  fullWidth
                  label="Username"
                  type="text"
                  inputRef={usernameRef}
                />
                <TextField
                  id="sign-page-form-email"
                  fullWidth
                  label="Email"
                  type="email"
                  inputRef={emailRef}
                />
                <TextField
                  id="sign-page-form-password"
                  fullWidth
                  label="Password"
                  type="password"
                  inputRef={passwordRef}
                  autoComplete="current-password"
                />
                <TextField
                  id="sign-page-form-city"
                  select
                  fullWidth
                  label="Current city"
                  inputRef={cityRef}
                >
                  <MenuItem key="Seoul" value="Seoul">
                    Seoul
                  </MenuItem>
                  <MenuItem key="Incheon" value="Incheon">
                    Incheon
                  </MenuItem>
                </TextField>
              </form>

              <Button
                variant="contained"
                color="primary"
                disableElevation
                disableTouchRipple
                // onClick={handleLogin}
                href="home"
              >
                Create an account
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

export default SignupPage;
