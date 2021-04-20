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
import { SvgIcon, IconButton, DialogActions, Button } from "@material-ui/core";
import { Grid, List, ListItem, Divider, ListItemText } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { X, Plus, XCircle } from "react-feather";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import produce from "immer";
import nextId from "react-id-generator";
import { Menu, MenuItem } from "@material-ui/core/";

const TodoListWindow = forwardRef((tl, ref) => {
  //Props todolist from App
  const [todolists, setTodolists] = useState(tl.todolist.todolist);
  //Open and close modal
  const [open, setOpen] = useState(false);
  //Track whether a user makes change in todolist (ex) edit title, make new todolist)
  const [todolistFocus, setTodolistFocus] = useState(false);
  //Track whether a user makes change in todo (ex) edit title, make new todo)
  const [todoFocus, setTodoFocus] = useState({ focus: false, index: -1 });
  //Keep track what todolist's next index should be
  const nextIndexTodolist = useRef(todolists.length);
  //Keep track what todo's next index should be
  const [nextIndexTodo, setNextIndexTodo] = useState(0);
  //Context menu's initial position
  const initialMousPos = {
    mouseX: null,
    mouseY: null,
  };
  //Decide Context menu's position
  const [mousePos, setMousePos] = useState(initialMousPos);
  //Keep track which todolist user right-clicks
  const [todolistIdForContextMenu, setTodolistIdForContextMenu] = useState(
    null
  );
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleContextMenu = (e, id) => {
    if (id != null) {
      setTodolistIdForContextMenu(id);
    }
    e.preventDefault();
    //If contextmenu is already opened, just close it
    if (mousePos.mouseX != null) {
      setMousePos(initialMousPos);
    } else {
      setMousePos({
        mouseX: e.clientX - 2,
        mouseY: e.clientY - 4,
      });
    }
  };

  const handleContextMenuClose = () => {
    setMousePos(initialMousPos);
  };
  // For the parent to access the child (Widget -> Window)
  useImperativeHandle(ref, () => ({
    clickOpen: () => {
      handleClickOpen();
    },
  }));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(0);

  const [displayedTodolist, setDisplayedTodolist] = useState(
    todolists.filter((todolist) => todolist.id === selectedId)
  );
  const handleSelectList = (e, id) => {
    setSelectedId(id);
    setSelectedIndex(todolists.findIndex((todolist) => todolist.id === id));
  };

  useEffect(() => {
    console.log("3");
    if (!todoFocus.focus) {
      console.log("4");
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
    if (selectedId != -1) {
      setDisplayedTodolist(
        todolists.filter((todolist) => todolist.id === selectedId)
      );

      //If displayedTodolist is null
      //even above code seems like sets displayedTodolist,
      //at this point, it is still null.
      //This is special handling when todolist is just created
      //when there is no todolist before that.
      if (displayedTodolist === null) {
        setNextIndexTodo(0);
      } else {
        setNextIndexTodo(displayedTodolist[0].todos.length);
      }
      console.log("7");
    }
  }, [selectedId, todolists[selectedIndex]]);
  useEffect(() => {
    console.log("7");
    const newFocus = { focus: false, id: -1 };
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
        draft[selectedIndex].todos.map((todo) =>
          !todo.toggle ? (todo.toggle = true) : todo.toggle
        );
      })
    );

    const focus = { focus: true, index: index };
    setTodoFocus(focus);
    setTodolists(
      produce((draft) => {
        draft[selectedIndex].todos[index].toggle = false;
      })
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodolists(
      produce((draft) => {
        draft[selectedIndex].title = value;
      })
    );
  };

  const handleChangeTodo = (e, id) => {
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
      e.target.nodeName === "SPAN" ||
      e.target.nodeName === "H5"
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
      //When user clicks new todo when focus is on todolist widget
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
      const newTodo = {
        title: "",
        isCompleted: false,
        toggle: false,
        id: nextId(),
      };
      setTodolists(
        produce((draft) => {
          draft[selectedIndex].todos.push(newTodo);
        })
      );

      if (displayedTodolist[0].todos.length === 0) {
        const focus = { focus: true, index: 0 };
        setTodoFocus(focus);
      } else {
        const focus = { focus: true, index: nextIndexTodo };
        setTodoFocus(focus);
      }
    }
  };

  const onClickAddTodoList = () => {
    console.log("1");
    if (todolistFocus) {
      console.log("2");
      const newFocus = { focus: false, index: -1 };
      setTodoFocus(newFocus);
      return;
    }

    const newTodolist = {
      title: "",
      id: nextId(),
      toggle: false,
      todos: [],
    };
    setSelectedId(newTodolist.id);
    setSelectedIndex(nextIndexTodolist.current);
    setTodolists(todolists.concat(newTodolist));
    setTodolistFocus(true);
    const focus = { focus: false, index: -1 };
    setTodoFocus(focus);
    nextIndexTodolist.current += 1;
  };

  const handleContextMenuDeleteTodoList = useCallback(() => {
    setMousePos(initialMousPos);

    setTodolists(
      todolists.filter((todolist) => todolist.id !== todolistIdForContextMenu)
    );

    if (todolists.length != 1) {
      //Reset to first todolist
      if (todolistIdForContextMenu == todolists[0].id) {
        setSelectedId(todolists[1].id);
      } else {
        setSelectedId(todolists[0].id);
      }
    } else {
      setDisplayedTodolist(null);
      setSelectedId(-1);
    }
    setTodolistIdForContextMenu(null);
    nextIndexTodolist.current -= 1;
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
          <Grid
            item
            xs={3}
            onClick={handleKeyDownTodolist}
            onContextMenu={handleContextMenu}
          >
            <List component="nav" aria-label="to-do lists">
              {/* TODO Map a JSON object to display content */}
              {todolists.map((todolist) => (
                <>
                  {todolist.toggle ? (
                    <>
                      <ListItem
                        button
                        selected={selectedId === todolist.id}
                        onClick={(e) => handleSelectList(e, todolist.id)}
                        onDoubleClick={handleDoubleClickTodolist}
                        onContextMenu={(e) => handleContextMenu(e, todolist.id)}
                      >
                        <ListItemText primary={todolist.title}></ListItemText>
                      </ListItem>
                      <Menu
                        keepMounted
                        open={mousePos.mouseY !== null}
                        onClose={handleContextMenuClose}
                        anchorReference="anchorPosition"
                        anchorPosition={
                          mousePos.mouseY !== null && mousePos.mouseX !== null
                            ? { top: mousePos.mouseY, left: mousePos.mouseX }
                            : undefined
                        }
                      >
                        <MenuItem
                          onClick={handleContextMenuDeleteTodoList}
                          style={{ color: "#EB5757" }}
                        >
                          <XCircle /> &nbsp; Delete
                        </MenuItem>
                      </Menu>
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
                      name={todo.id}
                      color="primary"
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      checked={todo.isCompleted}
                      onChange={(e) =>
                        checkBoxToggle(
                          e,
                          displayedTodolist[0].todos.findIdex(
                            (t) => t.id === todo.id
                          )
                        )
                      }
                    />
                    {todo.toggle ? (
                      <ListItemText
                        primary={todo.title}
                        onDoubleClick={() =>
                          handleDoubleClickTodo(
                            displayedTodolist[0].todos.findIndex(
                              (t) => t.id === todo.id
                            )
                          )
                        }
                      ></ListItemText>
                    ) : (
                      <TextField
                        style={{ width: "80%" }}
                        value={todo.title}
                        onChange={(e) => handleChangeTodo(e, todo.id)}
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
