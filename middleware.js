import multer from "multer";
import routes from "./router";
import Board from "./models/Board";

const multerVideo = multer({ dest: "uploads/videos" });

export const middleware = async (req, res, next) => {
  res.locals.siteName = "CommunitySite";
  res.locals.loggedUser = req.user;
  res.locals.routes = routes;
  const board = await Board.find({});
  const pages = Math.floor(board.length / 10 + 1);
  res.locals.pages = pages;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
