import React, { forwardRef, useState, useImperativeHandle } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
const CalendarWindow = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openCalendar: () => {
      handleOpen();
    },
  }));

  return (
    <Dialog
      fullWidth
      maxWidth={"xl"}
      open={open}
      onClose={handleClose}
      aria-labelledby="calendar-window"
    >
      <DialogTitle id="calendar-window">Optional sizes</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText>
        content
      </DialogContent>
    </Dialog>
  );
});

export default CalendarWindow;
