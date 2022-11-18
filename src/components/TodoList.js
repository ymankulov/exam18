import React, { useState } from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";

const TodoList = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  const pendingTodo = [];
  const completedTodo = [];
  todos.forEach((item) => {
    if (item.isComplete === true) completedTodo.push(item);
    else pendingTodo.push(item);
  });

  return (
    <>
      <div className="todo-list">
        <div>
          {pendingTodo.length > 0 ? (
            pendingTodo.map((todo, index) => (
              <div className="todo-pending" key={index}>
                <TodoListItem
                  todo={todo}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
                  submitUpdate={submitUpdate}
                  edit={edit}
                  setEdit={setEdit}
                />
              </div>
            ))
          ) : (
            <p style={{
              color:"white",
            }}>Дастан ава кошуп корсонуз</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoList;
