import React, { useRef, useState } from "react";
import TodoListWindow from "./todo-list-window";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

export default function ToDoListWidget() {
  //Todo list attributes = todolistid : Objectid, index: int ; title: String
  //Todo attributes = title: String, isCompleted: Bool, todoId: ObjectId, index: int
  const [todos, setTodos] = useState({
    todolist: [
      {
        title: "Academic",
        index: 0,
        todos: [
          {
            title: "30s presentation for CSE416",
            isCompleted: false,
            index: 0,
          },
          {
            title: "POL101 read chapter 1",
            isCompleted: false,
            index: 1,
          },
          {
            title: "CSE416 Software Requirements",
            isCompleted: false,
            index: 2,
          },
        ],
      },
      {
        title: "Life Goals",
        index: 1,
        todos: [
          {
            title: "Study ReactJS",
            isCompleted: false,
            index: 0,
          },
          {
            title: "Study SwiftUI",
            isCompleted: false,
            index: 1,
          },
          {
            title: "Hello world,",
            isCompleted: false,
            index: 2,
          },
        ],
      },
      {
        title: "My daily todos",
        index: 2,
        todos: [
          {
            title: "Laundry",
            isCompleted: false,
            index: 0,
          },
          {
            title: "Run 3 miles",
            isCompleted: false,
            index: 1,
          },
          {
            title: "Dinner with Kwangmin",
            isCompleted: false,
            index: 2,
          },
        ],
      },
    ],
  });

  const todoListWindowRef = useRef();

  const handleClick = () => {
    todoListWindowRef.current.clickOpen();
  };
  return (
    <>
      <a onClick={handleClick}>
        <div className="todo-list-widget-wrapper">
          <div className="todo-list-widget-bar">
            <small> To-Do List</small>
          </div>
          <div className="todo-list-widget-content">
            <small>
              <CheckBoxOutlineBlankIcon fontSize="small" />
              <div className="todo-text">CSE416 Design Prototype</div>
            </small>

            <small>
              <CheckBoxOutlineBlankIcon fontSize="small" />
              <div className="todo-text">POL101 Read Chapter 12</div>
            </small>
            <small>
              <CheckBoxOutlineBlankIcon fontSize="small" />
              <div className="todo-text">CSE416 SRS Design Due Date</div>
            </small>
          </div>
        </div>
      </a>
      <TodoListWindow ref={todoListWindowRef} props={todos} />
    </>
  );
}
