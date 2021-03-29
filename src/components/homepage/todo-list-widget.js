import React, { useRef } from "react";
import TodoListWindow from "./todo-list-window";

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
            <small>Wow, such empty</small>
          </div>
        </div>
      </a>
      <TodoListWindow ref={todoListWindowRef} />
    </>
  );
}
