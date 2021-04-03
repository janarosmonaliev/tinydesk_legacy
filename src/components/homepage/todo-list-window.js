import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { SvgIcon, IconButton, DialogActions, Button } from "@material-ui/core";
import { Grid, List, ListItem, Divider, ListItemText } from "@material-ui/core";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { X, Plus } from "react-feather";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

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

  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleSelectList = (e, index) => {
    setSelectedIndex(index);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      aria-labelledby="todo-list-dialog"
      classes={{ paper: "todo-list-window" }}
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
        <Grid
          container
          // xs={12}
          direction="row"
          // justify="flex-start"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={3}>
            <List component="nav" aria-label="to-do lists">
              {/* TODO Map a JSON object to display content */}
              <ListItem
                button
                selected={selectedIndex === 1}
                onClick={(e) => handleSelectList(e, 1)}
              >
                <ListItemText primary="Academic"></ListItemText>
              </ListItem>
              <Divider light />
              <ListItem
                button
                selected={selectedIndex === 2}
                onClick={(e) => handleSelectList(e, 2)}
              >
                <ListItemText primary="Life Goals"></ListItemText>
              </ListItem>
              <Divider light />
              <ListItem
                button
                selected={selectedIndex === 3}
                onClick={(e) => handleSelectList(e, 3)}
              >
                <ListItemText primary="My daily to-dos"></ListItemText>
              </ListItem>
              <Divider light />
            </List>
          </Grid>

          <Divider orientation="vertical" flexItem light />
          <Grid item xs>
            <h5>Academic</h5>
            <FormControlLabel
              control={
                <Checkbox
                  name="gilad"
                  color="primary"
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                />
              }
              label="30s presentation for CSE416"
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  name="gilad"
                  color="primary"
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                />
              }
              label="POL101 read chapter 1"
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  name="gilad"
                  color="primary"
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                />
              }
              label="CSE416 Software Requirements"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<Plus />} disableTouchRipple>
          Add a new list
        </Button>
      </DialogActions>
    </Dialog>
  );
});
export default TodoListWindow;
