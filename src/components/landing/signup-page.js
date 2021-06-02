import React, { useEffect, useRef, useState } from "react";
import { navigate } from "gatsby";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  makeStyles,
  Dialog,
  DialogTitle,
  SvgIcon,
  IconButton,
  DialogContent,
  Divider,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";
import { X } from "react-feather";
import Logo from "../../images/commandt-logo-sm.svg";
import { Autocomplete } from "@material-ui/lab";
import cities from "../../cities";
import * as auth from "../../api/auth";
import validator from "validator";
import PrivacyPolicyKor from "./privacy-policy-kor";
import PrivacyPolicyEng from "./privacy-policy-eng";
import SwipeableViews from "react-swipeable-views";
const useStyles = makeStyles({
  errorMessage: {
    color: "red",
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const SignupPage = () => {
  // Using states to store the values put on the form fields by the user
  const classes = useStyles();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState({});
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [open, setOpen] = useState(false);

  //Tabs index
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  // The function that fires when the user clicks to submit the form
  const register = () => {
<<<<<<< HEAD
    axios({
      method: "POST",
      data: {
        name: fullName,
        username: username,
        email: email,
        password: password,
        city: city,
      },
      url: "http://localhost:4000/signup", // <-------- We have to change this before Milestone 3 deadline to use the Heroku backend
    }).then((res) => console.log(res));
=======
    if (!validator.isEmail(email)) {
      setEmailError(true);
      return;
    }
    setError(false);
    setDisabled(true);
    const data = {
      name: fullName,
      username: username,
      email: email,
      password: password,
      city: city,
    };
    auth.register(data, setError, setDisabled);
>>>>>>> master
  };
  const handleOnChangeCountry = (e) => {
    setCountry(e.target.value);
    const ele = autoC.current.getElementsByClassName(
      "MuiAutocomplete-clearIndicator"
    )[0];
    if (ele) ele.click();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const autoC = useRef(null);

  return (
    <Grid item xs={12} md={6} lg={6}>
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <div className="logotype-wrapper">
            <img src={Logo} width="50" height="32" alt="CommandT Logo"></img>{" "}
            <span className="landing-text-black">CommandT</span>
          </div>
          <h1 className="landing-text-black">Create an account</h1>
          <h5 className="landing-text-gray">
            Enter your information below to create a new account.
          </h5>
          <Card variant="outlined">
            <CardContent>
              <form id="signup-page-form" autoComplete="off">
                <TextField
                  id="sign-page-form-name"
                  fullWidth
                  label="Full name"
                  type="name"
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete
                  disabled={disabled}
                />
                <TextField
                  id="sign-page-form-username"
                  fullWidth
                  label="Username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={disabled}
                />
                <TextField
                  id="sign-page-form-email"
                  fullWidth
                  error={emailError}
                  label="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={disabled}
                />
                <TextField
                  id="sign-page-form-password"
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={disabled}
                />

                <TextField
                  id="sign-page-form-city"
                  select
                  fullWidth
                  label="Country"
                  onChange={(e) => handleOnChangeCountry(e)}
                  defaultValue=""
                  disabled={disabled}
                >
                  <MenuItem key="usa" value="usa">
                    United State
                  </MenuItem>
                  <MenuItem key="korea" value="korea">
                    South Korea
                  </MenuItem>
                </TextField>
                <Autocomplete
                  onChange={(e, newValue) => {
                    setCity(newValue);
                  }}
                  options={cities[country]}
                  getOptionLabel={(option) => option.name}
                  ref={autoC}
                  disabled={cities[country] == null || disabled}
                  renderInput={(params) => (
                    <TextField {...params} label="Cities" variant="standard" />
                  )}
                ></Autocomplete>
              </form>
              {error ? (
                <div className={classes.errorMessage}>User already exists!</div>
              ) : (
                <></>
              )}
              <Button
                variant="contained"
                color="primary"
                disableElevation
                disableTouchRipple
                onClick={register}
                disabled={disabled}
              >
                Create an account
              </Button>
            </CardContent>
          </Card>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs>
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
            <Grid item container xs justify="flex-end">
              <Button
                disableElevation
                disableTouchRipple
                onClick={() => {
                  setOpen(true);
                }}
                className="landing-text-gray"
              >
                Privacy Policy
              </Button>
            </Grid>
          </Grid>
          <Dialog
            fullWidth
            maxWidth="lg"
            open={open}
            onClose={handleClose}
            aria-labelledby="privacy-policy-dialog"
          >
            <DialogTitle id="privacy-policy-dialog">
              <h5 className="dialog-title">Privacy Policy</h5>

              <IconButton
                aria-label="close"
                onClick={handleClose}
                size="small"
                className="button-dialog-close"
              >
                <SvgIcon>
                  <X />
                </SvgIcon>
              </IconButton>
            </DialogTitle>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              centered
            >
              <Tab label="Eng" {...a11yProps(0)} />
              <Tab label="Kor" {...a11yProps(1)} />
            </Tabs>
            <Divider />
            <DialogContent>
              <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
                animateTransitions={false}
              >
                <TabPanel value={value} index={0}>
                  <PrivacyPolicyEng />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <PrivacyPolicyKor />
                </TabPanel>
              </SwipeableViews>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignupPage;
