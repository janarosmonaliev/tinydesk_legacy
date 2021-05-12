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
  DialogActions,
  DialogContentText,
  ClickAwayListener,
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
  Paper,
} from "@material-ui/core";
import nextId from "react-id-generator";
import produce from "immer";

const NotesWindow = forwardRef(({ notes, setNotes, open, setOpen }, ref) => {
  const [scroll, setScroll] = useState("paper");
  //index in the Notes list
  const [selectedIndex, setSelectedIndex] = useState(0);
  //id of Notes in the list
  const [selectedId, setSelectedId] = useState(
    notes.length === 0 ? -1 : notes[0].id
  );
  //local data for notes
  const myRef = useRef(null);
  //keep track of notes list index

  const nextIndexNote = useRef(notes.length);
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
    setScroll("paper");
  };
  const handleClose = () => {
    setOpen(false);
  };

  //to handle context menu
  const handleContextMenu = (e, id) => {
    if (id != null) {
      setNotesIdForContextMenu(id);
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
    setNotes(notes.filter((note) => note.id !== notesIdForContextMenu));
    if (notes.length != 1) {
      //Reset to first todolist
      if (notesIdForContextMenu == notes[0].id) {
        setSelectedId(notes[1].id);
      } else {
        setSelectedId(notes[0].id);
      }
      setSelectedIndex(0);
    } else {
      setSelectedId(-1);
    }
    setNotesIdForContextMenu(null);
    nextIndexNote.current -= 1;
  });

  //Handle displaying note
  const handleSelectList = (e, id) => {
    setSelectedId(id);
    setSelectedIndex(notes.findIndex((note) => note.id === id));
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
      id: nextId(),
      content: "",
      toggle: false,
    };
    setSelectedId(newNote.id);
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
    if (notes.length == 0) {
      return;
    }
    const titleTextfieldIndex = notes.findIndex((note) => !note.toggle);
    setNotes(
      produce(notes, (draft) => {
        draft[titleTextfieldIndex].title =
          draft[titleTextfieldIndex].title === ""
            ? "New Note"
            : draft[titleTextfieldIndex].title;
        draft[titleTextfieldIndex].toggle = true;
      })
    );
    myRef.current.focus();
  };

  const outerstyles = {
    width: "100%",
    height: "1%",
    overflow: "auto",
    position: "relative",
  };
  const innerstyle = {
    width: "100%",
    height: "1%",
  };
  const textareaSize = {
    width: "100%",
    outline: "none",
    minHeight: "20px",
    padding: "0",
    boxShadow: "none",
    display: "block",
    border: "2px solid black",
    overflow: "hidden", // Removes scrollbar
    transition: "height 0.2s ease",
  };
  //use for parent to access
  useImperativeHandle(ref, () => ({
    clickOpen: () => {
      handleClickOpen();
    },
  }));
  const handleFocus = (e) => {
    myRef.current.focus();
  };

  return (
    <Dialog
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
              {notes.map((note) => (
                <>
                  {note.toggle ? (
                    <>
                      <ListItem
                        button
                        selected={selectedId === note.id}
                        onClick={(e) => handleSelectList(e, note.id)}
                        onDoubleClick={handleDoubleClickTitle}
                        onContextMenu={(e) => handleContextMenu(e, note.id)}
                      >
                        <ListItemText primary={note.title}></ListItemText>
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
                          onClick={handleContextMenuDeleteNotes}
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
                        <form onSubmit={onEnterNotesList}>
                          <ClickAwayListener
                            onClickAway={handleNotesListClickAway}
                          >
                            <TextField
                              value={note.title}
                              onChange={handleTitleChange}
                              autoFocus
                            />
                          </ClickAwayListener>
                        </form>
                      </ListItem>
                      <Divider light />
                    </>
                  )}
                </>
              ))}
            </List>
          </Grid>

          <Divider orientation="vertical" flexItem={true} />

          <Grid item xs={8} md container spacing={3} onClick={handleFocus}>
            <Grid item container direction="column" spacing={2}>
              <Grid item>
                <h5>
                  <b>{selectedId == -1 ? "" : notes[selectedIndex].title}</b>
                </h5>
                <br></br>
                <div className="notes-text-style-bar">
                  <Button>H1</Button>
                  <Button>H2</Button>
                  <Button>H3</Button>
                  <Button>H4</Button>
                  <Button>H5</Button>
                  <Button>H6</Button>
                  <Button>Blockquote</Button>
                  <Button>UL</Button>
                  <Button>OL</Button>
                  <Button>Codeblock</Button>
                  <Button>Italic</Button>
                  <Button>Underline</Button>
                  <Button>Bold</Button>
                </div>
                <br></br>
                <Divider />
                <Grid item>
                  {selectedId != -1 ? (
                    <>
                      <div style={outerstyles}>
                        <TextField
                          label=""
                          fullWidth
                          multiline
                          InputProps={{ disableUnderline: true }}
                          //rowsMax={100}
                          style={innerstyle}
                          value={notes[selectedIndex].content}
                          onChange={handleChangeContent}
                          inputRef={myRef}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            </Grid>
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
