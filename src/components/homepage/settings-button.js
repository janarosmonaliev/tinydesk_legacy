import React, { useState, useRef } from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Settings } from "react-feather";
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { X } from "react-feather";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Button,
} from "@material-ui/core/";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//import { AccountSettings } from "./settings-account";

const AccountSettings = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
          <h5 className="dialog-title">Account Settings</h5>
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
        <DialogContent>
          <TableContainer component={Paper}>
            <Table elevation>
              <TableBody>
                <TableRow>
                  <TableCell align="left">
                    <h5>Username: </h5>
                  </TableCell>
                  <TableCell align="center">
                    <h6>
                      <u>jnyshin</u>
                    </h6>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <h5>Email</h5>
                  </TableCell>
                  <TableCell align="center">
                    <h6>
                      <u>yejin.shin@stonybrook.edu</u>
                    </h6>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <h5>Location</h5>
                  </TableCell>
                  <TableCell align="center">
                    <h6>
                      <u>Songdo, Incheon</u>
                    </h6>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <h5>Keep Unicorn</h5>
                  </TableCell>
                  <TableCell align="center">
                    <h6>
                      <u>put yes/no button</u>
                    </h6>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disableTouchRipple
            onClick={handleClose}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            disableElevation
            disableTouchRipple
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default function SettingsButton(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleClickAccount = () => {
  //   <AccountSettings open={true} setOpen={true} />;
  // };
  // const accountsettingsRef = useRef();
  return (
    <>
      <button
        className={"button-glass " + props.className}
        aria-controls="settings-menu"
        aria-haspopup="true"
        onClick={handleClickOpen}
      >
        <SvgIcon>
          <Settings strokeWidth={2} color="#4f4f4f"></Settings>
        </SvgIcon>
      </button>
      <Menu
        elevation={0}
        id="settings-menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* <MenuItem onClick={handleClose}>Account</MenuItem> */}
        <AccountSettings />
        <MenuItem onClick={handleClose}>Edit layout</MenuItem>
        <MenuItem onClick={handleClose}>Edit background image</MenuItem>
        {/* <AccountSettings ref={accountsettingsRef} /> */}
      </Menu>
    </>
  );
}
