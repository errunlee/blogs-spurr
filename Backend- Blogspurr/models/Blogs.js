const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  blog: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  selectedTags: {
    type: Array,
    required: true,
  },
  comments: {
    type: Array,
  },
});

module.exports = mongoose.model("blog", BlogsSchema);
