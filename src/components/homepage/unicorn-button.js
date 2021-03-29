import React, { useState } from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { Zap, X } from "react-feather";

export default function UnicornButton(props) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        className={"button-glass " + props.className}
        onClick={handleClickOpen}
      >
        <SvgIcon>
          <Zap strokeWidth={2} color="#4f4f4f"></Zap>
        </SvgIcon>
      </button>

      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          <h4 className="dialog-title">Guidelines</h4>
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
          {/* <DialogContentText></DialogContentText> */}
          <h5>Setting Command T as a default homepage</h5>
          <p>Add guidelines here...</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
