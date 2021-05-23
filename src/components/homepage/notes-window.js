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
  DialogActions,
  ClickAwayListener,
  makeStyles,
} from "@material-ui/core";
import { SvgIcon, IconButton, Button } from "@material-ui/core";
import { X, XCircle, Plus } from "react-feather";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {
  List,
  ListItem,
  Menu,
  MenuItem,
  TextField,
  ListItemText,
} from "@material-ui/core";
import nextId from "react-id-generator";
import produce from "immer";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { useForm, Controller } from "react-hook-form";
import RichEditor from "./note-editor";

const useStyles = makeStyles({
  outerStyles: {
    width: "100%",
    cursor: "text",
    minHeight: "1%",
    overflow: "auto",
    position: "relative",
  },
  innerStyle: {
    width: "100%",
    height: "1%",
  },
});
const SortableNotelistItem = SortableElement(
  ({ value, mousePos, ...props }) => (
    <div style={{ zIndex: 9999 }}>
      {value.toggle ? (
        <>
          <ListItem
            button
            selected={props.selectedId === value._id}
            onClick={(e) => props.handleSelectList(e, value._id)}
            onDoubleClick={props.handleDoubleClickTitle}
            onContextMenu={(e) => props.handleContextMenu(e, value._id)}
          >
            <ListItemText primary={value.title}></ListItemText>
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
              onClick={props.handleContextMenuDeleteNotes}
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
            <form onSubmit={props.onEnterNotesList}>
              <ClickAwayListener onClickAway={props.handleNotesListClickAway}>
                <TextField
                  value={value.title}
                  onChange={props.handleTitleChange}
                  autoFocus
                />
              </ClickAwayListener>
            </form>
          </ListItem>
          <Divider light />
        </>
      )}
    </div>
  )
);
const SortableNotelist = SortableContainer((props) => {
  return (
    <div>
      {props.items.map((value, index) => (
        <SortableNotelistItem
          value={value}
          index={index}
          key={`note-sort-${index}`}
          selectedId={props.selectedId}
          handleSelectList={props.handleSelectList}
          handleDoubleClickTitle={props.handleDoubleClickTitle}
          handleContextMenu={props.handleContextMenu}
          mousePos={props.mousePos}
          handleContextMenuClose={props.handleContextMenuClose}
          handleContextMenuDeleteNotes={props.handleContextMenuDeleteNotes}
          onEnterNotesList={props.onEnterNotesList}
          handleNotesListClickAway={props.handleNotesListClickAway}
          handleTitleChange={props.handleTitleChange}
        />
      ))}
    </div>
  );
});

