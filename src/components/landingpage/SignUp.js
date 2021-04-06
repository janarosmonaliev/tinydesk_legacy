import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import SignUpBox from "./SignUpBox";
import Side from "./Side";
import LandingNavBar from "./landing-navbar";
const SignUp = () => {
  return (
    <>
      <LandingNavBar />
      <Grid container style={{ height: "80vh" }} alignItems="center">
        <SignUpBox></SignUpBox>
        <Side></Side>
      </Grid>
    </>
  );
};

export default SignUp;
