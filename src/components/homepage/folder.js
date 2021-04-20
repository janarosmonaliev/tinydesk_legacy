import React, { useState, useCallback } from "react";
import { FolderPlus, X } from "react-feather";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  DialogActions,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const AddFolder = ({ onInsert }) => {
  const [open, setOpen] = useState(false);
  const [folderTitle, setFolderTitle] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setFolderTitle(event.target.value);
    console.log(`folder title is set to: ${event.target.value}`);
  };
  // const handleAdd = () => {
  //   console.log(`the folder with title ${folderTitle} will be added`);
  //   setFolderTitle("");
  //   setOpen(false);
  // };
  const handleAdd = useCallback(() => {
    onInsert(folderTitle);
    setFolderTitle("");
    setOpen(false);
  }, [onInsert, folderTitle]);

  const DialogActionButton = styled(DialogActions)({
    justifyContent: "left",
    marginLeft: "16px",
    marginBottom: "20px",
  });
  return (
    <>
      <div className="folder-wrapper" onClick={() => handleClickOpen()}>
        <div className="add-folder">
          <FolderPlus size={20} color={"#4f4f4f"} />
        </div>
      </div>

      <Dialog
        onClose={handleClose}
        open={open}
        aria-labelledby="add-folder-dialog"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="add-folder-dialog">
          <h5 className="dialog-title">Add a new folder</h5>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            size="small"
            className="button-dialog-close"
          >
            <X />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form className="test">
            <TextField
              required
              id="add-folder-name"
              label="Folder name"
              fullWidth
              autoFocus
              autoComplete="off"
              value={folderTitle}
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActionButton>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disableTouchRipple
            onClick={handleAdd}
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
export default AddFolder;
