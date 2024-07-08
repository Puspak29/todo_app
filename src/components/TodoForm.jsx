import React, { useState } from 'react'
import { useTodo } from '../contexts';

function TodoForm() {
    const [todo,setTodo]= useState("")
    const {addTodo}= useTodo()

    const add= (e)=>{
        e.preventDefault()
    }
  return (
    <form className="flex">
      <input type="text" placeholder="Add Todo" className="w-full border border-black rounded-l-lg px-3 outline-none duration-150 bg-white py-1.5" />
      <button type="submit" className="bg-blue-800 border-black rounded-r-lg px-3 py-1 text-white hover:bg-blue-900 shrink-0">
        Add
      </button>
    </form>
  );
}

export default TodoForm
