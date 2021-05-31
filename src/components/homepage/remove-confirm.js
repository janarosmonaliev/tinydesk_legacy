import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  IconButton,
  Divider,
  makeStyles,
} from "@material-ui/core";

import { X } from "react-feather";
import DialogActionButton from "../common/DialogActionButton";
import React from "react";
const useStyles = makeStyles({
  redBtn: {
    color: "#eb5757",
    border: "1px solid #eb5757",
    width: "100px",
  },
});
const RemoveConfirm = ({ removeConfirm, setRemoveConfirm }) => {
  const classes = useStyles();
  const handleClose = () => {
    setRemoveConfirm(false);
  };
  return (
    <Dialog
      onClose={handleClose}
      open={removeConfirm}
      aria-labelledby="add-folder-dialog"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="add-folder-dialog">
        <h5 className="dialog-title">Remove Account</h5>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          size="small"
          className="button-dialog-close"
        >
          <X />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography color="error">
          <b>Warning! This action cannot be undone!</b>
        </Typography>
        <Typography>Do you really want to delete your account?</Typography>
      </DialogContent>
      <DialogActionButton>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          disableTouchRipple
          onClick={handleClose}
          className="button-100"
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          disableElevation
          disableTouchRipple
          //   onClick={handleClose}

          className={classes.redBtn}
        >
          Confirm
        </Button>
      </DialogActionButton>
    </Dialog>
  );
};

export default RemoveConfirm;
