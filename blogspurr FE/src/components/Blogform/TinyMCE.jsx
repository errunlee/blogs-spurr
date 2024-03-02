import React, { useEffect, useRef, useState } from "react";
// import { Editor } from "@tinymce/tinymce-react";
import { Editor } from '../../../node_modules/@tinymce/tinymce-react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dbService from "../../firebase/config";
import Toaster from "./Toaster";
import Inputs from "./Inputs";
import { storageService } from "../../firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import BasicModal from "../BasicModal";
import { useNavigate } from "react-router-dom";
import { tags as tagArray } from "./tags";
import { addBlog } from '../../features/blogSlices'
export default function TinyMCE({
  editing = false,
  previousVal = '',
  previousTitle = '',
  prevTags = [],
  docId = null
}) {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(tagArray);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const [initialValue, setInitialValue] = useState('')

  const notify = (status) => toast(status);

  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  useEffect(() => {
    let newArray = tagArray.map(obj => ({ ...obj, isSelected: false }));
    setTags(newArray)
  }, [])

  //   add blog to db
  const handleAddBlog = async () => {
    if (!currentUser) {
      return notify("Please Login First");
    }
    let detail;

    // get text from tinyMCE editor
    if (editorRef.current) {
      detail = editorRef.current.getContent();
    } else {
      notify("All fields required!");
      return;
    }
    //
    if (title === "" || detail === "" || selectedTags?.length < 1) {
      notify("All fields are required!");
      return;
    }

    setLoading(true);
    const getPhotoUrl = await storageService.uploadImage(photo);
    let comments = []
    const isAdded = await dbService.addBlog(
      title,
      detail,
      getPhotoUrl,
      currentUser.email,
      comments,
      selectedTags
    );

    if (isAdded) {
      notify("Blog posted successfully");
      // addBlog()
      dispatch(addBlog(isAdded.data))
      setTitle("");
      setSelectedTags([])
    } else {
      notify("Failed to post blog");
    }
    setLoading(false);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };


  // edit blog

  const handleEditBlog = async () => {

    if (!currentUser) {
      return notify("Please Login First");
    }
    let detail;

    // get text from tinyMCE editor
    if (editorRef.current) {
      detail = editorRef.current.getContent();
    } else {
      notify("All fields required!");
      return;
    }
    //
    if (title === "" || detail === "" || selectedTags?.length < 1) {
      notify("All fields are required!");
      return;
    }

    setLoading(true)
    try {
      await dbService.editPost(docId, detail, title, selectedTags)
      navigate('/')
    } catch (e) {
      notify("Failed to edit post")
    }
    setLoading(false)
  }
  //
  useEffect(() => {
    setIsEditing(editing)
    setInitialValue(previousVal)
    setTitle(previousTitle)
    setSelectedTags(prevTags)
  }, [])

  return (
    <>
      <Toaster />
      <main className="grid grid-cols-10 items-start">
        <section className=" col-span-10 flex justify-center lg:col-span-7">

          <Editor
            apiKey="hiyi55219jowbez4et4l15xk73k2wh14bdeio77aave8j5k5"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={initialValue}
            init={{
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
              resize: false,
              auto_focus: "elm1",
            }}
          />
        </section>


        <div className="col-span-10 lg:col-span-3 ">
          <div className="w-[90%] mx-auto">
            <Inputs
              title={title}
              setTitle={setTitle}
              photo={photo}
              setPhoto={setPhoto}
              tags={tags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              isEditing={isEditing}
              setTags={setTags}
            />
            {!isEditing ? <button
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
            </button> :
              <button
                className="mt-1 btn bg-yellow-500 px-3 py-2 flex justify-center items-center gap-3"
                onClick={handleEditBlog}
                title="Edit blog"
              >
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/bubbles/50/upload.png"
                  alt="publish"
                />{" "}
                Edit Blog
              </button>
            }
            <BasicModal isLoading={loading}

            />
          </div>
        </div>
      </main>
    </>
  );
}
