import { useEffect } from "react";
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

export class DbService {
  async addBlog(
    title,
    blog,
    image,
    postedBy,
    comments = [],
    selectedTags = []
  ) {
    const time = serverTimestamp();

    //code to insert blog into database
    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        title,
        blog,
        image,
        postedBy,
        postedAt: time,
        selectedTags,
        comments,
      });
      console.log("Document written with ID: ", docRef.id, "at", time);
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  }

  async getAllBlogs() {
    const q=query(collection(db,"blogs"),orderBy("postedAt","desc"))
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  }

  async deleteBlog(id) {
    await deleteDoc(doc(db, "blogs", id));
    return true;
  }

  // async fetchDoc(id) {
  //   const docRef = doc(db, "blogs", id);
  //   return new Promise((resolve, reject) => {
  //     const unsubscribe = onSnapshot(docRef, (doc) => {
  //       if (doc.exists()) {
  //         unsubscribe(); // Stop listening for changes once the initial data is retrieved
  //         resolve(doc.data());
  //       } else {
  //         unsubscribe(); // Stop listening if document doesn't exist
  //         resolve(null);
  //       }
  //     }, (error) => {
  //       // Reject the promise if there's an error
  //       reject(error);
  //     });
  //   });
  // }

  async addNewComment(docId, comment, comments) {
    const updatedComments = [...comments, comment];
    try {
      const docRef = doc(db, "blogs", docId);
      await updateDoc(docRef, {
        comments: updatedComments,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async replyToComment(commentId, comments, reply,docId) {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const newReplies=[...comment.replies, reply]
         return {...comment,replies:newReplies}
      } else {
        return comment;
      }
    });

    try {
      const docRef = doc(db, "blogs", docId);
      await updateDoc(docRef, {
        comments: updatedComments,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async editPost(docId,editedPost,editedTitle,editedTags){
    try {
      const docRef = doc(db, "blogs", docId);
      await updateDoc(docRef, {
        blog:editedPost,
        title:editedTitle,
        selectedTags:editedTags
      });
    } catch (e) {
      console.log(e);
    }
  }
}

const dbService = new DbService();

export default dbService;
