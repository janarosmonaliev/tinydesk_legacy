import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  ClickAwayListener,
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
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const TodoListWindow = forwardRef(({ todolists, setTodolists }, ref) => {
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

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(
    todolists.length === 0 ? -1 : todolists[0].id
  );
  const [displayedTodolist, setDisplayedTodolist] = useState(
    todolists.filter((todolist) => todolist.id === selectedId)
  );

  //Open / Close Modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);

    const newArr = [];
    todolists.map((todolist) =>
      newArr.push({
        ...todolist,
        todos: todolist.todos.filter((todo) => !todo.isCompleted),
      })
    );
    setTodolists(newArr);
  };

  // For the parent to access the child (Widget -> Window)
  useImperativeHandle(ref, () => ({
    clickOpen: () => {
      handleClickOpen();
    },
  }));

  //Todolist methods
  const handleSelectList = (e, id) => {
    setSelectedId(id);
    setSelectedIndex(todolists.findIndex((todolist) => todolist.id === id));
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

  const handleDoubleClickTodolist = () => {
    setTodolists(
      produce((draft) => {
        draft[selectedIndex].toggle = false;
      })
    );
    setTodolistFocus(true);
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

  // Handle ClickAway
  const handleCloseTextfield = (e) => {
    if (todolists.length == 0) {
      return;
    }

    if (todolistFocus) {
      const textFieldIndex = todolists.findIndex((tl) => !tl.toggle);
      setTodolists(
        produce((draft) => {
          draft[textFieldIndex].title =
            draft[textFieldIndex].title === ""
              ? "New List"
              : draft[textFieldIndex].title;
          draft[textFieldIndex].toggle = true;
        })
      );
      setTodolistFocus(false);
    }
  };
  //onClcik handler
  const handleTodolistClickAway = (e) => {
    handleCloseTextfield(e);
  };
  //onEnter handler
  const onEnterTodolist = (e) => {
    e.preventDefault();
    handleCloseTextfield(e);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodolists(
      produce((draft) => {
        draft[selectedIndex].title = value;
      })
    );
  };

  const onClickAddTodoList = () => {
    if (todolistFocus) {
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

  useEffect(() => {
    if (selectedId != -1) {
      setDisplayedTodolist(
        todolists.filter((todolist) => todolist.id == selectedId)
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
    }
  }, [selectedId, todolists[selectedIndex]]);

  //Todo Methods
  const handleKeyDownTodo = (e) => {
    const type = e.type;
    const nodeName = e.target.nodeName;
    const targetType = e.target.type;
    const targetId = e.target.id;

    if (
      //If it is toggling checkbox
      (type === "click" && targetType === "checkbox") ||
      //If it is another todo
      targetId === "todos-keep-click-away" ||
      targetId === "todo-wrapper" ||
      nodeName === "SPAN" ||
      //If clicking title
      nodeName === "H5" ||
      selectedId === -1
    ) {
      return;
    }
    if (type === "click" && !todoFocus.focus) {
      //When user clicks new todo when focus is on todolist widget
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

  useEffect(() => {
    if (!todoFocus.focus) {
      setTodolists(
        produce((draft) => {
          draft[selectedIndex].todos.map((todo) =>
            !todo.toggle ? (todo.toggle = true) : todo.toggle
          );
          draft[selectedIndex].todos.map((todo) =>
            todo.title === "" ? (todo.title = "New Todo") : todo.title
          );
        })
      );
    }
  }, [todoFocus]);

  //When Clicking different todolist,
  useEffect(() => {
    const newFocus = { focus: false, id: -1 };
    setTodoFocus(newFocus);
  }, [selectedIndex]);

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

  const handleChangeTodo = (e, id) => {
    const { name, value } = e.target;
    setTodolists(
      produce((draft) => {
        draft[selectedIndex].todos[todoFocus.index].title = value;
      })
    );
  };

  const checkBoxToggle = (e, index) => {
    if (todoFocus.focus) {
      const newFocus = { focus: false, index: -1 };
      setTodoFocus(newFocus);
    }
    setTodolists(
      produce((draft) => {
        draft[selectedIndex].todos[index].isCompleted = !draft[selectedIndex]
          .todos[index].isCompleted;
      })
    );
  };

  const onEnterTodo = (e) => {
    e.preventDefault();
    handleCloseTodoTextfield(e);
  };
  const handleTodoClickAway = (e) => {
    handleCloseTodoTextfield(e);
  };
  const handleCloseTodoTextfield = (e) => {
    const focus = { focus: false, index: -1 };
    setTodoFocus(focus);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      aria-labelledby="todo-list-dialog"
      classes={{ paper: "widget-window" }}
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
          className="widget-window-content"
          spacing={3}
        >
          <Grid
            item
            xs={3}
            onContextMenu={handleContextMenu}
            classNames="sortable-todolist-item"
          >
            <List component="nav" aria-label="to-do lists">
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
                        <ListItemText primary={todolist.title} />
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
                        <ClickAwayListener
                          onClickAway={handleTodolistClickAway}
                        >
                          <form
                            onSubmit={onEnterTodolist}
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              value={todolist.title}
                              onChange={handleChange}
                              autoFocus
                            />
                          </form>
                        </ClickAwayListener>
                      </ListItem>

                      <Divider light />
                    </>
                  )}
                </>
              ))}
            </List>
          </Grid>

          <Divider orientation="vertical" flexItem />
          <Grid item xs={8} onClick={handleKeyDownTodo}>
            <h5>
              {displayedTodolist == null ? "" : displayedTodolist[0].title}
            </h5>
            {displayedTodolist != null ? (
              displayedTodolist[0].todos.map((todo) => (
                <>
                  <Grid
                    container
                    alignItems="center"
                    id="todos-keep-click-away"
                    className="todo-list-todo-grid"
                  >
                    <Grid item xs={1}>
                      <Checkbox
                        name={todo.id}
                        color="primary"
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        checked={todo.isCompleted}
                        onChange={(e) =>
                          checkBoxToggle(
                            e,
                            displayedTodolist[0].todos.findIndex(
                              (t) => t.id === todo.id
                            )
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={11} id="todo-wrapper">
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
                        <form onSubmit={onEnterTodo}>
                          <ClickAwayListener onClickAway={handleTodoClickAway}>
                            <TextField
                              style={{ width: "80%" }}
                              value={todo.title}
                              onChange={(e) => handleChangeTodo(e, todo.id)}
                              onKeyDown={handleKeyDownTodo}
                              autoFocus
                            />
                          </ClickAwayListener>
                        </form>
                      )}
                    </Grid>
                  </Grid>
                </>
              ))
            ) : (
              <></>
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
