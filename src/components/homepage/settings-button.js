import React, { useState, useRef } from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Settings } from "react-feather";
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { AccountSettings } from "./settings-account";

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
        <MenuItem onClick={handleClose}>Account</MenuItem>
        <MenuItem onClick={handleClose}>Edit layout</MenuItem>
        <MenuItem onClick={handleClose}>Edit background image</MenuItem>
        {/* <AccountSettings ref={accountsettingsRef} /> */}
      </Menu>
    </>
  );
}
