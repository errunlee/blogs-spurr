import React, { useEffect, useState } from "react";
import dbService from "../../firebase/config";
import { Link } from "react-router-dom";
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
    <div className="grid grid-cols-4">
      {blogs.length > 0 &&
        blogs.map((blog) => {
          const content = blog.blog;
          const time=Math.floor((blog?.postedAt?.seconds/60)/60)
          // console.log(blog.postedAt);
          const noImage =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
          return (
            <Link
              to={`/viewblog/${blog.id}`}
              key={blog.id}
              className="m-3 rounded my-2 p-4 shadow-lg hover:scale-125 transition-all pb-9"
            >
              <div className="flex items-center  gap-3">
                <img
                  className="rounded aspect-square h-[60px] w-[60px]"
                  src={blog.image || noImage}
                  alt="poster"
                />
                <h1 className="text-2xl font-bold">{blog.title}</h1>
              </div>
              <span>Posted at :{time+' hours ago'}</span>
              {/* <div className="mt-3">
                <p
                  className=""
                  dangerouslySetInnerHTML={{ __html: content }}
                ></p>
              </div> */}
            </Link>
          );
        })}
    </div>
  );
};

export default Blogs;
