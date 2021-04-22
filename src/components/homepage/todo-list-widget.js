import React, { useContext, useRef, useState } from "react";
import TodoListWindow from "./todo-list-window";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { UserContext } from "./context/UserContext";

export default function ToDoListWidget() {
  //Todo list attributes = todolistid : Objectid, index: int ; title: String
  //Todo attributes = title: String, isCompleted: Bool, todoId: ObjectId, index: int
  const { jiggle, todolists } = useContext(UserContext);
  const todoListWindowRef = useRef();

  const handleClick = () => {
    todoListWindowRef.current.clickOpen();
  };

  const [previewTodos, setPreviewTodos] = useState(
    todolists.map((tl) =>
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
          <div className="todo-list-widget-content">{previewTodos}</div>
        </div>
      </a>
      <TodoListWindow ref={todoListWindowRef} />
    </>
  );
}
