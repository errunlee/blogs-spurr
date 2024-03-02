import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import api from "../api/instance.js";
import { addCommentRed } from "../features/blogSlices.js";
import { useDispatch } from "react-redux";
export class DbService {
  async addBlog(
    title,
    blog,
    image,
    postedBy,
    comments = [],
    selectedTags = []
  ) {
    const time = Date.now();

    //code to insert blog into database
    try {
      const res = await api.post("/notes/addblog", {
        title,
        blog,
        image,
        postedBy,
        comments,
        selectedTags,
      });
      return res;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  }

  async getAllBlogs() {
    const res = await api.get("/notes/fetchallnotes");
    return res.data;
  }

  async deleteBlog(id) {
    try {
      await api.delete(`/notes/deleteblog/${id}`);
    } catch {
      return true;
    }
  }

  async addNewComment(docId, comment, comments) {
    const updatedComments = [...comments, comment];
    try {
      const res = await api.put(`/notes/editblog/${docId}`, {
        updatedComments,
      });
      addCommentRed(res);
    } catch (e) {
      console.log(e);
    }
  }

  async replyToComment(commentId, comments, reply, docId) {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const newReplies = [...comment.replies, reply];
        return { ...comment, replies: newReplies };
      } else {
        return comment;
      }
    });

    try {
      api.put(`notes/editblog/${docId}`, {
        updatedComments,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async editPost(docId, editedPost, editedTitle, editedTags) {
    try {
      api.put(`notes/editblog/${docId}`, {
        editedTitle,
        editedPost,
        editedTags,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

const dbService = new DbService();

export default dbService;
