import { Grid, Paper } from "@material-ui/core";
import React from "react";
import Image from "../../images/feature-image.jpg";

const Side = () => {
  const sideStyle = {
    position: "fixed",
    width: "50%",
    height: "100%",
    right: "0",
    top: "0",
    overflowX: "hidden",
    overflowY: "scroll",
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return <img src={Image} style={sideStyle} />;
};

export default Side;
