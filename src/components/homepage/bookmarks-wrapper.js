import { DialogActions, Grid } from "@material-ui/core";
import clsx from "clsx";
import React, { useState } from "react";
import Bookmark from "./bookmark";
import { Plus, X } from "react-feather";
import { SvgIcon, IconButton, TextField, Button } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { Select, InputLabel, MenuItem } from "@material-ui/core";
import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { styled } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const DialogActionButton = styled(DialogActions)({
  justifyContent: "left",
  marginLeft: "16px",
  marginBottom: "20px",
});

const useStyles = makeStyles({
  icon: {
    borderRadius: "50%",
    width: 20,
    height: 20,
    // boxShadow:
    //   "inset 0 0 0 2px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: (props) => props.backgroundColor,
  },
  checkedIcon: {
    backgroundColor: (props) => props.backgroundColor,
    boxShadow:
      "inset 0 0 0 2px rgba(51,51,51,1), inset 0 -1px 0 rgba(51,51,51,1)",
  },
});
function StyledRadio(props) {
  const classes = useStyles(props);

  return (
    <Radio
      className={classes.root}
      disableRipple
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

const AddNewBookmarkButton = () => {
  const [open, setOpen] = useState(false);
  const [folder, setFolder] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setFolder(event.target.value);
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
              autoComplete="off"
            />
            <TextField
              id="new-bookmark-title"
              label="Title"
              fullWidth
              autoComplete="off"
            />
            {/* TODO Visit link below for radio buttons  */}
            {/* https://material-ui.com/components/radio-buttons/ */}
            <Grid
              item
              xs={12}
              container
              direction="row"
              alignItems="center"
              className="grid-add-bookmark"
            >
              <large className="color-form-label">Color</large>
              <RadioGroup
                aria-label="color"
                defaultValue="green"
                name="radio-buttons-group"
                style={{ flexDirection: "row" }}
              >
                <FormControlLabel
                  value="green"
                  control={<StyledRadio backgroundColor="#6FCF97" />}
                />
                <FormControlLabel
                  value="yellow"
                  control={<StyledRadio backgroundColor="#F2C94C" />}
                />
                <FormControlLabel
                  value="orange"
                  control={<StyledRadio backgroundColor="#F2994A" />}
                />
                <FormControlLabel
                  value="red"
                  control={<StyledRadio backgroundColor="#EB5757" />}
                />
                <FormControlLabel
                  value="blue"
                  control={<StyledRadio backgroundColor="#2F80ED" />}
                />
                <FormControlLabel
                  value="purple"
                  control={<StyledRadio backgroundColor="#BB6BD9" />}
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} className="grid-add-bookmark">
              <FormControl variant="outlined" className="folder-form-control">
                <InputLabel id="folder-add-bookmark-label">Folder</InputLabel>
                <Select
                  labelId="folder-add-bookmark-label"
                  value={folder}
                  onChange={handleChange}
                  label="Folder"
                >
                  <MenuItem value={"Academic"}>Academic</MenuItem>
                  <MenuItem value={20}>Design</MenuItem>
                  <MenuItem value={30}>Reading</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </form>
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
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            disableElevation
            disableTouchRipple
            onClick={handleClose}
            className="button-100"
          >
            Cancel
          </Button>
        </DialogActionButton>
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
        justify="flex-start"
        alignItems="flex-start"
      >
        {/* Error: Justify must be used only in container  */}
        <Grid item xs={4} md={3} lg={2} zeroMinWidth>
          <Bookmark
            thumbnail="https://www.google.com/images/branding/product/ico/google_my_business_alldp.ico"
            name="Google Business"
            url="https://www.google.com/about"
          />
        </Grid>
        <Grid item xs={4} md={3} lg={2} zeroMinWidth>
          <Bookmark
            thumbnail="https://github.githubassets.com/apple-touch-icon-180x180.png"
            name="Github"
            url="https://github.com"
          />
        </Grid>
        <Grid item xs={4} md={3} lg={2} zeroMinWidth>
          <Bookmark
            thumbnail="https://github.githubassets.com/apple-touch-icon-180x180.png"
            name="CSE416 Project"
            url="https://www.github.com/janarosmonaliev/project-416"
          />
        </Grid>
        <Grid item xs={4} md={3} lg={2} zeroMinWidth>
          <Bookmark
            thumbnail="https://miro.medium.com/fit/c/152/152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"
            name="Medium"
            url="https://www.medium.com"
          />
        </Grid>
        <Grid item xs={4} md={3} lg={2} zeroMinWidth>
          <Bookmark
            thumbnail="https://www.google.com//images/branding/googleg/1x/googleg_standard_color_128dp.png"
            name="Google"
            url="https://www.google.com"
          />
        </Grid>
        <Grid item xs={4} md={3} lg={2} zeroMinWidth>
          <AddNewBookmarkButton></AddNewBookmarkButton>
        </Grid>
      </Grid>
    </>
  );
}
