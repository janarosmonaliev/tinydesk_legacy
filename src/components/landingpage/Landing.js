import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import LandingBox from "./LandingBox";
import Side from "./Side";

const Landing = () => {
  return (
    <Grid container>
      <LandingBox></LandingBox>
      <Side></Side>
    </Grid>
  );
};

export default Landing;
