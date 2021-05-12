import React, { useContext, useRef, useState, useEffect } from "react";
import NotesWindow from "./notes-window";
import styled from "styled-components";
import { UserContext } from "./context/UserContext";
import axios from "axios";
const Note = styled.div`
  padding: 5px 5px 2px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  text-align: left;
`;

const NotesWidget = (props) => {
  // const initialNote = [
  //   {
  //     title: "CSE 416",
  //     id: 0,
  //     content:
  //       "Introduces the basic concepts and modern tools and techniques of <br/> software engineering. Emphasizes the development of reliable and maintainable software via system requirements and specifications, software design methodologies including object-oriented design, implementation, integration, and testing; software project management; life-cycle documentation; software maintenance; and consideration of human factor issues.",
  //     toggle: true,
  //   },
  //   {
  //     title: "Homeplus Grocery List",
  //     id: 1,
  //     content: "Apple, cereal, banana, ramen, tissues",
  //     toggle: true,
  //   },
  //   {
  //     title: "SBU Visit Document",
  //     id: 2,
  //     content: "Action needs to be done. ",
  //     toggle: true,
  //   },
  // ];
  const notesWindowRef = useRef();
  const { jiggle } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [previewNotes, setPreviewNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      await axios({
        method: "GET",
        withCredentials: true,
        url: "https://commandt-backend.herokuapp.com/home",
      }).then((res) => {
        //toggle:
        for (var i = 0; i < res.data.notes.length; i++) {
          res.data.notes[i]["toggle"] = true;
        }

        setNotes(res.data.notes);
        setPreviewNotes(res.data.notes.slice(0, 4));
      });
    };
    getNotes();
  }, []);

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
              <small>
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
