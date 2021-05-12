import React, { useContext, useRef, useState, useMemo, useEffect } from "react";
import TodoListWindow from "./todo-list-window";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { UserContext } from "./context/UserContext";
import nextId from "react-id-generator";
import axios from "axios";
const ToDoListWidget = () => {
  //Todo list attributes = todolistid : Objectid, index: int ; title: String
  //Todo attributes = title: String, isCompleted: Bool, todoId: ObjectId, index: int
  // const initialTodolists = {
  //   todolists: [
  //     {
  //       title: "Academic",
  //       id: nextId(),
  //       toggle: true,
  //       todos: [
  //         {
  //           title: "30s presentation for CSE416",
  //           isCompleted: false,
  //           toggle: true,
  //           id: nextId(),
  //         },
  //         {
  //           title: "POL101 read chapter 1",
  //           isCompleted: false,
  //           toggle: true,
  //           id: nextId(),
  //         },
  //         {
  //           title: "CSE416 Software Requirements",
  //           isCompleted: false,
  //           toggle: true,
  //           id: nextId(),
  //         },
  //       ],
  //     },
  //     {
  //       title: "Life Goals",
  //       id: nextId(),
  //       toggle: true,
  //       todos: [
  //         {
  //           title: "Study ReactJS",
  //           isCompleted: false,
  //           toggle: true,
  //           id: nextId(),
  //         },
  //         {
  //           title: "Study SwiftUI",
  //           isCompleted: false,
  //           toggle: true,
  //           id: nextId(),
  //         },
  //         {
  //           title: "Hello world,",
  //           isCompleted: false,
  //           toggle: true,
  //           id: nextId(),
  //         },
  //       ],
  //     },
  //     {
  //       title: "My daily todos",
  //       id: nextId(),
  //       toggle: true,
  //       todos: [
  //         {
  //           title: "Laundry",
  //           isCompleted: false,
  //           toggle: true,
  //           id: nextId(),
  //         },
  //         {
  //           title: "Run 3 miles",
  //           isCompleted: false,
  //           toggle: true,
  //           id: nextId(),
  //         },
  //         {
  //           title: "Dinner with Kwangmin",
  //           isCompleted: false,
  //           toggle: true,
  //           id: nextId(),
  //         },
  //       ],
  //     },
  //   ],
  // };

  const [todolists, setTodolists] = useState([]);
  useEffect(() => {
    const getTodolists = async () => {
      await axios({
        method: "GET",
        withCredentials: true,
        url: "https://commandt-backend.herokuapp.com/home",
      }).then((res) => {
        //toggle && preview
        for (var i = 0; i < res.data.todolists.length; i++) {
          res.data.todolists[i]["toggle"] = true;
          for (var j = 0; j < res.data.todolists[i].todos.length; j++) {
            res.data.todolists[i].todos[j]["toggle"] = true;
          }
        }
        setTodolists(res.data.todolists);

        var ret = [];
        var index = 0;
        for (var i = 0; i < res.data.todolists.length; i++) {
          for (var j = 0; j < res.data.todolists[i].todos.length; j++) {
            ret.push(res.data.todolists[i].todos[j]);
            index += 1;
            if (index == 4) {
              setPreviewTodos(ret);
              return;
            }
          }
        }
        setPreviewTodos(ret);
      });
    };
    getTodolists();
  }, []);
  const [previewTodos, setPreviewTodos] = useState([]);
  //Open and close modal
  //Located here to use useEffect on change open to optimize the calculation
  const [open, setOpen] = useState(false);

  const { jiggle } = useContext(UserContext);
  const todoListWindowRef = useRef();

  const handleClick = () => {
    todoListWindowRef.current.clickOpen();
  };

  useEffect(() => {
    var ret = [];
    var index = 0;
    for (var i = 0; i < todolists.length; i++) {
      for (var j = 0; j < todolists[i].todos.length; j++) {
        ret.push(todolists[i].todos[j]);
        index += 1;
        if (index == 4) {
          setPreviewTodos(ret);
          return;
        }
      }
    }
    setPreviewTodos(ret);
  }, [open]);
  return (
    <>
      <a onClick={handleClick}>
        <div
          className={
            jiggle
              ? "todo-list-widget-wrapper not-hoverable"
              : "todo-list-widget-wrapper hoverable"
          }
        >
          <div className="todo-list-widget-bar">
            <small> To-Do List</small>
          </div>
          <div className="todo-list-widget-content">
            {previewTodos.map((todo) => (
              <small>
                <CheckBoxOutlineBlankIcon fontSize="small" />
                <div className="todo-text">{todo.title}</div>
              </small>
            ))}
          </div>
        </div>
      </a>
      <TodoListWindow
        ref={todoListWindowRef}
        todolists={todolists}
        setTodolists={setTodolists}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
export default React.memo(ToDoListWidget);
