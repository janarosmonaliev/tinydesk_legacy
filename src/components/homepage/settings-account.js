import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useContext,
  useCallback,
} from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { X } from "react-feather";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Button,
  makeStyles,
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
import cities from "../../cities";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { UserContext } from "./context/UserContext";
import * as logout from "../../api/auth";
import * as accountApi from "../../api/accountapi";
import RemoveConfirm from "./remove-confirm";

const useStyles = makeStyles({
  redOutlinedBtn: {
    color: "#eb5757",
    border: "1px solid #eb5757",
  },
  redContainedBtn: {
    backgroundColor: "#eb5757",
    color: "white",
  },
  tableRow: {
    height: "1rem",
  },
  switch: {
    color: "#eb5757",
  },
});

const AccountSettingsTwo = forwardRef((props, ref) => {
  const classes = useStyles();
  const {
    location,
    setLocation,
    unicorn,
    setUnicorn,
    email,
    username,
  } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [unicornConfig, setUnicornConfig] = useState(unicorn);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const [location, setLocation] = useState("Songdo");
  // const handleLocationChange = (event) => {
  //   setLocation(event.target.value);
  // };
  // const [selectedCountry, setSelectedCountry] = useState("")
  const [cityValue, setCityValue] = useState(location.name);
  const [filter, setFilter] = useState(false);

  const city = cities.korea;
  const cityHandleChange = (e) => {
    setCityValue(e.target.value);
  };

  const handleChange = (event) => {
    setUnicornConfig(event.target.checked);
  };

  useImperativeHandle(ref, () => ({
    clickOpen: () => {
      handleClickOpen();
    },
  }));

  const onClickSaveInfos = () => {
    const newCity = city.filter((c) => c.name === cityValue)[0];

    if (newCity != null) {
      //Save the result as current location
      setLocation(newCity);

      alert("Successfully Saved");
      setOpen(false);
    } else {
      alert("Something is wrong with the name of city");
      return;
    }
    setUnicorn(unicornConfig);
    apiChangeUserInfo(newCity);
  };

  const apiChangeUserInfo = useCallback((newCity) => {
    const data = { city: newCity, keepUnicorn: unicornConfig };
    accountApi.apiChangeUserInfo(data);
  });

  const logoutFunction = () => {
    logout.logout();
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="settings-account-dialog"
      >
        <DialogTitle id="settings-account-dialog">
          <div className="dialog-title"> Account Settings</div>
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
                <TableRow className={classes.tableRow}>
                  <TableCell align="left">
                    <p>Username: </p>
                  </TableCell>
                  <TableCell align="center">
                    <p>
                      <u>{username}</u>
                    </p>
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell align="left">
                    <p>Email:</p>
                  </TableCell>
                  <TableCell align="center">
                    <p>
                      <u>{email}</u>
                    </p>
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
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
                      defaultValue={location}
                      autoComplete
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="City"
                          variant="standard"
                          onSelect={cityHandleChange}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell align="left">
                    <p>Keep Unicorn:</p>
                  </TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={unicornConfig}
                      onChange={handleChange}
                      className={classes.switch}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} container direction="column">
              <Button
                variant="contained"
                color="primary"
                onClick={onClickSaveInfos}
              >
                Save
              </Button>
            </Grid>

            <Grid item xs={12} container direction="column">
              <Button
                variant="outlined"
                className={classes.redOutlinedBtn}
                onClick={logoutFunction}
              >
                Log Out
              </Button>
            </Grid>
            <Grid item xs={12} container direction="column">
              <Button
                variant="contained"
                className={classes.redContainedBtn}
                disableElevation
                onClick={() => setRemoveConfirm(true)}
              >
                Remove Account
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <RemoveConfirm
        removeConfirm={removeConfirm}
        setRemoveConfirm={setRemoveConfirm}
      />
    </>
  );
});
export default React.memo(AccountSettingsTwo);
