import React, { useContext, useRef, useState, useEffect } from "react";
import TodoListWindow from "./todo-list-window";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { UserContext } from "./context/UserContext";

const ToDoListWidget = () => {
  //Todo list attributes = todolistid : Objectid, index: int ; title: String
  //Todo attributes = title: String, isCompleted: Bool, todoId: ObjectId, index: int

  const [previewTodos, setPreviewTodos] = useState([]);

  //Open and close modal
  //Located here to use useEffect on change open to optimize the calculation
  const [open, setOpen] = useState(false);

  const { jiggle, todolists, setTodolists } = useContext(UserContext);
  const todoListWindowRef = useRef();

  const handleClick = () => {
    todoListWindowRef.current.clickOpen();
  };

  useEffect(() => {
    if (todolists.length !== 0) {
      setPreviewTodos(todolists[0].todos.slice(0, 4));
    }
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
              <small key={todo._id}>
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
