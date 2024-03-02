import React, { useEffect, useState } from "react";

function Tag({ tag, handleClick }) {

  const { isSelected } = tag

  return (
    <>
      <button
        onClick={() => handleClick(tag)}
        className={`btn-sm bg-gray-100 m-2 text-black rounded px-2 py-1 transition-all ${isSelected ? "bg-gray-600 text-white" : null
          }`}
      >
        {tag.name}

        {isSelected && <span className="ms-2 text-red-200">x</span>}
      </button>
    </>
  );
}

export default Tag;
