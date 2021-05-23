import { ClickAwayListener, Input, makeStyles } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";
import { useForm, Controller } from "react-hook-form";
import produce from "immer";
import * as apiFolder from "../../api/folderapi";

const useStyles = makeStyles({
  input: {
    height: "20px",
    "&&&:before": { borderBottom: "none" },
    "&&:after": { borderBottom: "none" },
  },
});
const Folder = ({ folder, index }) => {
  const classes = useStyles();
  const {
    jiggle,
    selectedFolderId,
    setSelectedFolderId,
    folders,
    setFolders,
  } = useContext(UserContext);
  const [toggle, setToggle] = useState(true);
  const [title, setTitle] = useState(folders[index].title);
  const { control, handleSubmit } = useForm();

  const handleClick = (_id) => {
    setSelectedFolderId(_id);
  };
  const handleDoubleClick = () => {
    setToggle(false);
  };
  const handleClickAway = () => {
    setToggle(true);
    setFolders(
      produce((draft) => {
        draft[index].title = title;
      })
    );
  };
  const onChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div
        className={
          jiggle
            ? "folder-wrapper not-hoverable"
            : folder._id === selectedFolderId
            ? "folder-wrapper hoverable clicked"
            : "folder-wrapper hoverable"
        }
      >
        {toggle ? (
          <div
            className="folder-title"
            id={folder._id}
            onClick={() => handleClick(folder._id)}
            onDoubleClick={handleDoubleClick}
          >
            {folder.title}
          </div>
        ) : (
          <div className="folder-title">
            <form onSubmit={handleSubmit(handleClickAway)}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    className={classes.input}
                    autoComplete="off"
                    value={title}
                    onChange={onChange}
                    autoFocus
                  />
                )}
                name="title"
                control={control}
              />
            </form>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};
export default React.memo(Folder);
