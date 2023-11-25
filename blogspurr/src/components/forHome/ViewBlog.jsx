import React, { useEffect } from "react";
import authService from "../../firebase/auth";

function ViewBlog({ blogData }) {


  const noImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
    const content=blogData.blog;
  return (
    <div className="capitalize">
      <img className="w-1/2 h-[400px]" src={blogData.image || noImage} alt="" />
      <h1 className="text-3xl font-bold mt-2">{blogData.title}</h1>

      <p className="text-gray-600 text-sm my-2">Posted {blogData?.postedAt?.seconds}seconds ago</p>

      <p>Posted by:{blogData.postedBy}</p>
      <div>
        <div dangerouslySetInnerHTML={{ __html: content}}></div>
      </div>
    </div>
  );
}

export default ViewBlog;
