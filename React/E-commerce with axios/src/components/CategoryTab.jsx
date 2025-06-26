import React from "react";

const CategoryTab = ({ category, isChosen, onClick }) => {
  const { name } = category;

  return (
    <div
      onClick={onClick}
      className={`${
        isChosen
          ? "bg-purple-900 text-white"
          : "bg-white text-black hover:bg-purple-200"
      } p-2 px-4 rounded-md border-purple-400 cursor-pointer border`}
    >
      <h1>{name}</h1>
    </div>
  );
};

export default CategoryTab;
