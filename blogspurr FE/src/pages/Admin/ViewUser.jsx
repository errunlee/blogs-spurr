import React, { useEffect, useState } from "react";
import adminService from "../../services/admin";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../../../src/components/ConfirmDialog";
import Toaster, { notify } from "../../components/Blogform/Toaster";
const ViewUser = () => {
  const { id } = useParams();
  const [user1, setUser] = React.useState({});

  const [open, setOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const getUserDetails = async () => {
    const res = await adminService.getUserById(id);
    setUser(res);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const deleteFunc = async () => {
    try {
      await adminService.deleteUser(id);
      notify("User banned successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    if (agree) {
      deleteFunc();
    } else {
      setOpen(false);
    }
  }, [agree]);

  const handleBan = () => {
    setOpen(true);
  };

  const { user } = user1;
  debugger;
  if (!user) return;
  return (
    <div className="flex flex-col items-start gap-2">
      <Toaster />
      <h1 className="text-lg ">
        {" "}
        You are viewing details of{" "}
        <span className="font-bold text-yellow-500">{user?.name}</span>
      </h1>
      <div className="flex flex-col border p-3">
        <p>
          {" "}
          Name: <strong className="text-yellow-600">{user?.name}</strong>
        </p>
        <p>
          {" "}
          Email: <strong className="text-yellow-600">{user?.email}</strong>
        </p>
        <p>
          {" "}
          Account Created At:{" "}
          <strong className="text-yellow-600">{user?.date}</strong>{" "}
        </p>
        <h1>
          Blogs posted by USER1 has been report{" "}
          <h1 className="text-xl inline font-bold">{user1?.noOfReports} </h1>
          times
        </h1>
      </div>
      <button
        onClick={handleBan}
        className="bg-red-200 text-slate-900 rounded px-3 py-1"
      >
        Ban User
      </button>
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        setAgree={setAgree}
        message="Are you sure to ban this user?"
      />
    </div>
  );
};

export default ViewUser;
