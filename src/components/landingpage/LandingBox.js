import {
  Box,
  Button,
  Grid,
  Paper,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import React from "react";
import Logo from "../../images/logo.svg";
import Login from "./Login";
import SignUp from "./SignUp";
import Image from "../../images/logo.svg";
import { Link } from "gatsby";

const LandingBox = () => {
  const landingBoxStyle = {
    marginRight: "5%",
    height: "100%",
    width: "54%",
    position: "absolute",
    left: 0,
  };

  const loginButtonStyle = {
    backgroundColor: "#34eb6b",
    color: "#f5f5f5",
  };

  const googleButtonStyle = {
    backgroundColor: "#181c19",
    color: "#f5f5f5",
    margin: "5px",
    marginLeft: "0px",
  };

  const createAccountButtonStyle = {
    margin: "5px",
    marginLeft: "0px",
  };

  const div1Style = {
    width: "30%",
    marginLeft: "3%",
    padding: "15px",
  };

  const div2Style = {
    width: "40%",
    marginLeft: "3%",
    padding: "15px",
  };

  const h3Style = {
    marginTop: "20%",
    marginLeft: "3%",
    marginRight: "15%",
    marginBottom: "5px",
  };

  const body2Style = {
    marginTop: "15px",
    marginLeft: "3%",
    marginRight: "40%",
    marginBottom: "5%",
  };

  const mainDivStyle = {
    maxWidth: "1000px",
    margin: "0% 30% 0% 20%",
  };

  const logoStyle = {
    marginLeft: "30px",
    marginTop: "30px",
  };

  return (
    <Grid container style={landingBoxStyle}>
      <Paper elevation={0}>
        <img src={Image} style={logoStyle}></img>
        <Grid container style={mainDivStyle}>
          <Typography variant="h3" style={h3Style}>
            Change the way you organize your bookmarks and use your homepage
          </Typography>
          <Typography variant="body2" style={body2Style}>
            Get started by logging in with your account or sign up with your
            Google account or email.
          </Typography>

          <Grid container spacing={24}>
            <Box
              border={1}
              borderColor="grey.300"
              borderRadius="borderRadius"
              style={div1Style}
            >
              <Typography>
                Already have an account? Log in with your email below.
              </Typography>
              <Link to="/login/" style={{ textDecoration: "none" }}>
                <Button variant="contained" style={loginButtonStyle}>
                  Log In
                </Button>
              </Link>
            </Box>
            <Box
              border={1}
              borderColor="grey.300"
              borderRadius="borderRadius"
              style={div2Style}
            >
              <Typography>
                New here? Sign In with Google or create a new account.
              </Typography>
              <Button variant="contained" style={googleButtonStyle}>
                Sign in with Google
              </Button>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button variant="outlined" style={createAccountButtonStyle}>
                  Create an account
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default LandingBox;
