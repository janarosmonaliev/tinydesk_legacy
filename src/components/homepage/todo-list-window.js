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
  Typography,
  Paper,
} from "@material-ui/core";
import classNames from "classnames";
import { SvgIcon, IconButton, DialogActions, Button } from "@material-ui/core";
import { Grid, List, ListItem, Divider, ListItemText } from "@material-ui/core";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { X, Plus, XCircle } from "react-feather";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { DragIndicatorSharp, SettingsInputHdmiSharp } from "@material-ui/icons";
import produce from "immer";

const TodoListWindow = forwardRef((tl, ref) => {
  const [todolists, setTodolists] = useState(tl.todolist.todolist);
  const [open, setOpen] = useState(false);
  const [todolistFocus, setTodolistFocus] = useState(false);
  const [todoFocus, setTodoFocus] = useState({ focus: false, index: -1 });
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
    if (!todoFocus.focus) {
      setTodolists(
        produce((draft) => {
          draft[selectedIndex].todos.map((todo) =>
            !todo.toggle ? (todo.toggle = true) : todo.toggle
          );
        })
      );
      setTodolists(
        produce((draft) => {
          draft[selectedIndex].todos.map((todo) =>
            todo.title === "" ? (todo.title = "New Todo") : todo.title
          );
        })
      );
    }
  }, [todoFocus]);

  useEffect(() => {
    if (selectedIndex != -1) {
      setDisplayedTodolist(
        todolists.filter((todolist) => todolist.index === selectedIndex)
      );
    }
  }, [selectedIndex, todolists[selectedIndex]]);
  useEffect(() => {
    const newFocus = { focus: false, index: -1 };
    setTodoFocus(newFocus);
  }, [selectedIndex]);

  const handleDoubleClickTodolist = () => {
    setTodolists(
      produce((draft) => {
        draft[selectedIndex].toggle = false;
      })
    );
    setTodolistFocus(true);
  };
  const handleDoubleClickTodo = (index) => {
    setTodolists(
      produce((draft) => {
        draft[selectedIndex].todos[index].toggle = false;
      })
    );
    const focus = { focus: true, index: index };
    setTodoFocus(focus);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodolists(
      produce((draft) => {
        draft[selectedIndex].title = value;
      })
    );
  };

  const handleChangeTodo = (e) => {
    const { name, value } = e.target;
    setTodolists(
      produce((draft) => {
        draft[selectedIndex].todos[todoFocus.index].title = value;
      })
    );
  };

  // Working on Todolist
  const handleKeyDownTodolist = (e) => {
    if (todolists.length == 0) {
      return;
    }
    if (e.key === "Enter" || e.type === "click") {
      if (todolistFocus) {
        setTodolists(
          produce((draft) => {
            draft[selectedIndex].title =
              draft[selectedIndex].title === ""
                ? "New List"
                : draft[selectedIndex].title;
            draft[selectedIndex].toggle = true;
          })
        );
        setTodolistFocus(false);
      }
    }
  };
  const handleKeyDownTodo = (e) => {
    if (
      (e.type === "click" && e.target.type === "checkbox") ||
      e.target.id === "todos-keep-click-away" ||
      e.target.nodeName === "SPAN"
    ) {
      return;
    }
    if (
      (e.key === "Enter" && todoFocus.focus) ||
      (e.type === "click" && todoFocus.focus)
    ) {
      if (todoFocus.focus) {
        const focus = { focus: false, index: -1 };
        setTodoFocus(focus);
      }
    } else if (e.type === "click" && !todoFocus.focus) {
      const newTodo = {
        title: "",
        isCompleted: false,
        toggle: false,
        index: todolists[selectedIndex].todos.length,
      };
      setTodolists(
        produce((draft) => {
          draft[selectedIndex].todos.push(newTodo);
        })
      );
      const focus = { focus: true, index: newTodo.index };
      setTodoFocus(focus);
    }
  };

  const nextIndex = useRef(todolists.length);
  const onClickAddTodoList = () => {
    if (todolistFocus) {
      const newFocus = { focus: false, index: -1 };
      setTodoFocus(newFocus);
      return;
    }

    const newTodolist = {
      title: "",
      index: nextIndex.current,
      toggle: false,
      todos: [],
    };

    setSelectedIndex(nextIndex.current);
    setTodolists(todolists.concat(newTodolist));
    setTodolistFocus(true);
    const focus = { focus: false, index: -1 };
    setTodoFocus(focus);
    nextIndex.current += 1;
  };

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

  const checkBoxToggle = (e, index) => {
    setTodolists(
      produce((draft) => {
        draft[selectedIndex].todos[index].isCompleted = !draft[selectedIndex]
          .todos[index].isCompleted;
      })
    );
  };

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
      <DialogContent>
        <Grid
          container
          // xs={12}
          direction="row"
          // justify="flex-start"
          alignItems="stretch"
          spacing={3}
          style={{ height: "50vh" }}
        >
          <Grid item xs={3} onClick={handleKeyDownTodolist}>
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
                          onDoubleClick={handleDoubleClickTodolist}
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
                          onKeyDown={handleKeyDownTodolist}
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

          <Grid item xs onClick={handleKeyDownTodo}>
            <h5>
              {displayedTodolist == null ? "" : displayedTodolist[0].title}
            </h5>

            {displayedTodolist != null ? (
              displayedTodolist[0].todos.map((todo) => (
                <>
                  <Grid
                    container
                    item
                    xs={12}
                    alignItems="center"
                    id="todos-keep-click-away"
                  >
                    <Checkbox
                      name={todo.index}
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      checked={todo.isCompleted}
                      onChange={(e) => checkBoxToggle(e, todo.index)}
                    />
                    {todo.toggle ? (
                      <ListItemText
                        primary={todo.title}
                        onDoubleClick={() => handleDoubleClickTodo(todo.index)}
                      ></ListItemText>
                    ) : (
                      <TextField
                        style={{ width: "80%" }}
                        value={todo.title}
                        onChange={handleChangeTodo}
                        onKeyDown={handleKeyDownTodo}
                        autoFocus
                      ></TextField>
                    )}
                  </Grid>
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
