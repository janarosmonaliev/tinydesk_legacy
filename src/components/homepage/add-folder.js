import React, { useCallback, useContext, useState } from "react";
import nextId from "react-id-generator";
import { FolderPlus, X } from "react-feather";
import {
  Button,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Dialog,
  Typography,
} from "@material-ui/core";
import { UserContext } from "./context/UserContext";
import DialogActionButton from "../common/DialogActionButton";
import * as apiFolder from "../../api/folderapi";

const AddFolder = () => {
  const { folders, setFolders, setSelectedFolderId } = useContext(UserContext);

  const onInsert = useCallback((title) => {
    const newFolder = {
      title: title,
      _id: nextId(),
      bookmarks: [],
    };
    apiAddFolder(title);
    setFolders(folders.concat(newFolder));
    setSelectedFolderId(newFolder._id);
  });

  const apiAddFolder = (title) => {
    const data = { title: title };
    apiFolder.apiAddFolder(data);
  };

  const [open, setOpen] = useState(false);
  const [folderTitle, setFolderTitle] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    if (isEmpty) {
      setIsEmpty(false);
    }
    setFolderTitle(event.target.value);
  };

  //preventDefault let you prevent entering with /? query string at the end
  const handleAdd = useCallback(
    (e) => {
      e.preventDefault();
      if (folderTitle === "") {
        setIsEmpty(true);
        return;
      }
      onInsert(folderTitle);
      setFolderTitle("");
      setOpen(false);
      setIsEmpty(false);
      // setSelectedFolderId();
    },
    [onInsert, folderTitle]
  );

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
          <form className="test" onSubmit={handleAdd}>
            <TextField
              required
              id="add-folder-name"
              label="Folder name"
              error={isEmpty}
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
