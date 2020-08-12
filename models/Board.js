import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  number: {
    type: Number,
    default: 1
  },
  title: {
    type: String,
    isrequired: "Title is required"
  },
  content: String,
  createAt: {
    type: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  views: {
    type: Number,
    default: 1
  },
  pages: {
    type: Number,
    default: 1
  }
});

const model = mongoose.model("Board", BoardSchema);

export default model;
