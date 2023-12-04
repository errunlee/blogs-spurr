import React, { useState } from "react";
import dbService from "../../firebase/config";
import Toaster, { notify } from "../Blogform/Toaster";
import BasicModal from "../BasicModal";
import { useNavigate,Link } from "react-router-dom";

function EditDelete({ isVisible, id }) {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  if (!isVisible) return;

  const deleteBlog = async () => {
    setLoading(true)
    try {
      await dbService.deleteBlog(id);
      navigate('/')
    } catch (error) {
        console.log(error);
    }
    finally{
        setLoading(false)
    }
  };

  return (
    <>
    <div>
      <Toaster />
      <Link to={`/edit-post/${id}`} class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-2">
        Edit
      </Link>
      <button
        onClick={deleteBlog}
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete
      </button>
    </div>
    <BasicModal isLoading={loading}/>

    </>
  );
}

export default EditDelete;
