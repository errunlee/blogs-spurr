import React, { useState } from "react";
import dbService from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addblog = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const notify = (status) => toast(status);

  const handleAddBlog = async () => {
    const isAdded = await dbService.addBlog( title, detail );
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
      
      <h1 className="text-red-800 mx-2 text-lg">Add blog</h1>
      <input
        className="border-2 bg-blue-100 mx-2 p-2"
        required
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border-2 bg-blue-100 mx-2 p-2"
        required
        type="text"
        placeholder="Detail"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      />
      <button className="btn bg-blue-600 px-3 py-2" onClick={handleAddBlog}>
        Post blog
      </button>
    </div>
  );
};

export default Addblog;
