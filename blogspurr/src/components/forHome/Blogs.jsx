import React, { useEffect, useState } from "react";
import dbService from "../../firebase/config";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      const allBlogs = await dbService.getAllBlogs();
      setBlogs(allBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <h1> You are logged in so you are seeing this blogs.</h1>
      {
        blogs.length>0 && blogs.map((blog)=>{
            return(
                <div key={blog.id} className="border border-2 my-2 p-3">
                    <h1 className="text-3xl">{blog.title}</h1>
                    <p className="text-2xl mb-4">{blog.blog}</p>
                </div>
            )
        })
      }
    </>
  );
};

export default Blogs;
