import React, { useState } from "react";

const Inputs = ({ title, setTitle, photo, setPhoto,tags,setSelectedTags,selectedTags }) => {

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleClick = (tag) => {
    const { isSelected } = tag;
    console.log(selectedTags);
    if (isSelected) {
      const newTags = selectedTags.filter((item) => item.name !== tag.name);
      setSelectedTags(newTags);
      tag.isSelected = false;
    } else {
      setSelectedTags((prev) => [...prev, tag]);
      tag.isSelected = true;
    }
  };

  return (
    <section>
      <div className="files flex flex-col mb-2">
        <label htmlFor="">Upload image</label>
        <input onChange={(e) => handlePhotoChange(e)} type="file" />
      </div>

      <section className="tags">
        <span>Tags</span>
        <span className="text-red-500">*</span>
        <br />
        {tags.map((tag) => {
          const { isSelected } = tag;
          return (
            <button
              onClick={() => handleClick(tag)}
              className={`btn-sm bg-gray-100 m-2 text-black rounded px-2 py-1 transition-all ${
                isSelected ? "bg-gray-600 text-white" : null
              }`}
            >
              {tag.name}

              {isSelected && <span className="ms-2 text-red-200">x</span>}
            </button>
          );
        })}
      </section>
  
      <p>
        Title:<span className="text-red-500 text-xl">*</span>
      </p>
      <input
        type="text"
        className="border-b-2  outline-none border-white focus:border-b-3 bg-inherit"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </section>
  );
};

export default Inputs;
