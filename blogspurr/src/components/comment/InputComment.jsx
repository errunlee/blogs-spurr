import React, { useState } from "react";
import dbService from "../../firebase/config";
import Toaster from "../Blogform/Toaster";
import { toast } from "react-toastify";
import BasicModal from "../BasicModal";
import { useSelector } from "react-redux";
import { serverTimestamp } from "firebase/firestore";

function InputComment({ comments, id }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const notify = (status) => toast(status);

  const currentUser = useSelector((state) => state.user);

  const handleAdd = async () => {

    setLoading(true);
    
    try {
      const payload = {
        comment,
        commentedBy: currentUser.displayName,
        replies:[],
        id:Date.now()
      };
      await dbService.addNewComment(id, payload, comments);
      setComment("");
      notify("Comment added successfullly");
    } catch (e) {
      notify("Failed to comment right now"+e);
    }
    setLoading(false);
  };
  return (
    <div>
      <Toaster />

      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        type="text"
        className="px-3 py-2 border-2 text-black "
      />
      <button
        className="px-3 py-2 bg-blue-500 hover:bg-blue-300"
        onClick={handleAdd}
      >
        Add comment
      </button>
    </div>
  );
}

export default InputComment;
