import React from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../images/commandt-logo-sm.svg";
import { navigate } from "gatsby";

const useStyles = makeStyles({
  landingHeading: {
    marginBottom: "80px",
  },
  buttonSignInGoogle: {
    marginRight: "16px",
  },
});

const loginWithGoogle = () => {
  window.open("https://commandt-backend.herokuapp.com/google", "_self");
}

const WelcomePage = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={6} lg={6}>
      <div className="logotype-wrapper">
        <img src={Logo} width="50" height="32" alt="CommandT Logo"></img>{" "}
        <span className="landing-text-black">CommandT</span>
      </div>
      <h1 className={"landing-text-black" + " " + classes.landingHeading}>
        Change the way you organize your bookmarks and use your homepage
      </h1>
      <h5 className="landing-text-gray">
        Get started by logging in with your account or sign up with your Google
        account or email.
      </h5>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={5}>
          <Card variant="outlined">
            <CardContent>
              <p>Already have an account? Log in with your email below.</p>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                disableTouchRipple
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} lg={7}>
          <Card variant="outlined">
            <CardContent>
              <p>
                Are you new here? Sign in with your Google account or create a
                new account.
              </p>
              <Button
                variant="contained"
                disableElevation
                disableTouchRipple
                className={classes.buttonSignInGoogle}
                onClick={loginWithGoogle}
              >
                Sign in with Google
              </Button>
              <Button
                variant="outlined"
                disableElevation
                disableTouchRipple
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Create an account
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WelcomePage;
