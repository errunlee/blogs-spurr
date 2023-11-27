import React, { useEffect, useState } from "react";
import dbService from "../../firebase/config";
import { Link } from "react-router-dom";
import BasicModal from "../BasicModal";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading,setLoading]=useState(false)
  const getBlogs = async () => {
    setLoading(true)
    try {
      const allBlogs = await dbService.getAllBlogs();
      setBlogs(allBlogs);
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <BasicModal isLoading={loading}/>

    <div className="grid grid-cols-4">
      {blogs.length > 0 &&
        blogs.map((blog) => {
          const content = blog.blog;

          const postedAtinSec = blog?.postedAt?.seconds;
          const postedAt = new Date(postedAtinSec * 1000).toLocaleString();
          const noImage =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
          return (
            <Link
              to={`/viewblog/${blog.id}`}
              key={blog.id}
              className="m-3 rounded my-2 p-4 shadow-lg hover:scale-125 transition-all pb-9"
            >
              <div className="flex items-center  gap-3 mb-4">
                <img
                  className="rounded aspect-square h-[60px] w-[60px]"
                  src={blog.image || noImage}
                  alt="poster"
                />
                <h1 className="text-2xl font-bold">{blog.title}</h1>
              </div>
              <span className="text-[#737373]">Posted on {postedAt}</span>
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
    </>
  );
};

export default Blogs;
