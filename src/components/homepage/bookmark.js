import React, { useContext, useState } from "react";
import RemoveCircleOutlinedIcon from "@material-ui/icons/RemoveCircleOutlined";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "./context/UserContext";
import { X } from "react-feather";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  DialogActions,
  Divider,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import produce from "immer";

const DialogActionButton = styled(DialogActions)({
  justifyContent: "left",
  marginLeft: "16px",
  marginBottom: "20px",
});
export default function Bookmark(props) {
  const { jiggle, setFolders, selectedFolderId, folders } = useContext(
    UserContext
  );
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
      (folder) => folder.id === selectedFolderId
    );
    setFolders(
      produce((draft) => {
        draft[folderIndex].bookmarks.splice(
          draft[0].bookmarks.findIndex((bm) => bm.id === props.id),
          1
        );
      })
    );
    setOpen(false);
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
      >
        <img src={props.thumbnail} width="80" height="80"></img>

        <small>{props.title}</small>
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
}
