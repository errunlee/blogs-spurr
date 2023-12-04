import { createSlice } from "@reduxjs/toolkit";
import { createBlog, removeBlog, getBlogs, login, logout } from "./reducers";

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
  },
});

export const { addBlog, deleteBlog, readBlogs, signIn, signUserOut } =
  blogSlice.actions;

export default blogSlice.reducer;
