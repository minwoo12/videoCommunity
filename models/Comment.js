import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: { type: String },
  createAt: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const model = mongoose.model("Comment", CommentSchema);

export default model;
