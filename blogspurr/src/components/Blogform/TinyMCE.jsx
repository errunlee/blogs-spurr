import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dbService from "../../firebase/config";
import Toaster from "./Toaster";
import Inputs from "./Inputs";
import { storageService } from "../../firebase/storage";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

export default function TinyMCE() {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null)

  const notify = (status) => toast(status);
  const currentUser=useSelector(state=>state.user)


  const editorRef = useRef(null);

  //   add blog to db
  const handleAddBlog = async () => {
    if(!currentUser){
      return notify('Please Login First')
    }
    let detail;

    // get text from tinyMCE editor
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      detail = editorRef.current.getContent();
    } else {
      notify("All fields required!");
      return;
    }
    //
    if (title === "" || detail === "" || photo===null) {
      notify("All fields are required!");
      return;
    }

    const getPhotoUrl=await storageService.uploadImage(photo)

    const isAdded = await dbService.addBlog(title, detail,getPhotoUrl);

    if (isAdded) {
      notify("Blog posted successfully");
      setTitle("");
    } else {
      notify("Failed to post blog");
    }
  };

  //

  return (
    <>
      <Toaster />
      <Editor
        apiKey="hiyi55219jowbez4et4l15xk73k2wh14bdeio77aave8j5k5"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          width: "70%",
          resize: false,
          auto_focus: "elm1",
        }}
      />
      <div>
        <Inputs title={title} setTitle={setTitle} photo={photo} setPhoto={setPhoto}/>
        <button
          className="mt-1 btn bg-yellow-500 px-3 py-2 flex justify-center items-center gap-3"
          onClick={handleAddBlog}
          title="Publish"
        >
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/bubbles/50/upload.png"
            alt="publish"
          />{" "}
          Publish Blog
        </button>
      </div>
    </>
  );
}
