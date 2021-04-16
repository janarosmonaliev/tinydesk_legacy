import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import { Link } from "gatsby";
import React, { useState, useCallback, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import cities from "../../cities";
import { ContactSupportOutlined } from "@material-ui/icons";
const SignUpBox = () => {
  const signUpBoxStyle = {
    backgroundColor: "#333333",
    color: "white",
    width: "200px",
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

  const subStyle = {
    color: "#828282",
  };

  //From json
  const [city, setCity] = useState([]);
  //from country
  const [selectedCountry, setSelectedCountry] = useState("");
  //to pass (one city)
  const [selectedCity, setSelectedCity] = useState(null);

  const [temp, setTemp] = useState("");
  const handleChange = useCallback((e) => {
    setSelectedCountry(e.target.value);
    setCity(e.target.value == "korea" ? cities.korea : cities.usa);
  }, []);
  const handleSelect = useCallback((e) => {
    // setTemp(e.target.value);
    setSelectedCity(city.filter((c) => c.name === e.target.value));
  });
  // const onChange = (e) => {
  //   setTemp(e.target.value);
  // };
  // useEffect(() => {
  //   setTemp("");
  // }, [selectedCountry]);
  return (
    <Grid item container xs={6} justify="center">
      <Grid
        item
        xs={8}
        container
        direction="row"
        style={{ overflowY: "hidden" }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3">Create an account</Typography>
          <Typography variant="h5" style={subStyle}>
            Enter your information to create a new account.
          </Typography>
          <br />
          <Grid container>
            <Box style={boxStyle}>
              <TextField
                id="name"
                placeholder="Full name"
                style={textFieldStyle}
              ></TextField>
              <TextField
                id="uname"
                placeholder="Username"
                style={textFieldStyle}
              ></TextField>
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
              <FormControl style={textFieldStyle}>
                <InputLabel id="sign-up-select-label">Country</InputLabel>
                <Select
                  labalId="sign-up-select-label"
                  id="sign-up-select"
                  value={selectedCountry}
                  onChange={handleChange}
                >
                  <MenuItem value={"usa"}>United States of America</MenuItem>
                  <MenuItem value={"korea"}>South Korea</MenuItem>
                </Select>
              </FormControl>

              <Autocomplete
                id="city"
                debug
                options={city}
                getOptionLabel={(option) => option.name}
                disabled={selectedCountry == ""}
                // inputValue={temp}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City"
                    variant="standard"
                    onSelect={handleSelect}
                    // onChange={onChange}
                  />
                )}
              />

              <Grid
                item
                xs={12}
                container
                justify="space-between"
                alignItems="center"
              >
                <Link to="/home/" style={{ textDecoration: "none" }}>
                  <Button variant="contained" style={signUpBoxStyle}>
                    Create an Account
                  </Button>
                </Link>
                <Link href="#" variant="body2" style={{ color: "#828282" }}>
                  Privacy Policy
                </Link>
              </Grid>
            </Box>
          </Grid>
        </Container>
      </Grid>

      {/*           
        <Typography variant="h3">Create an account</Typography>
        <Typography variant="body2" style={body2Style}>
          Enter your information to create a new account.
        </Typography>
        <Box style={boxStyle}>
          <TextField
            id="name"
            placeholder="Full name"
            style={textFieldStyle}
          ></TextField>
          <TextField
            id="uname"
            placeholder="Username"
            style={textFieldStyle}
          ></TextField>
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
          <TextField
            id="city"
            placeholder="Current city"
            style={textFieldStyle}
          ></TextField>
          <Link to="/home/" style={{ textDecoration: "none" }}>
            <Button variant="contained" style={loginButtonStyle}>
              Sign Up
            </Button>
          </Link>
          <Link href="#" style={linkStyle} variant="body2">
            Learn More
          </Link>
        </Box>
      </Grid> */}
    </Grid>
  );
};

export default SignUpBox;
