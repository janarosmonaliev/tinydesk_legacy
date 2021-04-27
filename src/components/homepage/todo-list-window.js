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
import { UserContext } from "./context/UserContext";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const TodoListWindow = forwardRef((props, ref) => {
  //Props todolist from App
  const { todolists, setTodolists } = useContext(UserContext);

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
    // console.log(todolists);
    const newArr = [];
    todolists.map((todolist) =>
      newArr.push({
        ...todolist,
        todos: todolist.todos.filter((todo) => !todo.isCompleted),
      })
    );
    setTodolists(newArr);
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
  const [isSorting, setIsSorting] = useState(false);
  const [displayedTodolist, setDisplayedTodolist] = useState(
    todolists.filter((todolist) => todolist.id === selectedId)
  );
  const handleSelectList = (e, id) => {
    setSelectedId(id);
    setSelectedIndex(todolists.findIndex((todolist) => todolist.id === id));
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
    }
  }, [selectedId, todolists[selectedIndex]]);
  useEffect(() => {
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
    const type = e.type;
    const nodeName = e.target.nodeName;
    const targetType = e.target.type;
    const targetId = e.target.id;
    const eKey = e.key;
    if (
      (type === "click" && targetType === "checkbox") ||
      targetId === "todos-keep-click-away" ||
      nodeName === "SPAN" ||
      nodeName === "H5" ||
      selectedId === -1 ||
      isSorting
    ) {
      return;
    }
    if (
      (eKey === "Enter" && todoFocus.focus) ||
      (type === "click" && todoFocus.focus)
    ) {
      if (todoFocus.focus) {
        const focus = { focus: false, index: -1 };
        setTodoFocus(focus);
      }
    } else if (type === "click" && !todoFocus.focus) {
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
  const onTodolistSortEnd = ({ oldIndex, newIndex }, e) => {
    setTodolists(arrayMove(todolists, oldIndex, newIndex));
  };
  const onTodoSortEnd = ({ oldIndex, newIndex }, e) => {
    setIsSorting(true);
    const arr = arrayMove(displayedTodolist[0].todos, oldIndex, newIndex);
    setTodolists(
      produce((draft) => {
        draft[selectedIndex].todos = arr;
      })
    );
    setIsSorting(false);
  };

  const SortableTodoItem = SortableElement(({ value }) => (
    <>
      <Grid
        container
        alignItems="center"
        id="todos-keep-click-away"
        className="todo-list-todo-grid"
        style={{ zIndex: 9999 }}
      >
        <Grid item xs={1}>
          <Checkbox
            name={value.id}
            color="primary"
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={value.isCompleted}
            onChange={(e) =>
              checkBoxToggle(
                e,
                displayedTodolist[0].todos.findIndex((t) => t.id === value.id)
              )
            }
          />
        </Grid>
        <Grid item xs={11}>
          {value.toggle ? (
            <ListItemText
              primary={value.title}
              onDoubleClick={() =>
                handleDoubleClickTodo(
                  displayedTodolist[0].todos.findIndex((t) => t.id === value.id)
                )
              }
            ></ListItemText>
          ) : (
            <TextField
              style={{ width: "80%" }}
              value={value.title}
              onChange={(e) => handleChangeTodo(e, value.id)}
              onKeyDown={handleKeyDownTodo}
              autoFocus
            ></TextField>
          )}
        </Grid>
      </Grid>
    </>
  ));

  const SortableTodolistItem = SortableElement(({ value }) => (
    <>
      {value.toggle ? (
        <>
          <ListItem
            button
            selected={selectedId === value.id}
            onClick={(e) => handleSelectList(e, value.id)}
            onDoubleClick={handleDoubleClickTodolist}
            onContextMenu={(e) => handleContextMenu(e, value.id)}
            style={{ zIndex: 9999 }}
          >
            <ListItemText primary={value.title}></ListItemText>
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
              value={value.title}
              onChange={handleChange}
              onKeyDown={handleKeyDownTodolist}
              autoFocus
            ></TextField>
          </ListItem>
          <Divider light />
        </>
      )}
    </>
  ));

  const SortableTodoContainer = SortableContainer(({ items }) => {
    return (
      <Grid item xs={8} onClick={handleKeyDownTodo}>
        <h5>{items == null ? "" : items[0].title}</h5>
        {items != null ? (
          items[0].todos.map((value, index) => (
            <SortableTodoItem
              key={`todo-item-${index}`}
              value={value}
              index={index}
            />
          ))
        ) : (
          <></>
        )}
      </Grid>
    );
  });

  const SortableTodoList = SortableContainer(({ items }) => {
    return (
      <Grid
        item
        xs={3}
        onClick={handleKeyDownTodolist}
        onContextMenu={handleContextMenu}
        classNames="sortable-todolist-item"
      >
        <List component="nav" aria-label="to-do lists">
          {items.map((value, index) => (
            <SortableTodolistItem
              key={`todolist-item-${index}`}
              value={value}
              index={index}
            />
          ))}
        </List>
      </Grid>
    );
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
          <SortableTodoList
            items={todolists}
            axis="y"
            distance={5}
            onSortEnd={onTodolistSortEnd}
          />
          <Divider orientation="vertical" flexItem light />
          <SortableTodoContainer
            items={displayedTodolist}
            axis="y"
            distance={5}
            onSortEnd={onTodoSortEnd}
          />
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
