import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useCallback,
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
import axios from "axios";

const TodoListWindow = forwardRef(
  ({ todolists, setTodolists, open, setOpen }, ref) => {
    //Keep track what todolist's next index should be
    const nextIndexTodolist = useRef();
    nextIndexTodolist.current = todolists.length;
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

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedId, setSelectedId] = useState(
      todolists.length === 0 ? -1 : todolists[0]._id
    );

    const todoRef = useRef(null);

    //Open / Close Modal
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);

      //Before close it, remove all the checked todos
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
    const handleSelectList = (e, _id) => {
      setSelectedId(_id);
      setSelectedIndex(todolists.findIndex((todolist) => todolist._id === _id));
    };

    //Open ContextMenu on todolist & save its todolist id
    const handleContextMenu = (e, _id) => {
      if (_id != null) {
        setTodolistIdForContextMenu(_id);
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

    //Start Editing mode for todolist
    const handleDoubleClickTodolist = () => {
      setTodolists(
        produce((draft) => {
          draft[selectedIndex].toggle = false;
        })
      );
    };

    //Delete Todolist with context menu
    const handleContextMenuDeleteTodoList = useCallback(() => {
      setMousePos(initialMousPos);

      setTodolists(
        todolists.filter(
          (todolist) => todolist._id !== todolistIdForContextMenu
        )
      );
      apiDeleteTodolist();
      if (todolists.length != 1) {
        //Reset to first todolist
        if (todolistIdForContextMenu == todolists[0]._id) {
          setSelectedId(todolists[1]._id);
          setSelectedIndex(1);
        } else {
          setSelectedId(todolists[0]._id);
          setSelectedIndex(0);
        }
      } else {
        setSelectedId(-1);
        setSelectedIndex(-1);
      }
      setTodolistIdForContextMenu(null);
      nextIndexTodolist.current -= 1;
    });

    const apiDeleteTodolist = useCallback(() => {
      axios({
        method: "DELETE",
        data: {
          removeId: todolistIdForContextMenu,
        },
        withCredentials: true,
        url: "http://localhost:4000/home/todolist", // <-------- We have to change this before Milestone 3 deadline to use the Heroku backend
      }).then((res) => console.log(res));
    });

    // Handle ClickAway
    const handleCloseTextfield = (e) => {
      if (todolists.length == 0) {
        return;
      }
      const textFieldIndex = todolists.findIndex((tl) => !tl.toggle);
      setTodolists(
        produce((draft) => {
          draft[textFieldIndex].title =
            draft[textFieldIndex].title === ""
              ? "New List"
              : draft[textFieldIndex].title;
          draft[textFieldIndex].toggle = true;
          apiAddTodolist(draft[textFieldIndex].title);
        })
      );
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

    //POST
    const onClickAddTodoList = () => {
      const newTodolist = {
        title: "",
        _id: nextId(),
        toggle: false,
        todos: [],
      };
      //apiAddTodolist();
      setSelectedId(newTodolist._id);
      setSelectedIndex(nextIndexTodolist.current);
      setTodolists(todolists.concat(newTodolist));
      nextIndexTodolist.current += 1;
    };
    const apiAddTodolist = useCallback((title) => {
      axios({
        method: "POST",
        data: {
          title: title,
        },
        withCredentials: true,
        url: "http://localhost:4000/home/todolist", // <-------- We have to change this before Milestone 3 deadline to use the Heroku backend
      }).then((res) => console.log(res));
    });
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
        targetType === "text" ||
        targetId === "todos-keep-click-away" ||
        targetId === "todo-wrapper" ||
        nodeName === "SPAN" ||
        //If clicking title
        nodeName === "H5" ||
        selectedId === -1
      ) {
        return;
      }
      if (type === "click" && todoRef.current == null) {
        const newTodo = {
          title: "",
          isCompleted: false,
          toggle: false,
          _id: nextId(),
        };
        setTodolists(
          produce((draft) => {
            draft[selectedIndex].todos.push(newTodo);
          })
        );
      }
    };

    //Start todo editing mode
    const handleDoubleClickTodo = (_id) => {
      const index = todolists[selectedIndex].todos.findIndex(
        (todo) => todo._id === _id
      );
      setTodolists(
        produce((draft) => {
          draft[selectedIndex].todos[index].toggle = false;
        })
      );
    };

    const handleChangeTodo = (e, _id) => {
      const index = todolists[selectedIndex].todos.findIndex(
        (todo) => todo._id === _id
      );
      const { name, value } = e.target;
      setTodolists(
        produce((draft) => {
          draft[selectedIndex].todos[index].title = value;
        })
      );
    };

    const checkBoxToggle = (e, _id) => {
      const index = todolists[selectedIndex].todos.findIndex(
        (todo) => todo._id === _id
      );
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
                          selected={selectedId === todolist._id}
                          onClick={(e) => handleSelectList(e, todolist._id)}
                          onDoubleClick={handleDoubleClickTodolist}
                          onContextMenu={(e) =>
                            handleContextMenu(e, todolist._id)
                          }
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
                {selectedIndex != -1 ? todolists[selectedIndex].title : ""}
              </h5>
              {selectedIndex != -1 ? (
                todolists[selectedIndex].todos.map((todo) => (
                  <>
                    <Grid
                      container
                      alignItems="center"
                      id="todos-keep-click-away"
                      className="todo-list-todo-grid"
                    >
                      <Grid item xs={1}>
                        <Checkbox
                          name={todo._id}
                          color="primary"
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          checked={todo.isCompleted}
                          onChange={(e) => checkBoxToggle(e, todo._id)}
                        />
                      </Grid>
                      <Grid item xs={11} id="todo-wrapper">
                        {todo.toggle ? (
                          <ListItemText
                            primary={todo.title}
                            onDoubleClick={() =>
                              handleDoubleClickTodo(todo._id)
                            }
                          ></ListItemText>
                        ) : (
                          <ClickAwayListener onClickAway={handleTodoClickAway}>
                            <form onSubmit={onEnterTodo}>
                              <TextField
                                style={{ width: "80%" }}
                                value={todo.title}
                                onChange={(e) => handleChangeTodo(e, todo._id)}
                                onKeyDown={handleKeyDownTodo}
                                autoFocus
                                ref={todoRef}
                              />
                            </form>
                          </ClickAwayListener>
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
  }
);
export default React.memo(TodoListWindow);
