import { Grid } from "@material-ui/core";
import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import { Plus, X, Minus } from "react-feather";
import { SvgIcon, IconButton, TextField, Button } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { Select, InputLabel, MenuItem } from "@material-ui/core";
import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import nextId from "react-id-generator";
import produce from "immer";
import { UserContext } from "./context/UserContext";
import { BookmarkContext } from "./context/BookmarkContext";
import DialogActionButton from "../common/DialogActionButton";
import * as bookmarkApi from "../../api/bookmarkapi";

//default images
const thumbnails = [
  "https://res.cloudinary.com/commandt/image/upload/v1622724485/6_swmitf.png",
  "https://res.cloudinary.com/commandt/image/upload/v1622724486/1_gbw5js.png",
  "https://res.cloudinary.com/commandt/image/upload/v1622724485/2_dzq3ab.png",
  "https://res.cloudinary.com/commandt/image/upload/v1622724485/7_kjri0t.png",
  "https://res.cloudinary.com/commandt/image/upload/v1622724485/4_k8qnmd.png",
  "https://res.cloudinary.com/commandt/image/upload/v1622724485/3_nwf6nx.png",
  "https://res.cloudinary.com/commandt/image/upload/v1622724485/5_fdgne3.png",
];
const useStyles = makeStyles({
  icon: {
    borderRadius: "50%",
    width: 20,
    height: 20,
    // boxShadow:
    //   "inset 0 0 0 2px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: (props) => props.backgroundcolor,
  },
  checkedIcon: {
    backgroundColor: (props) => props.backgroundcolor,
    boxShadow:
      "inset 0 0 0 2px rgba(51,51,51,1), inset 0 1px 0 rgba(51,51,51,1)",
    zIndex: 1,
    filter: "blur(0px)",
  },
});

