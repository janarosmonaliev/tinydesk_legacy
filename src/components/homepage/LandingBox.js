import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";

import { Link } from "gatsby";
import Container from "@material-ui/core/Container";
import { ChevronsDown } from "react-feather";
const LandingBox = () => {
  const loginButtonStyle = {
    backgroundColor: "#27AE60",
    color: "#f5f5f5",
    width: "150px",
  };
  const googleButtonStyle = {
    backgroundColor: "#181c19",
    color: "#f5f5f5",
    width: "100%",
  };

  const createAccountButtonStyle = {
    backgroundColor: "white",
    width: "100%",
  };

  const subStyle = {
    color: "#828282",
  };

  const boxStyle = {
    padding: "30px",
    border: "1px solid #E0E0E0",
    borderRadius: "20px",
  };
  return (
    <>
      <Grid item conatiner xs={6}>
        <Grid
          item
          xs={12}
          container
          direction="row"
          style={{ overflowY: "hidden" }}
        >
          <Container maxWidth="lg">
            <Typography variant="h2">
              <b>
                Change the way you organize your bookmarks and use your homepage
              </b>
            </Typography>
            <br />
            <Typography variant="h5" style={subStyle}>
              Get started by logging in with your account or sign up <br />
              with your Google account or email.
            </Typography>
            <br />
            <br />
            <Grid
              item
              xs={12}
              container
              justify="flex-start"
              alignItems="center"
              spacing={3}
            >
              <Grid item lg={5} xs={12}>
                <Box style={boxStyle}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6" component="h2">
                        Already have an account? Log in with your email below.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Link to="/login/" style={{ textDecoration: "none" }}>
                        <Button variant="contained" style={loginButtonStyle}>
                          Log In
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item lg={7} xs={12}>
                <Box style={boxStyle}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6" component="h2">
                        New here? <br />
                        Sign In with Google or create a new account.
                      </Typography>
                    </Grid>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item lg={6} xs={12}>
                        <Button variant="contained" style={googleButtonStyle}>
                          Sign in with Google
                        </Button>
                      </Grid>
                      <Grid item lg={6} xs={12}>
                        <Link to="/signup" style={{ textDecoration: "none" }}>
                          <Button
                            variant="contained"
                            style={createAccountButtonStyle}
                          >
                            Create an account
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
    // <Grid container style={landingBoxStyle}>
    //   <Paper elevation={0}>
    //     <img src={Image} style={logoStyle}></img>
    //     <Grid container style={mainDivStyle}>
    //       <Typography variant="h3" style={h3Style}>
    //         Change the way you organize your bookmarks and use your homepage
    //       </Typography>
    //       <Typography variant="body2" style={body2Style}>
    //         Get started by logging in with your account or sign up with your
    //         Google account or email.
    //       </Typography>

    //       <Grid container spacing={24}>
    //         <Box
    //           border={1}
    //           borderColor="grey.300"
    //           borderRadius="borderRadius"
    //           style={div1Style}
    //         >
    //           <Typography>
    //             Already have an account? Log in with your email below.
    //           </Typography>
    //           <Link to="/login/" style={{ textDecoration: "none" }}>
    //             <Button variant="contained" style={loginButtonStyle}>
    //               Log In
    //             </Button>
    //           </Link>
    //         </Box>
    //         <Box
    //           border={1}
    //           borderColor="grey.300"
    //           borderRadius="borderRadius"
    //           style={div2Style}
    //         >
    //           <Typography>
    //             New here? Sign In with Google or create a new account.
    //           </Typography>
    //           <Button variant="contained" style={googleButtonStyle}>
    //             Sign in with Google
    //           </Button>
    //           <Link to="/signup" style={{ textDecoration: "none" }}>
    //             <Button variant="outlined" style={createAccountButtonStyle}>
    //               Create an account
    //             </Button>
    //           </Link>
    //         </Box>
    //       </Grid>
    //     </Grid>
    //   </Paper>
    // </Grid>
  );
};

export default LandingBox;
