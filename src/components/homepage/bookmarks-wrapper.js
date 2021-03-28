import { DialogActions, Grid } from "@material-ui/core";
import React, { useState } from "react";
import Bookmark from "./bookmark";
import { Plus, X } from "react-feather";
import { SvgIcon, IconButton, TextField, Button } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";

const AddNewBookmarkButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="bookmark-wrapper" onClick={() => handleClickOpen()}>
        <SvgIcon>
          <Plus color="white" strokeWidth={1} />
        </SvgIcon>
        <small>Add Bookmark</small>
      </div>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="new-bookmark-dialog"
      >
        <DialogTitle id="new-bookmark-dialog">
          <h5 className="dialog-title">Add a new bookmark</h5>
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
          <form>
            <TextField
              required
              id="new-bookmark-url"
              label="Website URL"
              fullWidth
            />
            <TextField id="new-bookmark-title" label="Title" fullWidth />
            {/* TODO Visit link below for radio buttons  */}
            {/* https://material-ui.com/components/radio-buttons/ */}
          </form>
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

export default function BookmarksWrapper() {
  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="start"
        alignItems="flex-start"
      >
        <Grid item xs={4} md={3} lg={2} justify="center" zeroMinWidth>
          <Bookmark
            thumbnail="https://www.google.com/images/branding/product/ico/google_my_business_alldp.ico"
            name="Google Business"
            url="https://www.google.com/about"
          />
        </Grid>
        <Grid item xs={4} md={3} lg={2} justify="center" zeroMinWidth>
          <Bookmark
            thumbnail="https://github.githubassets.com/apple-touch-icon-180x180.png"
            name="Github"
            url="https://github.com"
          />
        </Grid>
        <Grid item xs={4} md={3} lg={2} justify="center" zeroMinWidth>
          <Bookmark
            thumbnail="https://github.githubassets.com/apple-touch-icon-180x180.png"
            name="CSE416 Project"
            url="https://www.github.com/janarosmonaliev/project-416"
          />
        </Grid>
        <Grid item xs={4} md={3} lg={2} justify="center" zeroMinWidth>
          <Bookmark
            thumbnail="https://miro.medium.com/fit/c/152/152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"
            name="Medium"
            url="https://www.medium.com"
          />
        </Grid>
        <Grid item xs={4} md={3} lg={2} justify="center" zeroMinWidth>
          <Bookmark
            thumbnail="https://www.google.com//images/branding/googleg/1x/googleg_standard_color_128dp.png"
            name="Google"
            url="https://www.google.com"
          />
        </Grid>
        <Grid item xs={4} md={3} lg={2} justify="center" zeroMinWidth>
          <AddNewBookmarkButton></AddNewBookmarkButton>
        </Grid>
      </Grid>
    </>
  );
}
