import { current } from "@reduxjs/toolkit";

export const createBlog = (state, action) => {
  state.blogs.push(action.payload);
};

export const removeBlog = (state, action) => {
  state.blogs.filter((blog) => {
    blog.id !== action.payload;
  });
};

export const getBlogs = (state, action) => {
  state.blogs = action.payload;
  console.log(current(state));
};

export const login = (state, action) => {
  console.log("loggigin in ", action.payload);
  state.user = action.payload;
};

export const logout = (state) => {
  state.user = null;
};

export const addComment = (state, action) => {
  state.blogs.map((blog) => {
    if (blog._id === action.payload.id) {
      blog.comments = [...blog.comments, action.payload.comment];
    }
  });
};

export const commentReply = (state, action) => {
  const updatedComments = action.payload.comments.map((comment) => {
    if (comment.id === action.payload.commentId) {
      const newReplies = [...comment.replies, action.payload.reply];
      return { ...comment, replies: newReplies };
    } else {
      return comment;
    }
  });
  console.log(updatedComments);
  state.blogs.map((blog) => {
    if (blog._id === action.payload.id) {
      blog.comments = updatedComments;
    }
  });
};
