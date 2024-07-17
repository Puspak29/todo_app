import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoItem({todo}) {
    const [todoEditable,setTodoEditable]= useState(false)
    const [todoMsg, setTodoMsg]= useState(todo.todo)
    const {deleteTodo, updateTodo, toggleComplete}= useTodo()

    const editTodo=()=>{
      updateTodo(todo.id, {...todo, todo: todoMsg})
      setTodoEditable(false)
    }

    const toggleCompleted=()=>{
      toggleComplete(todo.id)
    }


  return (
    <div className={`flex border border-black rounded-lg px-3 py-1.5 gap-x-3 duration-300 text-black shadow-sm shadow-white ${todo.completed? "bg-purple-500" : "bg-white"}`}>
      <input 
      type="checkbox" 
      className="cursor-pointer" 
      checked={todo.completed} 
      onChange={toggleCompleted} 
      disabled={todoEditable}
      />
      <input 
      type="text" 
      className={`border outline-none w-full bg-transparent rounded-lg ${todoEditable? "border-black px-2" : "border-transparent"} ${todo.completed? "line-through" : ""}`} 
      value={todoMsg} 
      onChange={(e)=> setTodoMsg(e.target.value)} 
      readOnly={!todoEditable} 
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black justify-center items-center bg-green-500 hover:bg-green-800 text-white shrink-0 disabled:opacity-50"
        onClick={()=>{
          if(todo.completed) return
          if(todoEditable){
            editTodo();
          }else{
            setTodoEditable((prev)=> !prev);
          }
        }}
        disabled={todo.completed}
      >
        {todoEditable? "Save" : "Edit"}
      </button>
      <button 
      className="inline-flex w-8 h-8 rounded-lg text-sm border border-black justify-center items-center bg-green-500 hover:bg-green-800 text-white shrink-0"
      onClick={()=> deleteTodo(todo.id)}
       >
        Del
      </button>
    </div>
  );
}

export default TodoItem;
