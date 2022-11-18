import React, {useState, useEffect} from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "./Todo.css";
import styled from "styled-components";
import user from "../img/user.png"
import {MdModeEditOutline} from "react-icons/md";

const LOCAL_STORAGE_KEY = "react-todo-list-task";

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding-bottom: 100px;
  position: relative;
`;

export const ModalBackdrop = styled.div`
  background: linear-gradient(184.21deg, #888686 19.04%, rgba(0, 0, 0, 0.13) 73.38%, rgba(136, 134, 134, 0) 81.77%);
  border-radius: 50px;
  width: 817px;
  height: 898px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

export const ModalBtn = styled.button`
  width: 199px;
  height: 44px;
  background: #FEAF00;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  font-size: 14px;
  color: #FFFFFF;
`;

export const ModalView = styled.div.attrs((props) => ({
    role: "dialog"
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  width: 600px;
  border-radius: 1rem;
  background-color: #424242;
  > .close-btn {
    position: absolute;
    top: 5px;
    cursor: pointer;
    font-size: 30px;
    
    
  }
`;

export const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModalHandler = () => {
        setIsOpen(!isOpen);
    };

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storageTodos) {
            setTodos(storageTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo) => {
        if (!todo.text) return;
        setTodos([todo, ...todos]);
    };

    const removeTodo = (id) => {
        const removeArray = todos.filter((todo) => todo.id !== id);
        setTodos(removeArray);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text) return;
        setTodos((prev) =>
            prev.map((item) => (item.id === todoId ? newValue : item))
        );
    };

    const completeTodo = (id) => {
        let updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <>
            <ModalContainer>
                <ModalBtn onClick={openModalHandler}>
                    {isOpen ? "ADD NEW STUDENT" : "ADD NEW STUDENT"}
                </ModalBtn>
                {isOpen ? (
                    <ModalBackdrop>
                        <ModalView>
                            <div className="close-btn" onClick={openModalHandler}>X</div>
                            <div className="user">
                                <img src={user} alt="img"/>
                                <input type="file" placeholder='ADD AVATAR'/>
                            </div>
                            <div className="todo">
                                <TodoForm onSubmit={addTodo}/>
                                <TodoList
                                    todos={todos}
                                    completeTodo={completeTodo}
                                    removeTodo={removeTodo}
                                    updateTodo={updateTodo}
                                />
                            </div>
                        </ModalView>
                    </ModalBackdrop>
                ) : null}
            </ModalContainer>
        </>
    );
};
