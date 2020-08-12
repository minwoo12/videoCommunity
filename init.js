import dotenv from "dotenv";
dotenv.config();
import app from "./app";

import "./models/Video";
import "./models/Board";
import "./models/User";
import "./models/Comment";

import "./db";

const PORT = process.env.PORT;

const handelListening = () => {
  console.log(`Listening on:http://localhost:${PORT}`);
};

app.listen(PORT, handelListening);
