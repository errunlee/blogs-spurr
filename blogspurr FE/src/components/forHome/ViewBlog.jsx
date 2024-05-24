import React, { useEffect, useState } from "react";
import BasicModal from "../BasicModal";
import parse from "html-react-parser";
import { Link, useNavigate } from "react-router-dom";
import adminService from "../../services/admin";
import ConfirmDialog from "../ConfirmDialog";
import { useSelector } from "react-redux";
import dbService from "../../services/config";
import { notify } from "../Blogform/Toaster";
function ViewBlog({ blogData }) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [agree, setAgree] = useState(false);

  const noImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
  const content = blogData.blog;
  const postedAt = new Date(blogData?.postedAt).toLocaleString("en-US");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const role = useSelector((state) => state.user?.role);

  const { selectedTags } = blogData;

  const reportFunc = async () => {
    const payload = {
      id: blogData._id,
      uid: blogData.user,
    };
    const res = await adminService.reportBlog(blogData._id, payload);
    console.log(res);
  };

  const handleReport = async () => {
    // setLoading(true)

    setOpen(true);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (agree) {
      if (role === "ADMIN") {
        dbService.deleteBlog(blogData._id);
        notify("Blog deleted successfully");
      } else {
        reportFunc();
        notify("Blog reported successfully");
      }
      setOpen(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setOpen(false);
    }
  }, [agree]);
  return (
    <div className=" mt-3">
      <BasicModal isLoading={loading}></BasicModal>
      {role == "ADMIN" && (
        <p className="my-2">Be Cautious: You are viewing as an admin.</p>
      )}
      <img className="max-h-[400px]" src={blogData.photo || noImage} alt="" />

      <div className="flex items-center">
        Tags
        {selectedTags?.map((tag) => {
          return (
            <Link
              to={`/filter/${tag?.name}`}
              key={tag?.name}
              className="btn-sm bg-blue-500 px-2 py-1 rounded hover:bg-blue-300 m-2"
            >
              {tag?.name}
            </Link>
          );
        })}
      </div>

      <h1 className="text-3xl font-extrabold mt-5 text-light capitalize">
        {blogData.title}
      </h1>

      <p className="text-gray-300 text-sm my-2 ">
        Posted <span className="lowercase">on</span> {postedAt}
      </p>

      <p className="font-bold text-[#ea580c]">Posted by:{blogData.postedBy}</p>
      <div>
        <div>{parse(content)}</div>
      </div>

      <div className="flex gap-2 my-2">
        <p>Found this blog inappropriate?</p>
        <button
          onClick={handleReport}
          className="bg-red-200 text-black px-2 rounded"
        >
          {role && role === "ADMIN" ? "Delete this blog" : " Report this blog"}
        </button>
      </div>
      <ConfirmDialog
        open={open}
        setAgree={setAgree}
        message={
          role !== "ADMIN"
            ? '"Are you sure you want to report this post?"'
            : '"Are you sure you want to delete this post?"'
        }
        setOpen={setOpen}
      />
    </div>
  );
}

export default ViewBlog;
