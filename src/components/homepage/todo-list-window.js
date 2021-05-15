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
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

//SORTABLE TODOs
const SortableTodoItem = SortableElement(({ value, ...props }) => (
  <Grid
    container
    alignItems="center"
    className="todo-list-todo-grid"
    style={{ zIndex: 9999 }}
    id="todos-keep-click-away"
  >
    <Grid item xs={1}>
      <Checkbox
        name={value._id}
        color="primary"
        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
        checkedIcon={<CheckBoxIcon fontSize="small" />}
        checked={value.isCompleted || false}
        onChange={(e) => props.checkBoxToggle(e, value._id)}
      />
    </Grid>
    <Grid item xs={11} id="todo-wrapper">
      {value.toggle ? (
        <ListItemText
          primary={value.title}
          onDoubleClick={() => props.handleDoubleClickTodo(value._id)}
        ></ListItemText>
      ) : (
        <ClickAwayListener onClickAway={props.handleTodoClickAway}>
          <form onSubmit={props.onEnterTodo}>
            <TextField
              style={{ width: "80%" }}
              value={value.title}
              onChange={(e) => props.handleChangeTodo(e, value._id)}
              onKeyDown={props.handleKeyDownTodo}
              autoFocus
              ref={props.todoRef}
            />
          </form>
        </ClickAwayListener>
      )}
    </Grid>
  </Grid>
));
const SortableTodos = SortableContainer(
  ({ items, selectedIndex, ...props }) => {
    return (
      <Grid item xs={8} onClick={props.handleKeyDownTodo}>
        <h5>{selectedIndex !== -1 ? items[selectedIndex].title : ""}</h5>
        {selectedIndex !== -1 ? (
          items[selectedIndex].todos.map((value, index) => (
            <SortableTodoItem
              value={value}
              index={index}
              key={`sort-todo-item-${index}`}
              checkBoxToggle={props.checkBoxToggle}
              handleDoubleClickTodo={props.handleDoubleClickTodo}
              handleTodoClickAway={props.handleTodoClickAway}
              onEnterTodo={props.onEnterTodo}
              handleChangeTodo={props.handleChangeTodo}
              handleKeyDownTodo={props.handleKeyDownTodo}
              todoRef={props.todoRef}
            />
          ))
        ) : (
          <></>
        )}
      </Grid>
    );
  }
);

