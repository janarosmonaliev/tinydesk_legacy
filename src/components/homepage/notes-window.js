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
import * as noteapi from "../../api/noteapi";
import { EditorState, ContentState } from "draft-js";
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

  // Delete a note
  const handleContextMenuDeleteNotes = useCallback(() => {
    setMousePos(initialMousPos);
    setNotes(notes.filter((note) => note._id !== notesIdForContextMenu));
    apiDeleteNote(notesIdForContextMenu);
    if (notes.length !== 1) {
      //Reset to first note
      if (notesIdForContextMenu === notes[0]._id) {
        setSelectedId(notes[1]._id);
        setSelectedIndex(1);
      } else {
        setSelectedId(notes[0]._id);
        setSelectedIndex(0);
      }
      setSelectedIndex(0);
    } else {
      console.log("DELETED");
      setSelectedId(-1);
      setSelectedIndex(-1);
    }
    setNotesIdForContextMenu(null);
    nextIndexNote.current -= 1;
  });

  const apiDeleteNote = useCallback((id) => {
    const payload = { removeId: id };
    console.log("deleting note's id front ", id);
    noteapi.apiDeleteNote(payload);
  });

  //Handle displaying note
  const handleSelectList = (e, _id) => {
    setSelectedId(_id);
    let index = notes.findIndex((note) => note._id === _id);
    setSelectedIndex(index);
    const content = EditorState.createWithContent(notes[index].content);
    setEditorState(content);
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

  // TODO Connect with Editor
  const handleChangeContent = (content) => {
    setNotes(
      produce(notes, (draft) => {
        draft[selectedIndex].content = content;
      })
    );
    // console.log(e.target.value);
  };

  //Handle Add Notes
  const onClickAddNotes = () => {
    const editorStateEmpty = EditorState.createEmpty();
    const newNote = {
      title: "",
      _id: nextId(),
      content: editorStateEmpty.getCurrentContent(),
      toggle: false,
    };

    setSelectedId(newNote._id);
    setSelectedIndex(nextIndexNote.current);
    setNotes(notes.concat(newNote));
    setEditorState(editorStateEmpty);
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
        if (draft[titleTextfieldIndex]._id.length < 10) {
          //make a copy of current notes
          let newlist = [...notes];
          console.log(newlist);
          //and remove the recently added variable
          newlist.pop();
          //call apiAddNote
          apiAddNote(draft[titleTextfieldIndex].title, newlist);
        } else {
          apiUpdateNote(draft[titleTextfieldIndex]);
        }
      })
    );
  };

  async function apiAddNote(title, newlist) {
    const data = { title: title };
    try {
      let result = await noteapi.apiAddNote(data);
      console.log("id from backend ", result);
      const newNote = {
        title: title,
        _id: result,
        content: {},
        toggle: true,
      };
      console.log("note added wih id", newNote._id);
      setNotes([...newlist, newNote]);
      setSelectedId(result);
    } catch (e) {
      console.log(e);
    }
  }

  const apiUpdateNote = useCallback((note) => {
    console.log("change title of new note with id: ", note._id);
    const data = { _id: note._id, title: note.title, content: note.content };
    noteapi.apiUpdateNote(data);
  });

 

  //use for parent to access
  useImperativeHandle(ref, () => ({
    clickOpen: () => {
      handleClickOpen();
    },
  }));
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setSelectedId(notes[newIndex]);
    setNotes(arrayMove(notes, oldIndex, newIndex));
    apiChangeNotePosition(notes[oldIndex]._id, newIndex);
    setSelectedIndex(newIndex);
  };

  const apiChangeNotePosition = (noteId, newIndex) => {
    const data = { _id: noteId, newIndex: newIndex };
    noteapi.apiChangeTodolistPosition(data);
  };

  // TODO Create a state for EditorState
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSetEditorState = (s) => {
    setEditorState(s);
    handleChangeContent(s.getCurrentContent());
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
              <div className={classes.outerStyles}>
                {
                  <RichEditor
                    richEditorState={editorState}
                    setRichEditorState={handleSetEditorState}
                  />
                }
              </div>
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
