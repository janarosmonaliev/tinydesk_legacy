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
import { X } from "react-feather";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";

const NotesWindow = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  //local data for notes
  const [notes, setNotes] = useState([
    {
      title: "CSE 416",
      index: 0,
      content: "Students must satisfy below requirements...",
      titleToggle: true,
      contentToggle: true,
    },
    {
      title: "Homeplus Grocery List",
      index: 1,
      content: "Apple, cereal, banana, ramen, tissues",
      titleToggle: true,
      contentToggle: true,
    },
    {
      title: "SBU Visit Document",
      index: 2,
      content: "Action needs to be done. ",
      titleToggle: true,
      contentToggle: true,
    },
  ]);
  //track whether a user makes change in notes title column
  const [notesTitleFocus, setNotesTitleFocus] = useState(false);
  //track whether a user makes change in notes content
  const [notesContentFocus, setNotesContentFocus] = useState(false);
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

  const handleSelectList = (e, id) => {
    setSelectedId(id);
    setSelectedIndex(notes.findIndex((note) => note.id === id));
  };

  //when "Add new note" is clicked
  useEffect(() => {
    if (!notesContentFocus.focus) {
      setNotes(
        produce((draft) => {
          draft.map((note) =>
            !note.titleToggle ? (note.titleToggle = true) : note.titleToggle
          );
        })
      );
      setNotes(
        produce((draft) => {
          draft.map((note) =>
            note.title === "" ? (note.title = "New Note") : note.title
          );
        })
      );
    }
  }, [todoFocus]);

  useEffect(() => {
    if (selectedId != -1) {
      setDisplayedNotes(notes.filter((note) => note.id === selectedId));

      //If displayedTodolist is null
      //even above code seems like sets displayedTodolist,
      //at this point, it is still null.
      //This is special handling when todolist is just created
      //when there is no todolist before that.
      //여기로 돌아오기!!
      // if (displayedNotes === null) {
      //   setNextIndexNote(0);
      // } else {
      //   setNextIndexNote(displayedTodolist[0].todos.length);
      // }
    }
  }, [selectedId, notes[selectedIndex]]);

  useEffect(() => {
    const newFocus = { focus: false, id: -1 };
    setTodoFocus(newFocus);
  }, [selectedIndex]);

  //user can double click the title and change it
  const handleDoubleClickTitle = () => {
    setNotes(
      produce((draft) => {
        draft.toggle = false;
      })
    );
    setNotesTitleFocus(true);
  };

  //user can double click the content to modify
  const handleDoubleClickContent = () => {
    setNotes(
      produce((draft) => {
        draft.map((note) =>
          !note.titleToggle ? (note.titleToggle = true) : note.titleToggle
        );
      })
    );

    const focus = { focus: true, index: index };
    setNotesContentFocus(focus);
    setNotes(
      produce((draft) => {
        draft[selectedIndex].contentToggle = false;
      })
    );
  };

  const handleTitleChange = (e) => {
    setNotes(
      produce((draft) => {
        draft[selectedIndex].title = e.target.value;
      })
    );
  };

  const handleChangeContent = (e) => {
    setNotes(
      produce((draft) => {
        draft[selectedIndex].content = e.target.value;
      })
    );
  };

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
  //use for parent to access
  useImperativeHandle(ref, () => ({
    clickOpen: () => {
      handleClickOpen();
    },
  }));

  return (
    <Dialog
      maxWidth={"md"}
      open={open}
      onClose={handleClose}
      aria-labelledby="notes-dialog"
      className="notes-window"
    >
      <DialogTitle id="notes-dialog">
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
        {/* <p> Notes window component</p> */}
        <Grid container xs={12} spacing={5}>
          <Grid item xs={4} container direction="column" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                style={{ backgroundColor: "#e77f23", color: "white" }}
                fullWidth
                disableElevation
                justify-content="flex-start"
              >
                CSE416 Course
              </Button>
            </Grid>
            <Divider variant="middle" />
            <Grid item>
              <Button fullWidth disableElevation justify-content="flex-start">
                Homeplus grocery list
              </Button>
            </Grid>
            <Divider variant="middle" />
            <Grid item>
              <Button fullWidth disableElevation justify-content="flex-start">
                SBU Visit Document
              </Button>
            </Grid>
            <Divider variant="middle" />

            <DialogActions></DialogActions>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={8} md container spacing={1}>
            <Grid item container direction="column" spacing={2}>
              <Grid item>
                <h5>
                  <b>CSE 416 Course</b>
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
              </Grid>
              <Divider />
              <Grid item>
                <div style={outerstyles}>
                  <div style={innerstyle}>
                    <br></br>
                    <h5>
                      <b>Visit Details</b>
                    </h5>{" "}
                    <p>
                      Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. ssidufsiduhf. ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. ssidufsiduhf.
                      ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. ssidufsiduhf. ssidufsiduhf.
                    </p>
                    <p>
                      Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. ssidufsiduhf. ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. ssidufsiduhf.
                      ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. Students must satisfy baloeuw;jdnfvkasdj
                      askdjfkasdjfiouchs diufskje askdjfhskuehkjsiuvb
                      hwehfgwioasdhjfis sudfhvajycga ssidufsiduhf. Students must
                      satisfy baloeuw;jdnfvkasdj askdjfkasdjfiouchs diufskje
                      askdjfhskuehkjsiuvb hwehfgwioasdhjfis sudfhvajycga
                      ssidufsiduhf. ssidufsiduhf. ssidufsiduhf.
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<AddCircleOutlineRoundedIcon />}
          className="notes-add-button"
        >
          Add a new note
        </Button>
      </DialogActions>
    </Dialog>
  );
});
export default NotesWindow;
