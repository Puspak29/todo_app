import React from "react";

function TodoItem() {
  return (
    <div className="flex border border-black rounded-lg px-3 py-1.5 gap-x-3 duration-300 text-black shadow-sm shadow-white">
      <input type="checkbox" className="cursor-pointer" />
      <input type="text" className="border outline-none w-full border-transparent rounded-lg" readOnly />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black justify-center items-center bg-green-500 hover:bg-green-800 text-white shrink-0 disabled:opacity-50"
        disabled
      >
        Edit
      </button>
      <button className="inline-flex w-8 h-8 rounded-lg text-sm border border-black justify-center items-center bg-green-500 hover:bg-green-800 text-white shrink-0">
        Del
      </button>
    </div>
  );
}

export default TodoItem;
