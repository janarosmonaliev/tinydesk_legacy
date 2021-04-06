import { Grid } from "@material-ui/core";
import React from "react";
import LoginBox from "./LoginBox";
import Side from "./Side";
import LandingNavBar from "./landing-navbar";

const Login = () => {
  return (
    <>
      <LandingNavBar />
      <Grid container style={{ height: "80vh" }} alignItems="center">
        <LoginBox></LoginBox>
        <Side></Side>
      </Grid>
    </>
  );
};

export default Login;
