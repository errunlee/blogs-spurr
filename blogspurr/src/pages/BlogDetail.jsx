import React, { useEffect, useState } from "react";
import ViewBlog from "../components/forHome/ViewBlog";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom";
import dbService from "../firebase/config";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import EditDelete from "../components/forHome/EditDelete";
import { useSelector } from "react-redux";
import BasicModal from "../components/BasicModal";
function BlogDetail() {
  const [blogData, setBlogData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading,setLoading]=useState(true)
  const { id } = useParams();
  const user = useSelector((state) => state.user);

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

  return (
    <div className="p-3 relative">
      <ViewBlog blogData={blogData} />
      <Comments comments={comments} id={id} />

      <div className="absolute top-1 right-2">
        <EditDelete isVisible={isVisible} id={id}/>
      </div>
      <BasicModal isLoading={loading}/>
    </div>
  );
}

export default BlogDetail;
