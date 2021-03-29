import React, { useRef } from "react";
import TodoListWindow from "./todo-list-window";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

export default function ToDoListWidget() {
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
              <div className="todo-text">POL101 Read Chapter 12</div>
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
      <TodoListWindow ref={todoListWindowRef} />
    </>
  );
}
