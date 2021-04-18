import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef,
  useEffect,
} from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Typography } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { X } from "react-feather";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Button,
} from "@material-ui/core/";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const AccountSettingsTwo = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = React.useState({
    unicornYes: true,
  });

  // const [location, setLocation] = useState("Songdo");
  // const handleLocationChange = (event) => {
  //   setLocation(event.target.value);
  // };
  // const [selectedCountry, setSelectedCountry] = useState("")
  const [currentLocation, setCurrentLocation] = useState(props.location);
  const [cityValue, setCityValue] = useState(currentLocation.name);

  const city = cities.korea;
  const cityHandleChange = (e) => {
    setCityValue(e.target.value);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  useImperativeHandle(ref, () => ({
    clickOpen: () => {
      handleClickOpen();
    },
  }));

  const onClickSaveInfos = () => {
    const temp = city.filter((c) => c.name === cityValue);
    if (temp != null) {
      alert("Successfully Saved");
      setOpen(false);
    } else {
      alert("Something is wrong with the city");
    }
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>Account</MenuItem>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="settings-account-dialog"
      >
        <DialogTitle id="settings-account-dialog">
          <h5 className="dialog-title" style={{ marginLeft: "15px" }}>
            {" "}
            Account Settings
          </h5>
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
        <Divider />
        <DialogContent>
          <TableContainer
            component={Paper}
            elevation={0}
            className="settings-account-table"
          >
            <Table>
              <TableBody>
                <TableRow style={{ height: "1rem" }}>
                  <TableCell align="left">
                    <p>Username: </p>
                  </TableCell>
                  <TableCell align="center">
                    <p>
                      <u>jnyshin</u>
                    </p>
                  </TableCell>
                </TableRow>
                <TableRow style={{ height: "1rem" }}>
                  <TableCell align="left">
                    <p>Email:</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>
                      <u>yejin.shin@stonybrook.edu</u>
                    </p>
                  </TableCell>
                </TableRow>
                <TableRow style={{ height: "1rem" }}>
                  <TableCell align="left">
                    <p>Location:</p>
                  </TableCell>

                  <TableCell>
                    <Autocomplete
                      id="city"
                      options={city}
                      getOptionLabel={(option) => option.name}
                      getOptionSelected={(option, value) =>
                        option.name === value.name
                      }
                      defaultValue={currentLocation}
                      autoComplete
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="City"
                          variant="standard"
                          defaultValue={currentLocation.name}
                          onSelect={cityHandleChange}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow style={{ height: "1rem" }}>
                  <TableCell align="left">
                    <p>Keep Unicorn:</p>
                  </TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={state.unicornYes}
                      onChange={handleChange}
                      name="unicornYes"
                      style={{ color: "#eb5757" }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogContent>
          <Typography
            align="center"
            //style={{ color: "#eb5757", fontWeight: "bold" }}
          >
            <p>Danger Zone</p>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} container direction="column">
              <Button
                variant="outlined"
                style={{ color: "#eb5757", border: "1px solid #eb5757" }}
              >
                Log Out
              </Button>
            </Grid>
            <Grid item xs={12} container direction="column">
              <Button
                variant="contained"
                style={{ backgroundColor: "#eb5757", color: "white" }}
                disableElevation
              >
                Remove Account
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
});
export default AccountSettingsTwo;
