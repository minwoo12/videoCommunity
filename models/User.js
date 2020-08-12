import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, isrequired: "Name is required" },
  email: { type: String, isrequired: "Email is required" },
  createAt: {
    type: Date,
    default: Date.now
  },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
