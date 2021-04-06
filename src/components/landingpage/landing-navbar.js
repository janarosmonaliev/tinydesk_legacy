import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Image from "../../images/logo.svg";
const navBarStyle = {
  margin: "30px 0px 30px 30px",
};
const LandingNavBar = () => {
  return (
    <Grid item lg={6} xs={12} container alignItems="center" style={navBarStyle}>
      <img src={Image} />
      <Typography variant="h4" style={{ paddingLeft: "20px" }}>
        <b>Command T</b>
      </Typography>
    </Grid>
  );
};

export default LandingNavBar;