const NotesWindow = forwardRef(({ notes, setNotes, open, setOpen }, ref) => {
  const classes = useStyles();
  const nextIndexNote = useRef();
  const { handleSubmit, control } = useForm();
  //index in the Notes list
  const [selectedIndex, setSelectedIndex] = useState(0);
  //id of Notes in the list
  const [selectedId, setSelectedId] = useState(-1);

  //local data for notes
  const myRef = useRef(null);
  //keep track of notes list index
  nextIndexNote.current = notes.length;

  //Context menu's initial position (= small popup after right-click)
  const initialMousPos = {
    mouseX: null,
    mouseY: null,
  };
  //Decide Context menu's position
  const [mousePos, setMousePos] = useState(initialMousPos);
  //Keep track which todolist user right-clicks
  const [notesIdForContextMenu, setNotesIdForContextMenu] = useState(null);
  //Open / Close Modal
  const handleClickOpen = () => {
    setOpen(true);
    setSelectedId(notes.length === 0 ? -1 : notes[0]._id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  //to handle context menu
  const handleContextMenu = (e, _id) => {
    if (_id != null) {
      setNotesIdForContextMenu(_id);
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

  const handleContextMenuDeleteNotes = useCallback(() => {
    setMousePos(initialMousPos);
    setNotes(notes.filter((note) => note._id !== notesIdForContextMenu));
    if (notes.length !== 1) {
      //Reset to first todolist
      if (notesIdForContextMenu === notes[0]._id) {
        setSelectedId(notes[1]._id);
      } else {
        setSelectedId(notes[0]._id);
      }
      setSelectedIndex(0);
    } else {
      setSelectedId(-1);
    }
    setNotesIdForContextMenu(null);
    nextIndexNote.current -= 1;
  });

  //Handle displaying note
  const handleSelectList = (e, _id) => {
    setSelectedId(_id);
    setSelectedIndex(notes.findIndex((note) => note._id === _id));
  };

  //user can double click the title and change it
  const handleDoubleClickTitle = () => {
    setNotes(
      produce(notes, (draft) => {
        draft[selectedIndex].toggle = false;
      })
    );
  };

  //Handle Changes for note's title / content
  const handleTitleChange = (e) => {
    setNotes(
      produce(notes, (draft) => {
        draft[selectedIndex].title = e.target.value;
      })
    );
  };

  const handleChangeContent = (e) => {
    setNotes(
      produce(notes, (draft) => {
        draft[selectedIndex].content = e.target.value;
      })
    );
  };

  //Handle Add Notes
  const onClickAddNotes = () => {
    const newNote = {
      title: "",
      _id: nextId(),
      content: "",
      toggle: false,
    };

    setSelectedId(newNote._id);
    setSelectedIndex(nextIndexNote.current);
    setNotes(notes.concat(newNote));

    nextIndexNote.current += 1;
  };

  const onEnterNotesList = (e) => {
    e.preventDefault();
    closeNoteTextfield();
  };
  const handleNotesListClickAway = () => {
    closeNoteTextfield();
  };
  const closeNoteTextfield = () => {
    if (notes.length === 0) {
      return;
    }
    const titleTextfieldIndex = notes.findIndex((note) => !note.toggle);
    setNotes(
      produce(notes, (draft) => {
        const title = draft[titleTextfieldIndex].title;
        draft[titleTextfieldIndex].title = title === "" ? "New Note" : title;
        draft[titleTextfieldIndex].toggle = true;
      })
    );
  };

  //use for parent to access
  useImperativeHandle(ref, () => ({
    clickOpen: () => {
      handleClickOpen();
    },
  }));
  const handleFocus = (e) => {
    myRef.current.focus();
    myRef.current.selectionStart = myRef.current.value.length;
    myRef.current.selectionEnd = myRef.current.value.length;
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setSelectedId(notes[newIndex]);
    setNotes(arrayMove(notes, oldIndex, newIndex));
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
        <h5 className="dialog-title">Notes Widget</h5>
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
          direction="row"
          // // justify="flex-start"
          alignItems="stretch"
          spacing={3}
          className="widget-window-content"
        >
          <Grid item xs={4} onContextMenu={handleContextMenu}>
            <List component="nav" aria-label="to-do lists">
              <SortableNotelist
                items={notes}
                selectedId={selectedId}
                handleSelectList={handleSelectList}
                handleDoubleClickTitle={handleDoubleClickTitle}
                handleContextMenu={handleContextMenu}
                mousePos={mousePos}
                handleContextMenuClose={handleContextMenuClose}
                handleContextMenuDeleteNotes={handleContextMenuDeleteNotes}
                onEnterNotesList={onEnterNotesList}
                handleNotesListClickAway={handleNotesListClickAway}
                handleTitleChange={handleTitleChange}
                distance={5}
                axis="y"
                onSortEnd={onSortEnd}
              />
            </List>
          </Grid>

          <Divider orientation="vertical" flexItem />

          <Grid item xs>
            <h5>
              <b>{selectedId == -1 ? "" : notes[selectedIndex].title}</b>
            </h5>

            {selectedId === -1 ? (
              <></>
            ) : (
              <div className={classes.outerStyles}>{<RichEditor />}</div>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<Plus />}
          disableTouchRipple
          onClick={onClickAddNotes}
        >
          Add a new list
        </Button>
      </DialogActions>
    </Dialog>
  );
});
export default React.memo(NotesWindow);
