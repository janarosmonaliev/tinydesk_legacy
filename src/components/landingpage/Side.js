import { Grid, Paper } from "@material-ui/core";
import React from "react";
import Image from "../../images/background_image.jpg";

const Side = () => {
  const sideStyle = {
    padding: 20,
    height: "100%",
    width: "45%",
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "absolute",
    right: 0,
  };

  return (
    <Grid>
      <Paper style={sideStyle}></Paper>
    </Grid>
  );
};

export default Side;