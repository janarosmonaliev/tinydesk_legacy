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
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import nextId from "react-id-generator";
import produce from "immer";

const NotesWindow = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  //local data for notes
  const [notes, setNotes] = useState([
    {
      title: "CSE 416",
      id: 0,
      content:
        "Students must satisfy below requirements. woejnfsoudvnwenr asoiugwenf sdfoisdj rew  gfoisdhswkjeqiucndnen eeee Students must satisfy below requirements. woejnfsoudvnwenr asoiugwenf sdfoisdj rew  gfoisdhswkjeqiucndnen eeee Students must satisfy below requirements. woejnfsoudvnwenr asoiugwenf sdfoisdj rew  gfoisdhswkjeqiucndnen eeee Students must satisfy below requirements. woejnfsoudvnwenr asoiugwenf sdfoisdj rew  gfoisdhswkjeqiucndnen eeee Students must satisfy below requirements. woejnfsoudvnwenr asoiugwenf sdfoisdj rew  gfoisdhswkjeqiucndnen eeee Students must satisfy below requirements. woejnfsoudvnwenr asoiugwenf sdfoisdj rew  gfoisdhswkjeqiucndnen eeee",
      titleToggle: true,
      contentToggle: true,
    },
    {
      title: "Homeplus Grocery List",
      id: 1,
      content: "Apple, cereal, banana, ramen, tissues",
      titleToggle: true,
      contentToggle: true,
    },
    {
      title: "SBU Visit Document",
      id: 2,
      content: "Action needs to be done. ",
      titleToggle: true,
      contentToggle: true,
    },
  ]);
  //track whether a user makes change in notes title column
  const [notesTitleFocus, setNotesTitleFocus] = useState(false);
  //track whether a user makes change in notes content
  const [notesContentFocus, setNotesContentFocus] = useState({
    focus: false,
    index: -1,
  });
  //keep track of notes list index
  const nextIndexNote = useRef(3);
  //Context menu's initial position (= small popup after right-click)
  const initialMousPos = {
    mouseX: null,
    mouseY: null,
  };
  //Decide Context menu's position
  const [mousePos, setMousePos] = useState(initialMousPos);
  //Keep track which todolist user right-clicks
  const [notesIdForContextMenu, setNotesIdForContextMenu] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
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
  //index in the Notes list
  const [selectedIndex, setSelectedIndex] = useState(0);
  //id of Notes in the list
  const [selectedId, setSelectedId] = useState(0);

  const [displayedNotes, setDisplayedNotes] = useState(
    notes.filter((note) => note.id === selectedId)
  );

  //FIX HERE
  const handleSelectList = (e, id) => {
    setSelectedId(id);
    setSelectedIndex(notes.findIndex((note) => note.id === id));
  };

  //when "Add new note" is clicked
  useEffect(() => {
    if (!notesTitleFocus.focus) {
      setNotes(
        produce(notes, (draft) => {
          draft.map((note) =>
            !note.titleToggle ? (note.titleToggle = true) : note.titleToggle
          );
        })
      );
      setNotes(
        produce(notes, (draft) => {
          draft.map((note) =>
            note.title === "" ? (note.title = "New Note") : note.title
          );
        })
      );
    }
  }, [notesTitleFocus]);

  useEffect(() => {
    if (selectedId != -1) {
      setDisplayedNotes(notes.filter((note) => note.id === selectedId));
    }
  }, [selectedId, notes[selectedIndex]]);

  useEffect(() => {
    const newFocus = { focus: false, id: -1 };
    setNotesContentFocus(newFocus);
  }, [selectedIndex]);

  //user can double click the title and change it
  const handleDoubleClickTitle = () => {
    setNotes(
      produce(notes, (draft) => {
        draft[selectedIndex].titleToggle = false;
      })
    );
    setNotesTitleFocus(true);
  };

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

  // Working on Todolist
  const handleKeyDownNotesTitle = (e) => {
    if (notes.length == 0) {
      return;
    }
    if (e.key === "Enter" || e.type === "click") {
      if (notesTitleFocus) {
        setNotes(
          produce(notes, (draft) => {
            console.log(draft);
            draft[selectedIndex].title =
              draft[selectedIndex].title === ""
                ? "New Note"
                : draft[selectedIndex].title;
            draft[selectedIndex].titleToggle = true;
          })
        );
        setNotesTitleFocus(false);
      }
    }
  };

  const handleKeyDownNotesContent = (e) => {
    if (
      (e.key === "Enter" && notesContentFocus.focus) ||
      (e.type === "click" && notesContentFocus.focus)
    ) {
      if (notesContentFocus.focus) {
        const focus = { focus: false, index: nextIndexNote.current };
        setNotesContentFocus(focus);
      }
    } else if (e.type === "click" && !notesContentFocus.focus) {
      //When user clicks new todo when focus is on notes widget
      if (notesTitleFocus) {
        setNotes(
          produce(notes, (draft) => {
            draft[selectedIndex].title =
              draft[selectedIndex].title === ""
                ? "New Note"
                : draft[selectedIndex].title;
            draft[selectedIndex].toggle = true;
          })
        );
        setNotesTitleFocus(false);
      }
      const newNote = {
        title: "",
        id: nextId(),
        content: "",
        titleToggle: true,
        contentToggle: true,
      };
      setNotes(
        produce(notes, (draft) => {
          draft.push(newNote);
        })
      );
      if (displayedNotes.length === 0) {
        const focus = { focus: true, index: 0 };
        setNotesContentFocus(focus);
      } else {
        const focus = { focus: true, index: nextIndexNote.current };
        setNotesContentFocus(focus);
      }
    }
  };

  const onClickAddNotes = () => {
    if (notesTitleFocus) {
      const newFocus = { focus: false, index: -1 };
      setNotesTitleFocus(newFocus);
      return;
    }
    const newNote = {
      title: "",
      id: nextId(),
      content: "",
      titleToggle: false,
      contentToggle: false,
    };
    setSelectedId(newNote.id);
    setSelectedIndex(nextIndexNote.current);
    setNotes(notes.concat(newNote));
    setNotesTitleFocus(true);
    const focus = { focus: false, index: -1 };
    setNotesContentFocus(focus);
    nextIndexNote.current += 1;
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
    } else {
      setDisplayedNotes(null);
      setSelectedId(-1);
    }
    setNotesIdForContextMenu(null);
    nextIndexNote.current -= 1;
  });

  const outerstyles = {
    width: "100%",
    height: "400px",
    overflow: "auto",
    position: "relative",
  };
  const innerstyle = {
    width: "100%",
    height: "650px",
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
          // xs={12}
          direction="row"
          // justify="flex-start"
          alignItems="stretch"
          spacing={3}
          style={{ height: "50vh" }}
        >
          <Grid
            item
            xs={4}
            onClick={handleKeyDownNotesTitle}
            onContextMenu={handleContextMenu}
          >
            <List component="nav" aria-label="to-do lists">
              {/* TODO Map a JSON object to display content */}
              {notes.map((note) => (
                <>
                  {note.titleToggle ? (
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
                        <TextField
                          value={note.title}
                          onChange={handleTitleChange}
                          onKeyDown={handleKeyDownNotesTitle}
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

          <Grid item xs={7} md container spacing={3}>
            <Grid item container direction="column" spacing={2}>
              <Grid item>
                <h5>
                  <b>{displayedNotes == null ? "" : displayedNotes[0].title}</b>
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
                {displayedNotes != null ? (
                  displayedNotes.map((note) => (
                    <>
                      <Grid item onKeyDown={handleKeyDownNotesContent}>
                        <div style={outerstyles}>
                          <TextField
                            label=""
                            fullWidth
                            multiline
                            InputProps={{ disableUnderline: true }}
                            rowsMax={10}
                            value={note.content}
                            onChange={handleChangeContent}
                          />
                        </div>
                      </Grid>
                    </>
                  ))
                ) : (
                  <div
                    style={{ width: "80%" }}
                    onChange={(e) => handleChangeContent(e)}
                    onKeyDown={handleKeyDownNotesContent}
                    autoFocus
                  ></div>
                )}
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
export default NotesWindow;
