import React from "react";

const FilterButton = ({filter, setFilter}) => {
  return (
    <div className="flex justify-around items-center my-4">
      <button
        onClick={() => setFilter("All")}
        className={`${
          filter === "All" ? "bg-teal-400 text-white" : "bg-teal-100"
        } rounded p-2 px-4 font-semibold`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("Complete")}
        className={`${
          filter === "Complete" ? "bg-teal-400 text-white" : "bg-teal-100"
        } rounded p-2 px-4 font-semibold`}
      >
        Complete
      </button>
      <button
        onClick={() => setFilter("Incomplete")}
        className={`${
          filter === "Incomplete" ? "bg-teal-400 text-white" : "bg-teal-100"
        } rounded  p-2 px-4 font-semibold`}
      >
        Incomplete
      </button>
    </div>
  );
};

export default FilterButton;
