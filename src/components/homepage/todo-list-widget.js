import React, { useRef, useState } from "react";
import TodoListWindow from "./todo-list-window";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

export default function ToDoListWidget(props) {
  const todoListWindowRef = useRef();

  const handleClick = () => {
    todoListWindowRef.current.clickOpen();
  };

  const [previewTodos, setPreviewTodos] = useState(
    props.todolist.todolist.map((tl) =>
      tl.todos.map((todo) => (
        <small>
          <CheckBoxOutlineBlankIcon fontSize="small" />
          <div className="todo-text">{todo.title}</div>
        </small>
      ))
    )
  );

  return (
    <>
      <a onClick={handleClick}>
        <div className="todo-list-widget-wrapper">
          <div className="todo-list-widget-bar">
            <small> To-Do List</small>
          </div>
          <div className="todo-list-widget-content">{previewTodos}</div>
        </div>
      </a>
      <TodoListWindow todolist={props.todolist} ref={todoListWindowRef} />
    </>
  );
}
