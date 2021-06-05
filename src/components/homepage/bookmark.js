import React, { useContext, useState } from "react";
import RemoveCircleOutlinedIcon from "@material-ui/icons/RemoveCircleOutlined";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "./context/UserContext";
import { X, Edit } from "react-feather";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Divider,
  makeStyles,
} from "@material-ui/core";
import { Menu, MenuItem } from "@material-ui/core/";
import produce from "immer";
import { BookmarkContext } from "./context/BookmarkContext";
import DialogActionButton from "../common/DialogActionButton";
import * as bookmarkApi from "../../api/bookmarkapi";

const useStyles = makeStyles({
  bookmarkTitle: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100px",
    whiteSpace: "nowrap",
  },
});
const Bookmark = (props) => {
  const classes = useStyles();
  const { jiggle, setFolders, selectedFolderId, folders } = useContext(
    UserContext
  );
  const { handleContextMenu } = useContext(BookmarkContext);
  const [open, setOpen] = useState(false);

  const handleClick = (url) => {
    // TODO Add noopener and noreferrer tags
    window.open(url, "_blank").focus();
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveBookmark = () => {
    const folderIndex = folders.findIndex(
      (folder) => folder._id === selectedFolderId
    );
    setFolders(
      produce((draft) => {
        draft[folderIndex].bookmarks.splice(
          draft[folderIndex].bookmarks.findIndex((bm) => bm._id === props._id),
          1
        );
      })
    );
    apiDeleteBookmark();
    setOpen(false);
  };
  const apiDeleteBookmark = () => {
    const payload = { _id: selectedFolderId, removeId: props._id };
    console.log("deleting bookmark's id front ", props._id);
    bookmarkApi.apiDeleteBookmark(payload);
  };

  return (
    <>
      {jiggle ? (
        <Grid item xs={12} container justify="center">
          <div onClick={handleOpen}>
            <RemoveCircleOutlinedIcon
              color="error"
              fontSize="large"
              className="delete-icon bookmark"
            />
          </div>
        </Grid>
      ) : (
        <></>
      )}

      <div
        className={
          jiggle
            ? "bookmark-wrapper not-hoverable"
            : "bookmark-wrapper hoverable"
        }
        onClick={() => handleClick(props.url)}
        onContextMenu={(e) => handleContextMenu(e, props._id)}
      >
        <img
          src={props.thumbnail}
          width="80"
          height="80"
          className={`bookmark-border ${props.color}`}
        ></img>

        <small className={props.title.length > 25 ? classes.bookmarkTitle : ""}>
          {props.title}
        </small>
      </div>

      <Dialog
        onClose={handleClose}
        open={open}
        aria-labelledby="remove-bookmark-dialog"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="remove-bookmark-dialog">
          <h5 className="dialog-title">Delete a Bookmark</h5>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            size="small"
            className="button-dialog-close"
          >
            <X />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          Do you really want to remove the bookmark?
        </DialogContent>

        <DialogActionButton>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disableTouchRipple
            className="button-100"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            disableElevation
            disableTouchRipple
            className="button-100"
            onClick={handleRemoveBookmark}
          >
            Remove
          </Button>
        </DialogActionButton>
      </Dialog>
    </>
  );
};
export default React.memo(Bookmark);
