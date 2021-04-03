import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { SvgIcon, IconButton, TextField, Button } from "@material-ui/core";
import { X } from "react-feather";

const TodoListWindow = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // For the parent to access the child (Widget -> Window)
  useImperativeHandle(ref, () => ({
    clickOpen: () => {
      handleClickOpen();
    },
  }));
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      aria-labelledby="todo-list-dialog"
    >
      <DialogTitle id="todo-list-dialog">
        <h5 className="dialog-title">To-Do List Widget</h5>
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
        <p> To-Do List window component</p>
      </DialogContent>
    </Dialog>
  );
});
export default TodoListWindow;
