import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Container,
} from "@material-ui/core";
import { SvgIcon, IconButton, TextField, Button } from "@material-ui/core";
import { X } from "react-feather";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import styled from "styled-components";

const NotesWindow = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const outerstyles = {
    width: "100%",
    height: "400px",
    overflow: "auto",
    position: "relative",
  };
  const innerstyle = {
    width: "100%",
    height: "650px",
  };
  useImperativeHandle(ref, () => ({
    clickOpen: () => {
      handleClickOpen();
    },
  }));
  return (
    <Dialog
      maxWidth={"md"}
      open={open}
      onClose={handleClose}
      aria-labelledby="notes-dialog"
      className="notes-window"
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
        <Grid container xs={12} spacing={5}>
          <Grid item xs={4} container direction="column" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                disableElevation
                justify-content="flex-start"
              >
                CSE416
              </Button>
              {/* <Typography variant="button" color="primary">
                CSE 416
              </Typography> */}
            </Grid>
            <Divider variant="middle" />
            <Grid item>
              <small> Homeplus grocery list</small>
            </Grid>
            <Divider variant="middle" />
            <Grid item>
              <small> SBU Visit Document</small>
            </Grid>
            <Divider variant="middle" />
            <Grid item>
              <Button
                justify-content="baseline"
                startIcon={<AddCircleOutlineRoundedIcon />}
              >
                Add a new note
              </Button>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={8} md container spacing={1}>
            <Grid item container direction="column" spacing={2}>
              <Grid item>
                <h5>
                  <b>CSE 416 Course</b>
                </h5>
                <br></br>
                <div className="notes-text-style-bar">
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
                  <Button>Bold</Button>
                </div>
                <br></br>
              </Grid>
              <Divider />
              <Grid item>
                <div style={outerstyles}>
                  <div style={innerstyle}>
                    <br></br>
                    <h5>
                      <b>Visit Details</b>
                    </h5>{" "}
                    <p>
                      Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. ssidufsiduhf. ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. ssidufsiduhf.
                      ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. ssidufsiduhf. ssidufsiduhf.
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
});
export default NotesWindow;
