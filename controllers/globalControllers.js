import Video from "../models/Video";
import Board from "../models/Board";
import User from "../models/User";
import routes from "../router";
import passport from "passport";

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ views: -1 })
    .limit(10);
  const boards = await Board.find({})
    .sort({ views: -1 })
    .limit(10);
  res.render("home", { pageTitle: "Home", videos, boards });
};

export const search = async (req, res) => {
  const {
    query: { term }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: term, $options: "i" }
    });
    console.log(videos);
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
  res.render("search", { pageTitle: `${term} 검색결과`, term, videos });
};

export const getJoin = (req, res) => {
  res.render("Join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({ name, email });
      await User.register(user, password);
      res.redirect(routes.home);
    } catch (error) {
      console.log(error);
      res.redirect(routes.join);
    }
  }
};

export const getLogin = (req, res) => {
  res.render("Login", { pageTitle: "Login" });
};

export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
