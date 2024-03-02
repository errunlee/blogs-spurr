import { createSlice } from "@reduxjs/toolkit";
import {
  createBlog,
  removeBlog,
  getBlogs,
  login,
  logout,
  addComment,
  commentReply,
} from "./reducers";

const initialState = {
  user: null,
  blogs: [],
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog: createBlog,
    deleteBlog: removeBlog,
    readBlogs: getBlogs,
    signIn: login,
    signUserOut: logout,
    addCommentRed: addComment,
    replyToComment: commentReply,
  },
});

export const {
  addBlog,
  deleteBlog,
  readBlogs,
  signIn,
  signUserOut,
  addCommentRed,
  replyToComment,
} = blogSlice.actions;

export default blogSlice.reducer;
