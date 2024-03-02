import React, { useEffect, useState } from "react";
import ViewBlog from "../components/forHome/ViewBlog";
import Comments from "../components/comment/Comments";
import { useNavigate, useParams } from "react-router-dom";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import EditDelete from "../components/forHome/EditDelete";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import instance from "../api/instance";
import { readBlogs } from "../features/blogSlices";
function BlogDetail() {
  const [blogData, setBlogData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const { id } = useParams();
  const navigate = useNavigate();
  const blogs = useSelector(state => state.blogs)
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()



  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    window.scrollTo({ top: 0 })
  }, [])

  const getBlogData = async () => {
    try {
      const res = await instance.get('/notes/fetchallnotes')
      const blogs = res.data
      dispatch(readBlogs(blogs))
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    setLoading(true)
    if (!blogs) {
      getBlogData();
    }
    else {
      const currentBlog = blogs?.filter((blog) => blog._id === id)
      setBlogData(currentBlog[0])
      setComments(currentBlog[0]?.comments)
    }
  }, [blogs]);

  useEffect(() => {
    const show = user?.email === blogData?.postedBy;
    console.log(user?.email + ',' + blogData?.postedBy);
    setIsVisible(show);
  }, [user, blogData]);


  if (!blogData) return

  document.title = `${blogData?.title} | Blogspurr`

  const childVariants = {
    initial: {
      opacity: 0,
    },
    final: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
  };

  return (
    <motion.div variants={childVariants} initial='initial' animate='final' className="px-9 relative">
      <ViewBlog blogData={blogData} />
      <Comments comments={comments} id={id} />

      <div className="absolute top-1 right-2">
        <EditDelete isVisible={isVisible} id={id} />
      </div>
    </motion.div>
  );
}

export default BlogDetail;
