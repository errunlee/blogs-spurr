import React, { useState } from "react";
import dbService from "../../firebase/config";
import Toaster from "../Blogform/Toaster";
import { toast } from "react-toastify";
import BasicModal from "../BasicModal";

function InputComment({ comments, id }) {
  const [comment, setComment] = useState("");
  const [loading,setLoading]=useState(false)
  const notify = (status) => toast(status);

  const handleAdd = async () => {
    setLoading(true)
    try{
      await dbService.addNewComment(id, comment,comments);
      setComment('');
      notify("Comment added successfullly")
    }
    catch(e){
      notify("Failed to comment right now")
    }
    setLoading(false)
  };
  return (
    <div>
    <Toaster/>

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
