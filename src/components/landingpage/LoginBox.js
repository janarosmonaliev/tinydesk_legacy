import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import React from "react";
import { borders } from "@material-ui/system";
import { Link } from "gatsby";
import Image from "../../images/logo.svg";

const LoginBox = () => {
  const loginButtonStyle = {
    backgroundColor: "#27AE60",
    color: "#f5f5f5",
    width: "150px",
  };

  const textFieldStyle = {
    width: "100%",
    margin: "10px 0px 10px 0px",
    marginLeft: "0px",
  };

  const boxStyle = {
    padding: "30px",
    border: "1px solid #E0E0E0",
    borderRadius: "20px",
  };

  const logoStyle = {
    marginLeft: "30px",
    marginTop: "30px",
  };

  return (
    <Grid item container xs={6} justify="center">
      <Grid
        item
        xs={6}
        container
        direction="row"
        style={{ overflowY: "hidden" }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3">Log in</Typography>
          <br />
          <Box style={boxStyle}>
            <TextField
              id="email"
              placeholder="Email"
              style={textFieldStyle}
            ></TextField>
            <TextField
              id="pw"
              placeholder="Password"
              style={textFieldStyle}
            ></TextField>
            <Grid item container xs={12}>
              <Link to="/home/" style={{ textDecoration: "none" }}>
                <Button variant="contained" style={loginButtonStyle}>
                  Log in
                </Button>
              </Link>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </Grid>

    //     <Typography variant="h3" style={h3Style}>
    //       Log in
    //     </Typography>
    //     <Typography variant="body2" style={body2Style}>
    //       Already have an account? Log in with your email below.
    //     </Typography>
    //     <Box
    //       border={1}
    //       borderRadius="borderRadius"
    //       borderColor="grey.300"
    //       style={boxStyle}
    //     >
    //       <TextField
    //         id="email"
    //         placeholder="Email"
    //         style={textFieldStyle}
    //       ></TextField>
    //       <TextField
    //         id="pw"
    //         placeholder="Password"
    //         style={textFieldStyle}
    //       ></TextField>
    //       <Link to="/home/" style={{ textDecoration: "none" }}>
    //         <Button variant="contained" style={loginButtonStyle}>
    //           Log in
    //         </Button>
    //       </Link>
    //     </Box>
    //   </Grid>

    // </Grid>
  );
};

export default LoginBox;
