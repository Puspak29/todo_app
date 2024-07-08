import { useEffect, useState } from "react";
import { TodoForm, TodoItem } from "./components";
import { TodoProvider } from "./contexts";
import { jsx } from "react/jsx-runtime";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo=(todo)=>{
    setTodos((prev)=> [{id: Date.now(), ...todo},...prev])
  }

  const updateTodo=(id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>{prevTodo.id===id ? todo : prevTodo}))
  }

  const deleteTodo=(id)=>{
    setTodos((prev)=> prev.filter((todo)=> todo.id !== id))
  }

  const toggleComplete=(id)=>{
    setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id===id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  useEffect(()=>{
    const todos= JSON.parse(localStorage.getItem("todo"))

    if(todos && todos.length>0){
      setTodos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todo", JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-gray-800 min-h-screen py-8 align-top flex flex-col items-center">
        <div className="mb-4 w-3/5">
          <h1 className="text-white text-2xl font-bold text-center mb-8 mt-2">Manage Todos</h1>
          <TodoForm />
        </div>
        <div className="w-3/5">
          <TodoItem />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
