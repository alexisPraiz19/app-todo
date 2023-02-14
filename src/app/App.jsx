// Tools
import { useState, useEffect } from 'react';
import { getTodo, todoDefault , listTask, initCounter } from '/public/todoFunctions';

// Components
import Header from '../components/Header';
import Todo from '../components/Todo';

// Styles 
import '../css/app.css';

export default function App() {
  useEffect(()=>{
    if(getTodo() == null) todoDefault();
    else listTask();
    initCounter();
  });

  return (
    <div className="app">
       <Header/>
       <Todo/>
    </div>
  );
};