//SORTABEL TODOLISTs
const SortableTodolistItem = SortableElement(
  ({ value, selectedIndex, mousePos, sortIndex, ...props }) => (
    <div style={{ zIndex: 9999 }}>
      {value.toggle ? (
        <div>
          <ListItem
            button
            selected={selectedIndex === sortIndex}
            onClick={(e) => props.handleSelectList(e, value._id)}
            onDoubleClick={props.handleDoubleClickTodolist}
            onContextMenu={(e) => props.handleContextMenu(e, value._id)}
          >
            <ListItemText primary={value.title} />
          </ListItem>
          <Menu
            keepMounted
            open={mousePos.mouseY !== null}
            onClose={props.handleContextMenuClose}
            anchorReference="anchorPosition"
            anchorPosition={
              mousePos.mouseY !== null && mousePos.mouseX !== null
                ? { top: mousePos.mouseY, left: mousePos.mouseX }
                : undefined
            }
          >
            <MenuItem
              onClick={props.handleContextMenuDeleteTodoList}
              style={{ color: "#EB5757" }}
            >
              <XCircle /> &nbsp; Delete
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <ListItem>
          <ClickAwayListener onClickAway={props.handleTodolistClickAway}>
            <form
              onSubmit={props.onEnterTodolist}
              noValidate
              autoComplete="off"
            >
              <TextField
                value={value.title}
                onChange={props.handleChange}
                autoFocus
              />
            </form>
          </ClickAwayListener>
        </ListItem>
      )}
      <Divider light />
    </div>
  )
);
const SortableTodolists = SortableContainer(({ items, ...props }) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableTodolistItem
          key={`sort-todolist-${index}`}
          value={value}
          index={index}
          selectedIndex={props.selectedIndex}
          mousePos={props.mousePos}
          handleSelectList={props.handleSelectList}
          handleDoubleClickTodolist={props.handleDoubleClickTodolist}
          handleContextMenu={props.handleContextMenu}
          handleContextMenuClose={props.handleContextMenuClose}
          handleContextMenuDeleteTodoList={
            props.handleContextMenuDeleteTodoList
          }
          handleTodolistClickAway={props.handleTodolistClickAway}
          onEnterTodolist={props.onEnterTodolist}
          handleChange={props.handleChange}
          sortIndex={index}
        />
      ))}
    </div>
  );
});

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
    const [selectedId, setSelectedId] = useState(-1);
    const [sort, setSort] = useState(false);
    const todoRef = useRef(null);

    //Open / Close Modal
    const handleClickOpen = () => {
      if (!todolists) {
        return;
      }
      setOpen(true);
      if (todolists.length !== 0) {
        setSelectedId(todolists[0]._id);
        setSelectedIndex(0);
      }
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

      if (todolists.length !== 1) {
        //Reset to first todolist
        if (todolistIdForContextMenu === todolists[0]._id) {
          setSelectedId(todolists[1]._id);
          setSelectedIndex(1);
        } else {
          setSelectedId(todolists[0]._id);
          setSelectedIndex(0);
        }
      } else {
        console.log("HELLO");
        setSelectedId(-1);
        setSelectedIndex(-1);
      }
      setTodolistIdForContextMenu(null);
      nextIndexTodolist.current -= 1;
    });

    // Handle ClickAway
    const handleCloseTextfield = (e) => {
      if (todolists.length === 0) {
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
      const { value } = e.target;
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
      setSelectedId(newTodolist._id);
      setSelectedIndex(nextIndexTodolist.current);
      setTodolists(todolists.concat(newTodolist));
      nextIndexTodolist.current += 1;
    };

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
        selectedId === -1 ||
        sort
      ) {
        if (sort) {
          setSort(false);
        }
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
      const { value } = e.target;
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
          draft[selectedIndex].todos.map(
            (todo) =>
              (todo.title =
                todo.title === "" ? (todo.title = "New Todo") : todo.title)
          );
        })
      );
    };
    const onSortEndTodo = ({ oldIndex, newIndex }) => {
      setTodolists(
        produce((draft) => {
          draft[selectedIndex].todos = arrayMove(
            draft[selectedIndex].todos,
            oldIndex,
            newIndex
          );
        })
      );
      setSort(true);
    };

    const onSortEndTodolist = ({ oldIndex, newIndex }) => {
      setTodolists(arrayMove(todolists, oldIndex, newIndex));
      setSelectedId(todolists[newIndex]._id);
      setSelectedIndex(newIndex);
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
              className="sortable-todolist-item"
            >
              <List component="nav" aria-label="to-do lists">
                <SortableTodolists
                  items={todolists}
                  selectedIndex={selectedIndex}
                  mousePos={mousePos}
                  handleSelectList={handleSelectList}
                  handleDoubleClickTodolist={handleDoubleClickTodolist}
                  handleContextMenu={handleContextMenu}
                  handleContextMenuClose={handleContextMenuClose}
                  handleContextMenuDeleteTodoList={
                    handleContextMenuDeleteTodoList
                  }
                  handleTodolistClickAway={handleTodolistClickAway}
                  onEnterTodolist={onEnterTodolist}
                  handleChange={handleChange}
                  axis="y"
                  distance={5}
                  onSortEnd={onSortEndTodolist}
                />
              </List>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <SortableTodos
              items={todolists}
              selectedIndex={selectedIndex}
              handleKeyDownTodo={handleKeyDownTodo}
              checkBoxToggle={checkBoxToggle}
              handleDoubleClickTodo={handleDoubleClickTodo}
              handleTodoClickAway={handleTodoClickAway}
              onEnterTodo={onEnterTodo}
              handleChangeTodo={handleChangeTodo}
              todoRef={todoRef}
              distance={5}
              axis="y"
              onSortEnd={onSortEndTodo}
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
  }
);
export default React.memo(TodoListWindow);