function StyledRadio(props) {
  const classes = useStyles(props);
  if (props.className === "clear") {
    return (
      <Grid container justify="center" alignItems="center">
        <Radio
          className={classes.root}
          disableRipple
          checkedIcon={
            <span className={clsx(classes.icon, classes.checkedIcon)} />
          }
          icon={<span className={classes.icon} />}
          {...props}
        ></Radio>
        <Minus size={30} color="red" className="remove-icon" />
      </Grid>
    );
  }
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

const AddBookmark = () => {
  const { selectedFolderId, folders, setFolders } = useContext(UserContext);
  const {
    edit,
    setEdit,
    open,
    setOpen,
    url,
    setURL,
    title,
    setTitle,
    color,
    setColor,
    contextMenuBookmarkId,
    setContextMenuBookmarkId,
  } = useContext(BookmarkContext);

  const [folderMenuId, setFolderMenuId] = useState("");
  const [apiCall, setApiCall] = useState("");
  const [apiFolderIndex, setApiFolderIndex] = useState(-1);
  const [apiBookmarkIndex, setApiBookmarkIndex] = useState(-1);
  const [addId, setAddId] = useState("");
  useEffect(() => {
    if (apiCall === "") {
      return;
    } else if (apiCall === "add") {
      apiAddBookmark();
    } else if (apiCall === "edit") {
      apiUpdateBookmark();
    }
  }, [apiCall]);
  const handleClickOpen = () => {
    setOpen(true);

    //Since Select (material ui's component)'s default value is set to opened folder
    //When user click to open the addBookmark modal, this will select folder for user automatically.
    setFolderMenuId(selectedFolderId);
  };
  const handleClose = () => {
    setURL("https://www.");
    setTitle("");
    setColor("clear");
    setOpen(false);
    setEdit(false);
  };
  const handleURLChange = (event) => {
    setURL(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };
  const handleChange = (event) => {
    setFolderMenuId(event.target.value);
  };

  const handleSubmit = () => {
    //Editing Mode
    if (edit) {
      const folderIndex = folders.findIndex((f) => f._id === selectedFolderId);
      const bookmarkIndex = folders[folderIndex].bookmarks.findIndex(
        (bm) => bm._id === contextMenuBookmarkId
      );
      setFolders(
        produce((draft) => {
          draft[folderIndex].bookmarks[bookmarkIndex].url = url;
          draft[folderIndex].bookmarks[bookmarkIndex].title = title;
          draft[folderIndex].bookmarks[bookmarkIndex].color = color;
        })
      );

      setEdit(false);
      setApiBookmarkIndex(bookmarkIndex);
      setApiCall("edit");
      setApiFolderIndex(folderIndex);
    } else {
      const folderIndex = folders.findIndex((f) => f._id === folderMenuId);
      const rand = Math.floor(Math.random() * 7);
      const newBookmark = {
        title: title,
        url: url,
        thumbnail: thumbnails[rand],
        color: color,
        _id: nextId(),
      };
      //this part is changed
      //Find folder's index based on folder's id

      setFolders(
        produce(folders, (draft) => {
          draft[folderIndex].bookmarks.push(newBookmark);
        })
      );
      setApiCall("add");
      setApiFolderIndex(folderIndex);
      setAddId(newBookmark._id);
    }
    handleClose();
  };
  async function apiAddBookmark() {
    if (apiFolderIndex === -1) {
      return;
    }

    const index = folders[apiFolderIndex].bookmarks.findIndex(
      (bookmark) => bookmark._id === addId
    );
    let newBookmarks = [...folders[apiFolderIndex].bookmarks];
    if (newBookmarks[index]._id.length < 10) {
      const bm = newBookmarks.pop();
      console.log(newBookmarks);
      //_id is folder id
      const data = {
        title: bm.title,
        url: bm.url,
        color: bm.color,
        thumbnail: bm.thumbnail,
        _id: selectedFolderId,
      };
      const result = await bookmarkApi.apiAddBookmark(data);

      console.log("id from backend for new bookmark ", result, typeof result);
      const newBookmark = {
        title: bm.title,
        _id: result.newId,
        url: bm.url,
        color: bm.color,
        thumbnail: result.thumbnail,
      };

      setFolders(
        produce((draft) => {
          draft[apiFolderIndex].bookmarks = [...newBookmarks, newBookmark];
        })
      );
    }
    setApiCall("");
    setApiFolderIndex(-1);
    setAddId("");
  }
  const apiUpdateBookmark = () => {
    if (contextMenuBookmarkId.length < 10) {
      return;
    }

    const data = {
      _id: contextMenuBookmarkId,
      title: title,
      url: url,
      color: color,
      thumbnail: folders[apiFolderIndex].bookmarks[apiBookmarkIndex].thumbnail,
    };
    bookmarkApi.apiUpdateBookmark(data);
    setApiBookmarkIndex(-1);
    setApiCall("");
    setApiFolderIndex(-1);
    setContextMenuBookmarkId("");
    setURL("https://www.");
    setTitle("");
    setColor("clear");
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
        aria-labelledby={edit ? "edit-bookmark-dialog" : "new-bookmark-dialog"}
      >
        <DialogTitle id={edit ? "edit-bookmark-dialog" : "new-bookmark-dialog"}>
          {edit ? (
            <h5 className="dialog-title">Edit a bookmark</h5>
          ) : (
            <h5 className="dialog-title">Add a new bookmark</h5>
          )}

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
                //default value is changed to clear
                value={color}
                name="radio-buttons-group"
                style={{ flexDirection: "row" }}
                onChange={handleColorChange}
              >
                <FormControlLabel
                  value="clear"
                  control={
                    <StyledRadio
                      //made className clear to have exception to add "remove" icon
                      className="clear"
                      backgroundcolor="rgba(220, 220, 220, 0.5)"
                    />
                  }
                />
                <FormControlLabel
                  value="green"
                  control={<StyledRadio backgroundcolor="#6FCF97" />}
                />
                <FormControlLabel
                  value="yellow"
                  control={<StyledRadio backgroundcolor="#F2C94C" />}
                />
                <FormControlLabel
                  value="orange"
                  control={<StyledRadio backgroundcolor="#F2994A" />}
                />
                <FormControlLabel
                  value="red"
                  control={<StyledRadio backgroundcolor="#EB5757" />}
                />
                <FormControlLabel
                  value="blue"
                  control={<StyledRadio backgroundcolor="#2F80ED" />}
                />
                <FormControlLabel
                  value="purple"
                  control={<StyledRadio backgroundcolor="#BB6BD9" />}
                />
              </RadioGroup>
            </Grid>
            {edit ? (
              <></>
            ) : (
              <Grid item xs={12} className="grid-add-bookmark">
                <FormControl variant="outlined" className="folder-form-control">
                  <InputLabel id="folder-add-bookmark-label">Folder</InputLabel>
                  <Select
                    labelId="folder-add-bookmark-label"
                    value={folderMenuId}
                    onChange={handleChange}
                    label="Folder"
                  >
                    {folders.map((f) => (
                      //MenuItem value is changed from f.title => f.id;
                      //This will make handleChange's "event.target.value" to have folder's id, not title.
                      <MenuItem key={`${f._id}-menu`} value={f._id}>
                        {f.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
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
export default AddBookmark;
