const express = require("express");
const router = express.Router();
const fetcuser = require("../middleware/fetcuser");
const Blogs = require("../models/Blogs");
const { body, validationResult } = require("express-validator");
const Reported = require("../models/Report");

//fetch notes from db
router.get("/fetchallnotes", async (req, res) => {
  console.log("req");
  const blogs = await Blogs.find().sort({ postedAt: -1 });
  res.json(blogs);
});

router.get("/getNoteByTag/:tag", async (req, res) => {
  const tag = req.params.tag;
  const blogs = await Blogs.find({ selectedTags: { $in: [tag] } });
  console.log(tag);
  res.json(blogs);
});

//add new note to db
router.post(
  "/addblog",
  fetcuser,
  [
    body("title", "Valid title please").isLength({ min: 3 }),
    body("blog", "At least 5 chars").isLength({ min: 3 }),
    body("postedBy", "At least 5 chars").isLength({ min: 3 }),
    body("selectedTags"),
    body("comments"),
    body("photo"),
  ],
  async (req, res) => {
    const { title, blog, postedBy, selectedTags, comments, photo } = req.body;
    const errors = validationResult(req);
    //check for err
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newBlog = new Blogs({
      title,
      blog,
      postedBy,
      selectedTags,
      comments,
      user: req.user.id,
      photo,
    });
    const savedBlog = await newBlog.save();
    res.json(savedBlog);
  }
);

//new route : update
router.put("/editblog/:id", fetcuser, async (req, res) => {
  const { editedTitle, editedPost, postedBy, editedTags, updatedComments } =
    req.body;
  console.log(req.body);
  //create new Note obj
  const newNote = {};
  if (editedTitle) {
    newNote.title = editedTitle;
  }
  if (editedPost) {
    newNote.blog = editedPost;
  }
  if (editedTags) {
    newNote.selectedTags = editedTags;
  }
  if (updatedComments) {
    newNote.comments = updatedComments;
  }
  //find note to be updated
  let prevBlog = await Blogs.findById(req.params.id);
  if (!prevBlog) {
    return res.status(400).send("not found");
  }
  // if (prevBlog.user.toString() !== req.user.id) {
  //   return res.status(401).send("Permission Denied");
  // }

  prevBlog = await Blogs.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json(prevBlog);
});

//Delete note
router.delete("/deleteblog/:id", fetcuser, async (req, res) => {
  //find note to be updated
  let blog = await Blogs.findById(req.params.id);
  let report = await Reported.find({ postId: req.params.id });
  if (!blog) {
    return res.status(400).send("not found");
  }
  //allow only if note is of login user
  if (blog.user.toString() !== req.user.id && req.user.role !== "ADMIN") {
    return res.status(401).send("Permission Denied");
  }
  blog = await Blogs.findByIdAndDelete(req.params.id);
  if (report) {
    await Reported.deleteMany({ postId: req.params.id });
  }
  res.json("note deletion success");
});

//comment

// Update comment
router.put("/blogs/:blogId/comments/:commentId", fetcuser, async (req, res) => {
  console.log("hi");
  try {
    const { commentId } = req.params.commentId;
    const { updatedComment } = req.body;

    // Find the blog by ID
    let blog = await Blogs.findById(req.params.blogId);
    console.log(blog);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    // Find the comment by ID
    const commentIndex = blog.comments.findIndex(
      (comment) => comment.id === commentId
    );
    if (commentIndex === -1) {
      return res.status(404).send("Comment not found");
    }

    // Update the comment
    blog.comments[commentIndex].comment = updatedComment;
    await blog.save();

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
