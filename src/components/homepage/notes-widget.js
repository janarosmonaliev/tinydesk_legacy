import React, { useContext, useRef, useState } from "react";
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
  const [notes, setNotes] = useState([
    {
      title: "CSE 416",
      id: 0,
      content:
        "Introduces the basic concepts and modern tools and techniques of <br/> software engineering. Emphasizes the development of reliable and maintainable software via system requirements and specifications, software design methodologies including object-oriented design, implementation, integration, and testing; software project management; life-cycle documentation; software maintenance; and consideration of human factor issues.",
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
            {notes.slice(0, 4).map((note) => (
              <small>
                <div className="note-text">{note.title}</div>
              </small>
            ))}
          </div>
        </div>
      </a>
      <NotesWindow ref={notesWindowRef} notes={notes} setNotes={setNotes} />
    </>
  );
}
