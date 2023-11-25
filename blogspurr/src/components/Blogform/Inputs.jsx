import React from "react";

const Inputs = ({ title, setTitle, photo, setPhoto }) => {

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };


  return (
    <section>
      <div className="files flex flex-col mb-2">
        <label htmlFor="">Upload image <span className="text-red-500 text-xl">*</span></label>
        <input
          onChange={(e) => handlePhotoChange(e)}
          type="file"
        />
      </div>

      <p>Title:<span className="text-red-500 text-xl">*</span></p>
      <input
        type="text"
        className="border-b-2 outline-none border-black focus:border-b-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </section>
  );
};

export default Inputs;

