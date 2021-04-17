import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@material-ui/core";
import classNames from "classnames";
import { SvgIcon, IconButton, DialogActions, Button } from "@material-ui/core";
import { Grid, List, ListItem, Divider, ListItemText } from "@material-ui/core";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { X, Plus, XCircle } from "react-feather";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { DragIndicatorSharp } from "@material-ui/icons";

const TodoListWindow = forwardRef((tl, ref) => {
  const [todolists, setTodolists] = useState(tl.todolist.todolist);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // For the parent to access the child (Widget -> Window)
  useImperativeHandle(ref, () => ({
    clickOpen: () => {
      handleClickOpen();
    },
  }));

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [displayedTodolist, setDisplayedTodolist] = useState(
    todolists.filter((todolist) => todolist.index === selectedIndex)
  );
  const handleSelectList = (e, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (selectedIndex != -1) {
      setDisplayedTodolist(
        todolists.filter((todolist) => todolist.index === selectedIndex)
      );
    }
  }, [selectedIndex]);

  const handleDoubleClick = () => {
    const newTodolists = [...todolists];
    newTodolists[selectedIndex].toggle = false;
    setTodolists(newTodolists);
  };
  const handleChange = (e) => {
    console.log(todolists);
    const newTodolists = [...todolists];
    newTodolists[selectedIndex].title = e.target.value;
    setTodolists(newTodolists);
  };
  const handleKeyDown = (e) => {
    if (todolists.length == 0) {
      console.log("hello");
      return;
    }
    if (e.key === "Enter" || e.type === "click") {
      const newTodolists = [...todolists];
      if (newTodolists[selectedIndex].title === "") {
        newTodolists[selectedIndex].title = "New List";
      }
      newTodolists[selectedIndex].toggle = true;
      setTodolists(newTodolists);
    }
  };
  const nextIndex = useRef(todolists.length);
  const onClickAddTodoList = useCallback(() => {
    setTodolists(todolists.map((todolist) => (todolist.toggle = true)));
    setTodolists(
      todolists.map((todolist) =>
        todolist.title === "" ? (todolist.title = "New List") : todolist.title
      )
    );
    const newTodolist = {
      title: "",
      index: nextIndex.current,
      toggle: false,
      todos: [],
    };
    setSelectedIndex(nextIndex.current);
    setTodolists(todolists.concat(newTodolist));

    nextIndex.current += 1;
  });

  const onClickDeleteTodoList = useCallback((e, data) => {
    setTodolists(todolists.filter((todolist) => todolist.index !== data.index));
    if (todolists.length != 1) {
      setSelectedIndex(0);
    } else {
      setDisplayedTodolist(null);
      setSelectedIndex(-1);
    }
    nextIndex.current -= 1;
  });

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      aria-labelledby="todo-list-dialog"
      classes={{ paper: "todo-list-window" }}
    >
      <DialogTitle id="todo-list-dialog">
        <h5 className="dialog-title">To-Do List Widget</h5>
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
      <DialogContent onClick={handleKeyDown}>
        <Grid
          container
          // xs={12}
          direction="row"
          // justify="flex-start"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={3}>
            <List component="nav" aria-label="to-do lists">
              {/* TODO Map a JSON object to display content */}
              {todolists.map((todolist) => (
                <>
                  {todolist.toggle ? (
                    <>
                      <ContextMenuTrigger
                        id={classNames(
                          `todolist-context-menu-${todolist.index}`
                        )}
                      >
                        <ListItem
                          button
                          selected={selectedIndex === todolist.index}
                          onClick={(e) => handleSelectList(e, todolist.index)}
                          onDoubleClick={handleDoubleClick}
                        >
                          <ListItemText primary={todolist.title}></ListItemText>
                        </ListItem>
                      </ContextMenuTrigger>
                      <Divider light />
                    </>
                  ) : (
                    <>
                      <ListItem>
                        <TextField
                          value={todolist.title}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          autoFocus
                        ></TextField>
                      </ListItem>
                      <Divider light />
                    </>
                  )}
                </>
              ))}
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem light />

          <Grid item xs>
            <h5>
              {displayedTodolist == null ? "" : displayedTodolist[0].title}
            </h5>

            {displayedTodolist != null ? (
              displayedTodolist[0].todos.map((todo) => (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="gilad"
                        color="primary"
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                      />
                    }
                    label={todo.title}
                  />
                  <br />
                </>
              ))
            ) : (
              <div></div>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        {todolists.map((todolist) => (
          <ContextMenu
            id={classNames(`todolist-context-menu-${todolist.index}`)}
          >
            <MenuItem
              onClick={onClickDeleteTodoList}
              data={{ index: todolist.index }}
            >
              <Grid container alignItems="center">
                <XCircle size={20} color={"#eb5757"} />
                &nbsp;Delete
              </Grid>
            </MenuItem>
          </ContextMenu>
        ))}
        <Button
          startIcon={<Plus />}
          disableTouchRipple
          onClick={onClickAddTodoList}
        >
          Add a new list
        </Button>
      </DialogActions>
    </Dialog>
  );
});
export default TodoListWindow;
