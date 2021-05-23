import React, { useState, useContext, useCallback } from "react";
import Folder from "./folder";
import Grid from "@material-ui/core/Grid";
import RemoveCircleOutlinedIcon from "@material-ui/icons/RemoveCircleOutlined";
import { X } from "react-feather";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Divider,
} from "@material-ui/core";

import { UserContext } from "./context/UserContext";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import AddFolder from "./add-folder";
import DialogActionButton from "../common/DialogActionButton";
import arrayMove from "array-move";
import * as apiFolder from "../../api/folderapi";

const SortableFolder = SortableElement(({ value, sortIndex }) => (
  <Folder folder={value} index={sortIndex} />
));
const SortableFolders = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableFolder
          key={value._id}
          value={value}
          index={index}
          sortIndex={index}
        />
      ))}
    </div>
  );
});

const FoldersWrapper = () => {
  const {
    jiggle,
    folders,
    setFolders,
    setSelectedFolderId,
    selectedFolderId,
  } = useContext(UserContext);

  const [openDelete, setOpenDelete] = useState(false);
  const [folderId, setFolderId] = useState("");
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setFolderId("");
  };
  const handleOpenDelete = (_id) => {
    setOpenDelete(true);
    setFolderId(_id);
  };

  const handleRemoveFolder = () => {
    if (folders.length === 1) {
      alert("You must have at least one folder");
      return;
    }
    //special handling when removing first folder
    if (folderId === folders[0]._id) {
      setSelectedFolderId(folders[1]._id);
    } else if (folderId === selectedFolderId) {
      setSelectedFolderId(folders[0]._id);
    }
    setFolders(folders.filter((folder) => folder._id !== folderId));
    apiDeleteFolder(folderId);
    setOpenDelete(false);
    setFolderId(-1);
  };

  const apiDeleteFolder = useCallback((folderId) => {
    console.log("the folder's id to delete is ", folderId, typeof folderId);
    const payload = { remove: folderId };
    //const data = { data: payload };
    apiFolder.apiDeleteFolder(payload);
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setFolders(arrayMove(folders, oldIndex, newIndex));
    apiChangeFolderPosition(folders[oldIndex]._id, newIndex);
  };

  const apiChangeFolderPosition = (folderId, newIndex) => {
    const data = { _id: folderId, newIndex: newIndex };
    apiFolder.apiChangeFolderPosition(data);
  };

  return (
    <>
      <div className="folders-wrapper">
        {jiggle ? (
          <>
            {folders.map((folder, index) => (
              <div key={folder._id}>
                <Grid
                  item
                  xs
                  container
                  className={jiggle ? "folders-jiggle" : ""}
                  justify="flex-end"
                >
                  <RemoveCircleOutlinedIcon
                    color="error"
                    fontSize="small"
                    className="delete-icon folder"
                    onClick={() => handleOpenDelete(folder._id)}
                  />
                  <Folder folder={folder} index={index} />
                </Grid>
              </div>
            ))}
          </>
        ) : (
          <SortableFolders
            items={folders}
            onSortEnd={onSortEnd}
            axis="x"
            distance={5}
          />
        )}

        <AddFolder />
      </div>
      <Dialog
        onClose={handleCloseDelete}
        open={openDelete}
        aria-labelledby="remove-folder-dialog"
        key="hello432"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="remove-folder-dialog">
          <h5 className="dialog-title">Delete a folder</h5>
          <IconButton
            aria-label="close"
            onClick={handleCloseDelete}
            size="small"
            className="button-dialog-close"
          >
            <X />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          Do you really want to remove the folder? Removing folder will delete
          all bookmarks in the folder.
        </DialogContent>

        <DialogActionButton>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disableTouchRipple
            className="button-100"
            onClick={handleCloseDelete}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            disableElevation
            disableTouchRipple
            className="button-100"
            onClick={handleRemoveFolder}
          >
            Remove
          </Button>
        </DialogActionButton>
      </Dialog>
    </>
  );
};
export default React.memo(FoldersWrapper);
