import React, { useContext, useRef, useState, useEffect } from "react";
import NotesWindow from "./notes-window";
import styled from "styled-components";
import { UserContext } from "./context/UserContext";
import * as fetch from "../../api/fetch";

const NotesWidget = (props) => {
  const notesWindowRef = useRef();
  const { jiggle, notes, setNotes } = useContext(UserContext);

  const [previewNotes, setPreviewNotes] = useState([]);

  const handleClick = () => {
    notesWindowRef.current.clickOpen();
  };

  //Populated from here to optimize the previews
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPreviewNotes(notes.slice(0, 4));
  }, [open]);
  return (
    <>
      <a onClick={handleClick}>
        <div
          className={
            jiggle
              ? "notes-widget-wrapper not-hoverable"
              : "notes-widget-wrapper hoverable"
          }
        >
          <div className="notes-widget-bar">
            <small> Notes</small>
          </div>
          <div className="notes-widget-content">
            {previewNotes.map((note) => (
              <small key={note._id}>
                <div className="note-text">{note.title}</div>
              </small>
            ))}
          </div>
        </div>
      </a>
      <NotesWindow
        ref={notesWindowRef}
        notes={notes}
        setNotes={setNotes}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
export default React.memo(NotesWidget);
