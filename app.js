import express from "express";
import helmet from "helmet";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import globalRouter from "./routers/globalRouter";
import routes from "./router";
import session from "express-session";
import MongoStore from "connect-mongo";
import { middleware } from "./middleware";
import communityRouter from "./routers/communityRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";
import passport from "passport";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import "./passport";

const app = express();

const CokieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger("dev"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(middleware);

app.use(routes.home, globalRouter);
app.use(routes.community, communityRouter);
app.use(routes.video, videoRouter);
app.use(routes.api, apiRouter);

export default app;
