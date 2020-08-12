import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/comuDB", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", error => console.log(`Not connected DB:${error}`));
db.once("open", () => console.log("Connected to DB"));
