import { DialogActions, Grid } from "@material-ui/core";
import clsx from "clsx";
import React, { useContext, useState } from "react";
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
import nextId from "react-id-generator";
import produce from "immer";
import { UserContext } from "./context/UserContext";

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
  const { selectedFolderId, folders, setFolders } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [folder, setFolder] = useState("");
  const [url, setURL] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleURLChange = (event) => {
    setURL(event.target.value);
    console.log(`URL is set to: ${event.target.value}`);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    console.log(`Title is set to: ${event.target.value}`);
  };
  const handleColorChange = (event) => {
    setColor(event.target.value);
    console.log(`Color is set to: ${event.target.value}`);
  };
  const handleChange = (event) => {
    setFolder(event.target.value);

    //selectedFolderId = event.target.value;
    console.log(`Folder is set to: ${event.target.value}`);
  };

  const handleSubmit = () => {
    const newBookMark = {
      title: title,
      url: url,
      thumbnail: "",
      color: color,
      id: nextId(),
    };
    console.log(
      `New bookmark will be created with url: ${url}, title: ${title}, color: ${color}, and folder: ${folder}`
    );
    console.log(newBookMark);
    console.log(selectedFolderId);
    console.log(folders);
    const folderIndex = folders.findIndex((f) => f.id === selectedFolderId);
    setFolders(
      produce(folders, (draft) => {
        draft[folderIndex].bookmarks.push(newBookMark);
      })
    );

    setURL("");
    setTitle("");
    setColor("green");
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

      {/* Add Bookmark dialog */}
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
              value={url}
              onChange={handleURLChange}
            />
            <TextField
              id="new-bookmark-title"
              label="Title"
              fullWidth
              autoComplete="off"
              name="title"
              value={title}
              onChange={handleTitleChange}
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
                onChange={handleColorChange}
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
                  {folders.map((f) => (
                    <MenuItem value={f.title}>{f.title}</MenuItem>
                  ))}
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
            onClick={handleSubmit}
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
  const { jiggle, displayedBookmarks } = useContext(UserContext);
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
        {displayedBookmarks.map((bookmark) => (
          <Grid
            item
            xs={4}
            md={3}
            lg={2}
            zeroMinWidth
            className={jiggle ? "bookmarks-jiggle" : ""}
          >
            <Bookmark
              thumbnail={bookmark.thumbnail}
              title={bookmark.title}
              url={bookmark.url}
            />
          </Grid>
        ))}
        <Grid item xs={4} md={3} lg={2} zeroMinWidth>
          <AddNewBookmarkButton></AddNewBookmarkButton>
        </Grid>
      </Grid>
    </>
  );
}
