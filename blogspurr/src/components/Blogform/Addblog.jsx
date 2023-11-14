import React, { useState } from "react";
import dbService from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addblog = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const notify = (status) => toast(status);

  const handleAddBlog = async () => {
    const isAdded = await dbService.addBlog(title, detail);
    if (isAdded) {
      notify("Blog posted successfully");
      setTitle("");
      setDetail("");
    } else {
      notify("Failed to post blog");
    }
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

      <button className=" btn bg-yellow-500 px-3 py-2 flex justify-center items-center gap-3" onClick={handleAddBlog} title="Publish">
        <img
          width="30"
          height="30"
          src="https://img.icons8.com/bubbles/50/upload.png"
          alt="publish"
        />{" "}
        Publish Blog
      </button>
    </div>
  );
};

export default Addblog;
