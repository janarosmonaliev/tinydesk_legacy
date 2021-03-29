import React, { useRef } from "react";
import NotesWindow from "./notes-window";

export default function NotesWidget() {
  const notesWindowRef = useRef();

  const handleClick = () => {
    notesWindowRef.current.clickOpen();
  };
  return (
    <>
      <a onClick={handleClick}>
        <div className="notes-widget-wrapper">
          <div className="notes-widget-bar">
            <small> Notes</small>
          </div>
          <div className="notes-widget-content">
            <small>No notes yet</small>
          </div>
        </div>
      </a>
      <NotesWindow ref={notesWindowRef} />
    </>
  );
}
