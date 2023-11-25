import React, { useEffect, useState } from "react";
import ViewBlog from "../components/forHome/ViewBlog";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom";
import dbService from "../firebase/config";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
function BlogDetail() {
  const [blogData, setBlogData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const docRef = doc(db, "blogs", id);

    const unsub = onSnapshot(docRef, (doc) => {
      console.log("Current data: ", doc.data());
      setBlogData(doc.data());
    });

    return () => {
      unsub();
    };
  }, []);

  if (!blogData) {
    return;
  }
  const comments = blogData.comments || [];
  return (
    <div className="p-3">
      <ViewBlog blogData={blogData} />
      <Comments comments={comments} id={id} />
    </div>
  );
}

export default BlogDetail;
