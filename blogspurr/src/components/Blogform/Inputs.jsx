import React, { useEffect, useState } from "react";
import Tag from "./Tag";

const Inputs = ({ title, setTitle, photo, setPhoto, tags, setTags, setSelectedTags, selectedTags, isEditing }) => {

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleClick = (tag) => {
    const { isSelected } = tag;
    // console.log('is ',tag);
    if (isSelected) {
      const newTags = selectedTags.filter((item) => item.name !== tag.name);
      setSelectedTags(newTags);
      tag.isSelected = false;
    } else {
      setSelectedTags((prev) => [...prev, tag]);
      tag.isSelected = true;
    }
  };

  useEffect(() => {
    console.log('selection', selectedTags);
    const newtags = tags.map((tag) => {
      const isSelected = selectedTags.some(selectedTag => selectedTag.name === tag.name);
      return { ...tag, isSelected };
    });

    setTags(newtags)
  }, [selectedTags])
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
          return (
            <Tag tag={tag} handleClick={handleClick} />
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
