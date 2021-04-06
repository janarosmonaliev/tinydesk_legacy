import { Grid } from "@material-ui/core";
import React from "react";
import LandingBox from "./LandingBox";
import Side from "./Side";
import LandingNavBar from "./landing-navbar";

const Landing = () => {
  return (
    <>
      <LandingNavBar />
      <Grid
        container
        justify="flex-start"
        style={{ height: "80vh" }}
        alignItems="center"
      >
        <LandingBox />

        <Side />
      </Grid>
    </>
  );
};

export default Landing;
