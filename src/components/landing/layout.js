import React from "react";
import { Container, Grid, Card, CardContent } from "@material-ui/core";
import { Button } from "@material-ui/core";
import FeatureImage from "../../images/feature-image-3.jpg";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import Logo from "../../images/commandt-logo-sm.svg";

const useStyles = makeStyles({
  landingHeading: {
    marginBottom: "80px",
  },
  textInvertColorBlack: {
    color: "white",
    "@media (min-width: 960px)": {
      color: "black",
    },
  },
  textInvertColorGray: {
    color: "#c7c7c7",
    "@media (min-width: 960px)": {
      color: "#4f4f4f",
    },
  },
  buttonSignInGoogle: {
    marginRight: "16px",
  },
  logoTypeWrapper: {
    marginTop: "16px",
    marginBottom: "40px",
    "& > img": {
      verticalAlign: "middle",
      display: "inline-block",
    },
    "& > span": {
      fontSize: "18px",
      fontWeight: "500",
      verticalAlign: "middle",
      display: "inline-block",
    },
  },
});

const theme = createMuiTheme({
  overrides: {
    // To edit globals of Material Design
    MuiCard: {
      root: {
        borderRadius: "8px",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        "@media (min-width: 960px)": {
          border: "1px solid rgba(0, 0, 0, 0.12)",
        },
      },
    },
    MuiButton: {
      root: {
        marginTop: "16px",
        textTransform: "none",
        paddingLeft: "24px",
        paddingRight: "24px",
      },
      containedPrimary: {
        backgroundColor: "#27AE60",
        ["&:hover"]: {
          backgroundColor: "#219653",
        },
      },
      contained: {
        color: "white",
        backgroundColor: "#333333",
        ["&:hover"]: {
          backgroundColor: "#000000",
        },
      },
      outlined: {
        borderColor: "#333333",
        ["&:hover"]: {
          borderColor: "#000000",
        },
      },
    },
  },
});

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
          style={{ height: "100vh" }}
        >
          <Grid item xs={12} md={6} lg={6}>
            <div className={classes.logoTypeWrapper}>
              <img src={Logo} width="50" height="32" alt="CommandT Logo"></img>{" "}
              <span className={classes.textInvertColorBlack}>CommandT</span>
            </div>
            <h1
              className={
                classes.textInvertColorBlack + " " + classes.landingHeading
              }
            >
              Change the way you organize your bookmarks and use your homepage
            </h1>
            <h5 className={classes.textInvertColorGray}>
              Get started by logging in with your account or sign up with your
              Google account or email.
            </h5>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={5}>
                <Card variant="outlined">
                  <CardContent>
                    <p>
                      Already have an account? Log in with your email below.
                    </p>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      disableTouchRipple
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
                      Are you new here? Sign in with your Google account or
                      create a new account.
                    </p>
                    <Button
                      variant="contained"
                      disableElevation
                      disableTouchRipple
                      className={classes.buttonSignInGoogle}
                    >
                      Sign in with Google
                    </Button>
                    <Button
                      variant="outlined"
                      disableElevation
                      disableTouchRipple
                    >
                      Create an account
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            className={"landing-image-container"}
          >
            <div className="landing-image-wrapper">
              <img src={FeatureImage} className="landing-image"></img>
            </div>
          </Grid>
        </Grid>
      </Container>
      {children}
    </ThemeProvider>
  );
};

export default Layout;
