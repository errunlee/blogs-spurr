import React, { useEffect, useState } from "react";
import BasicModal from "../BasicModal";
import parse from 'html-react-parser';

function ViewBlog({ blogData }) {
  const [loading, setLoading] = useState(true);
  const noImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
  const content = blogData.blog;
  const postedAt = new Date(blogData?.postedAt).toLocaleString('en-US');

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const { selectedTags } = blogData;

  return (
    <div className=" mt-3">
      <BasicModal isLoading={loading}></BasicModal>
      <img className="max-h-[400px]" src={blogData.image || noImage} alt="" />

      <div className="flex items-center">
        Tags
        {selectedTags?.map((tag) => {
          return (
            <button key={tag?.name} className="btn-sm bg-blue-500 px-2 py-1 rounded hover:bg-blue-300 m-2">
              {tag?.name}
            </button>
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
        <div>
          {parse(content)}
        </div>
      </div>
    </div>
  );
}

export default ViewBlog;
