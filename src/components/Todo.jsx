// Tools
import { useEffect } from 'react';
import { createNewTodo, markToDo, interactiveContainer, clearCompleted } from '/public/todoFunctions';

// Components
import ItemsLeft from './ItemsLeft';

// Styles
import '../css/todo.css';

export default function Todo() {
    useEffect(()=>{
        const inputTodo     = document.getElementById("todo-add");
        const btnAddTodo    = document.querySelector(".btn-add_todo");
        const interactive   = document.querySelector(".interactive-container");
        const clearComplete = document.querySelector(".clear-completed");
  
        inputTodo.addEventListener("keyup",e=>{ if(e.key == 'Enter' && inputTodo.value != ""){ createNewTodo(inputTodo.value); } });
        btnAddTodo.addEventListener("click", e=>{ if(inputTodo.value != ""){ createNewTodo(inputTodo.value); } });
        interactive.addEventListener("click", interactiveContainer);
        clearComplete.addEventListener("click", clearCompleted);
        markToDo();
    });
    
  return (
    <main className="todo-container">
        <div className="todo-input border-radius"> 
          <label htmlFor="todo-add" className="label-add"></label>
          <input type="text" name="todo-add" id="todo-add" placeholder="Create a new todo..."/>
          <button className="btn-add_todo">add</button>
        </div>

        <ul className='todo-ul'> </ul>

        <div className="interactive-options">
          <ItemsLeft/>
          
          <div className="interactive-container">
            <button className="interactive all activated">All</button>
            <button className="interactive active">Active</button>
            <button className="interactive completed">Completed</button>
          </div>

          <button className="interactive clear-completed">Clear Completed</button>
        </div>
    </main>
  );
};
