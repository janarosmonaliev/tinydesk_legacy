import React, { useCallback, useState, useRef } from "react";
import Folder from "./folder";
import Grid from "@material-ui/core/Grid";
import RemoveCircleOutlinedIcon from "@material-ui/icons/RemoveCircleOutlined";
import { FolderPlus, X } from "react-feather";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  DialogActions,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import nextId from "react-id-generator";

export default function FoldersWrapper({
  folders,
  setFolders,
  selectedFolderId,
  setSelectedFolderId,
  jiggle,
}) {
  const handleDeleteFolder = (e) => {
    console.log("HELLO");
  };
  const AddFolder = ({ folders, setFolders }) => {
    const onInsert = useCallback((title) => {
      const newFolder = {
        title: title,
        id: nextId(),
        bookmarks: [],
      };
      setFolders(folders.concat(newFolder));
    });
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

  return (
    <div className="folders-wrapper">
      {folders.map((folder) => (
        <Grid
          item
          xs
          container
          className={jiggle ? "folders-jiggle" : ""}
          justify="flex-end"
        >
          {jiggle ? (
            <RemoveCircleOutlinedIcon
              color="error"
              fontSize="small"
              className="delete-icon folder"
              onClick={handleDeleteFolder}
            />
          ) : (
            <></>
          )}

          <Folder
            folder={folder}
            selectedFolderId={selectedFolderId}
            setSelectedFolderId={setSelectedFolderId}
            jiggle={jiggle}
          />
        </Grid>
      ))}
      <AddFolder folders={folders} setFolders={setFolders} />
    </div>
  );
}
