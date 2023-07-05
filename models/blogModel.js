const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  content: String,
  comments: [
    {
      author: String,
      content: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  applauseCount: { type: Number, default: 0 },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
