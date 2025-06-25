import React from "react";

const TodoInput = ({ onChange, onClick, value, }) => {
  return (
    <div className="my-5">
      <input
        onChange={onChange}
        placeholder="Add todo"
        className="border border-gray-200 rounded-sm p-2"
        value={value}
      />
      <button
        onClick={onClick}
        className="bg-cyan-200 rounded px-3 py-2 font-semibold ml-3"
        disabled={!value.trim()}
      >
        Add todo
      </button>
    </div>
  );
};

export default TodoInput;
