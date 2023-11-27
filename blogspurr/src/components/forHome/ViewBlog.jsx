import React, { useEffect, useState } from "react";
import BasicModal from "../BasicModal";

function ViewBlog({ blogData }) {
  const [loading,setLoading]=useState(true)
  const noImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
  const content = blogData.blog;
  const postedAtinSec = blogData?.postedAt?.seconds;
  const postedAt = new Date(postedAtinSec * 1000).toLocaleString();
  
  useEffect(() => {
    const interval=setInterval(() => {
      setLoading(false)
    }, (1000));
  
    return () => {
      clearInterval(interval)
    }
  }, [])
  
  return (
    <div className=" ">
      <BasicModal isLoading={loading}></BasicModal>
      <img className="w-1/2 h-[400px]" src={blogData.image || noImage} alt="" />
      <h1 className="text-3xl font-extrabold mt-5 text-[#581c87] capitalize">
        {blogData.title}
      </h1>

      <p className="text-gray-600 text-sm my-2 ">
        Posted <span className="lowercase">on</span> {postedAt}
      </p>

      <p className="font-bold text-[#ea580c]">Posted by:{blogData.postedBy}</p>
      <div>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </div>
  );
}

export default ViewBlog;
