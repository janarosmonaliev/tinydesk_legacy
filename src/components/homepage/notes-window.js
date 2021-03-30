import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { SvgIcon, IconButton, TextField, Button } from "@material-ui/core";
import { X } from "react-feather";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

const NotesWindow = forwardRef((props, ref) => {
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
      aria-labelledby="notes-dialog"
    >
      <DialogTitle id="notes-dialog">
        <h5 className="dialog-title">Notes Widget</h5>
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
        {/* <p> Notes window component</p> */}
        <Grid container spacing={3}>
          <Grid item xs={3} container direction="column">
            <Grid item spacing={2}>
              <small> CSE 416 Course</small>
            </Grid>
            <Divider />
            <Grid item spacing={2}>
              <small> Homeplus grocery list</small>
            </Grid>
            <Divider />
            <Grid item spacing={2}>
              <small> SBU Visit Document</small>
            </Grid>
            <Divider />
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <h5>
                  <b>CSE 416 Course</b>
                </h5>
              </Grid>
              <Grid item>
                <Button>H1</Button>
                <Button>H2</Button>
                <Button>H3</Button>
                <Button>H4</Button>
                <Button>H5</Button>
                <Button>H6</Button>
                <Button>Blockquote</Button>
                <Button>UL</Button>
                <Button>OL</Button>
                <Button>Codeblock</Button>
                <Button>Italic</Button>
                <Button>Underline</Button>
                <Button color="orange">Bold</Button>
              </Grid>
              <Divider />
              <Grid item>
                <h6>
                  <b>Visit Details</b>
                </h6>{" "}
                <p>
                  {" "}
                  Students must satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs
                  diufskje askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                  ssidufsiduhf.
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
});
export default NotesWindow;
