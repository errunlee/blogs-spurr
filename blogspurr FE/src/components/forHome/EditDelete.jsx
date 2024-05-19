import React, { useEffect, useState } from "react";
import dbService from "../../services/config";
import Toaster, { notify } from "../Blogform/Toaster";
import BasicModal from "../BasicModal";
import { useNavigate, Link } from "react-router-dom";
import ConfirmDialog from "../ConfirmDialog";

function EditDelete({ isVisible, id }) {
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const deleteBlog = async () => {
    // setLoading(true)
    setOpen(true);
  };

  const deleteFunc = async () => {
    setLoading(true);
    try {
      await dbService.deleteBlog(id);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (agree) {
      deleteFunc();
    } else {
      setOpen(false);
    }
  }, [agree]);
  if (!isVisible) return;
  return (
    <>
      <div>
        <Toaster />
        <Link
          to={`/edit-post/${id}`}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Edit
        </Link>
        <button
          onClick={deleteBlog}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
      <ConfirmDialog open={open} setOpen={setOpen} setAgree={setAgree} />
      <BasicModal
        message={"Are you sure you want to delete the blog?"}
        isLoading={loading}
      />
    </>
  );
}

export default EditDelete;
