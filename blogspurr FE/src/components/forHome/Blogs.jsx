import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import BasicModal from "../BasicModal";
import { motion, useScroll } from "framer-motion";
import "./blogs.css";
import { useDispatch, useSelector } from "react-redux";
import { readBlogs } from "../../features/blogSlices";
import dbService from "../../services/config";
const Blogs = ({ tag }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const getBlogs = async () => {
    setLoading(true);
    try {
      const allBlogs = await dbService.getAllBlogs();
      let filteredBlogs = allBlogs;

      if (tag) {
        filteredBlogs = allBlogs.filter((item) => {
          return item.selectedTags.some(
            (selectedTag) => selectedTag.name === tag
          );
        });
      }

      setBlogs(filteredBlogs);
      dispatch(readBlogs(filteredBlogs));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    getBlogs();
  }, []);

  return (
    <>
      <h1 className="lg:text-4xl text-2xl my-4 lg:mx-[5rem] mx-5">
        {!tag ? (
          " Latest blogs"
        ) : (
          <p>
            Blogs with tag{" "}
            <span className="text-yellow-400 font-bold border-b">{tag}</span>
          </p>
        )}
      </h1>

      <BasicModal isLoading={loading} />

      <div className="flex flex-col lg:px-[5rem] px-5 items-center">
        {blogs.length < 1 && !loading && (
          <p>
            No blogs found.{" "}
            <Link className="border-b hover:text-slate-300" to="/">
              Goto homepage
            </Link>
          </p>
        )}
        {blogs.length > 0 &&
          blogs?.map((blog, i) => {
            const postedAtinSec = blog?.postedAt?.seconds;
            const postedAt = new Date(postedAtinSec * 1000).toLocaleString();
            const noImage =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
            const { selectedTags } = blog;

            return (
              <motion.div
                key={blog._id}
                className="blog-item w-full  m-3 rounded my-2  shadow-lg  transition-all hover:-translate-y-2 "
                whileHover={{ scale: 1.02 }}
                initial={{ scale: 0.9 }}
                whileTap={{ scale: 0.97 }}
                whileInView={{
                  scale: 1,
                  transition: { duration: 0.1, delay: 0.1 },
                }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/viewblog/${blog._id}`}
                  className="block w-full h-full border p-4  pb-9"
                >
                  <section className="tags mb-3">
                    <span className="text-sm lg:text-md">Posted in </span>
                    {selectedTags.map((tag) => {
                      return (
                        <span
                          key={tag.name}
                          className="bg-yellow-300 px-1 lg:px-3 lg:py-2 rounded text-slate-700 m-1"
                        >
                          {tag.name}
                        </span>
                      );
                    })}
                  </section>

                  <div className="flex items-center  gap-3 mb-4">
                    <img
                      className="rounded aspect-square h-[60px] w-[60px]"
                      src={blog.photo || noImage}
                      alt="poster"
                    />
                    <h1 className="lg:text-2xl text-xl font-bold">
                      {blog.title}
                    </h1>
                  </div>
                  <span className="text-[#737373]">Posted on {postedAt}</span>
                </Link>
              </motion.div>
            );
          })}
      </div>
    </>
  );
};

export default Blogs;
