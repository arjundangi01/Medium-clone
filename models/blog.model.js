const mongoose = require("mongoose");

// const blogSchema = mongoose.Schema(
//   {
//     title: String,
  
//   }
// );
const blogSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    likesCount: Number,
    commentsCount: Number,
    author: {
      authorId: String,
      authorName: String,
    },
    category: String,
  }, {
    timestamps: true,
  }
);

const BlogModel = mongoose.model("blog", blogSchema)
module.exports = {BlogModel}