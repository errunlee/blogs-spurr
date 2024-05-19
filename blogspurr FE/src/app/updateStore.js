import { useSelector } from "react-redux";

// const blogs = useSelector((state) => state.blogs);

const addBlog = (newBlog) => {
  console.log("new", newBlog);
};
const addComment = () => {};
const addCommentReply = () => {};

export { addBlog, addComment, addCommentReply };
