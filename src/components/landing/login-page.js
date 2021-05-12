import React, { useState } from "react";
import { navigate } from "gatsby";
import { Grid, Card, CardContent, Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Logo from "../../images/commandt-logo-sm.svg";
import axios from "axios";

const LoginPage = () => {
  // state variables since I haven't read how to use ref objects yet
  // should aim to use the ref objects that Janar put in here

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios({
      method: "POST",
      data: {
        email: email,
        password: password,
      },
      withCredentials: true,
      //url: "https://test-backend-command.herokuapp.com", // <-------- We have to change this before Milestone 3 deadline to use the Heroku backend
      url: "http://localhost:4000/login",
    }).then((res) => {
      console.log(res);
      if (res.data == "Successfully Authenticated") {
        navigate("/home");
      } else {
        alert("Please check your email or password");
      }
    });
  };

  // Comment for Yejin --> These lines:
  // const getUser = () => {
  //   axios({
  //     method: "GET",
  //     withCredentials: true,
  //     url: "http://localhost:4000/home", // <-------- We have to change this before Milestone 3 deadline to use the Heroku backend
  //   }).then((res) => console.log(res));
  // };
  return (
    <Grid item xs={12} md={6} lg={6}>
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <div className="logotype-wrapper">
            <img src={Logo} width="50" height="32" alt="CommandT Logo"></img>{" "}
            <span className="landing-text-black">CommandT</span>
          </div>
          <h1 className="landing-text-black">Log in</h1>
          <h5 className="landing-text-gray">
            Already have an account? Log in with your email below.
          </h5>
          <Card variant="outlined">
            <CardContent>
              <form id="login-page-form" autoComplete="off">
                <TextField
                  id="login-page-form-email"
                  fullWidth
                  label="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  id="login-page-form-password"
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>

              <Button
                variant="contained"
                color="primary"
                disableElevation
                disableTouchRipple
                onClick={login}
              >
                Log in
              </Button>
            </CardContent>
          </Card>

          <Button
            disableElevation
            disableTouchRipple
            onClick={() => {
              navigate("/");
            }}
            className="landing-text-gray"
          >
            &larr; Back
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
