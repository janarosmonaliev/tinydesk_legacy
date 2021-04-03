import React, { useState, useRef } from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Settings } from "react-feather";
import { Menu, Container, Typography } from "@material-ui/core";
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
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import AccountSettings from "./settings-account";

// const AccountSettings = () => {
//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const [state, setState] = React.useState({
//     unicornYes: true,
//   });

//   const handleChange = (event) => {
//     setState({ ...state, [event.target.name]: event.target.checked });
//   };

//   return (
//     <>
//       <MenuItem onClick={handleClickOpen}>Account</MenuItem>

//       <Dialog
//         fullWidth
//         maxWidth="xs"
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="settings-account-dialog"
//       >
//         <DialogTitle id="settings-account-dialog">
//           <h5 className="dialog-title">Account Settings</h5>
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             size="small"
//             className="button-dialog-close"
//           >
//             <SvgIcon>
//               <X />
//             </SvgIcon>
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <TableContainer
//             component={Paper}
//             elevation={0}
//             className="settings-account-table"
//           >
//             <Table>
//               <TableBody>
//                 <TableRow>
//                   <TableCell align="left">
//                     <h5>Username: </h5>
//                   </TableCell>
//                   <TableCell align="center">
//                     <h5>
//                       <u>jnyshin</u>
//                     </h5>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell align="left">
//                     <h5>Email</h5>
//                   </TableCell>
//                   <TableCell align="center">
//                     <h5>
//                       <u>yejin.shin@stonybrook.edu</u>
//                     </h5>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell align="left">
//                     <h5>Location</h5>
//                   </TableCell>
//                   <TableCell align="center">
//                     <TextField label="Songdo, Incheon" align="center" />
//                     {/* <SettingsWeather></SettingsWeather> */}
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell align="left">
//                     <h5>Keep Unicorn</h5>
//                   </TableCell>
//                   <TableCell align="center">
//                     <Switch
//                       checked={state.unicornYes}
//                       onChange={handleChange}
//                       name="unicornYes"
//                     />
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </DialogContent>
//         <DialogContent>
//           <Typography align="center">
//             <h5>Danger Zone</h5>
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} container direction="column">
//               <Button variant="outlined" color="secondary">
//                 Log Out
//               </Button>
//             </Grid>
//             <Grid item xs={12} container direction="column">
//               <Button variant="contained" color="secondary" disableElevation>
//                 Remove Account
//               </Button>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="contained"
//             color="primary"
//             disableElevation
//             disableTouchRipple
//             onClick={handleClose}
//           >
//             Save
//           </Button>
//           <Button
//             variant="outlined"
//             color="secondary"
//             disableElevation
//             disableTouchRipple
//             onClick={handleClose}
//           >
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

export default function SettingsButton(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const accountSettingsWindowRef = useRef();
  const handleClickAccount = () => {
    accountSettingsWindowRef.current.clickOpen();
  };
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
        <MenuItem onClick={handleClickAccount}>
          <AccountSettings ref={accountSettingsWindowRef} />
          Account
        </MenuItem>

        <MenuItem onClick={handleClose}>Edit layout</MenuItem>
        <MenuItem onClick={handleClose}>Edit background image</MenuItem>
        {/* <AccountSettings ref={accountsettingsRef} /> */}
      </Menu>
    </>
  );
}
