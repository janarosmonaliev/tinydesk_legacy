import React, { useContext, useRef } from "react";
import NotesWindow from "./notes-window";
import styled from "styled-components";
import { UserContext } from "./context/UserContext";

const Note = styled.div`
  padding: 5px 5px 2px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  text-align: left;
`;

export default function NotesWidget(props) {
  const notesWindowRef = useRef();
  const { jiggle } = useContext(UserContext);
  const handleClick = () => {
    notesWindowRef.current.clickOpen();
  };
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
            <small>
              <div className="note-text">CSE416 Course</div>
            </small>
            <small>
              <div className="note-text">Homeplus Grocery list</div>
            </small>
            <small>
              <div className="note-text">SBU Visit documentation Required</div>
            </small>
          </div>
        </div>
      </a>
      <NotesWindow ref={notesWindowRef} />
    </>
  );
}
