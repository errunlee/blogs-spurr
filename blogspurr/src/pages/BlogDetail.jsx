import React, { useEffect, useState } from "react";
import ViewBlog from "../components/forHome/ViewBlog";
import Comments from "../components/comment/Comments";
import { useNavigate, useParams } from "react-router-dom";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import EditDelete from "../components/forHome/EditDelete";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
function BlogDetail() {
  const [blogData, setBlogData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading,setLoading]=useState(true)
  const { id } = useParams();
  const navigate=useNavigate();

  const user = useSelector((state) => state.user);

  if(!user){
    navigate('/login')
  }
  useEffect(() => {
    setLoading(true)
    const docRef = doc(db, "blogs", id);

    const unsub = onSnapshot(docRef, (doc) => {
      setBlogData(doc.data());
    });
    setLoading(false)

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const show = user?.email === blogData?.postedBy;
    console.log(user?.email+','+ blogData?.postedBy);
    setIsVisible(show);
  }, [user,blogData]);

  if (!blogData) {
    return;
  }
  const comments = blogData.comments || [];

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
        <EditDelete isVisible={isVisible} id={id}/>
      </div>
    </motion.div>
  );
}

export default BlogDetail;
