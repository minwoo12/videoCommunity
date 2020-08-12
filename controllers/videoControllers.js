import Video from "../models/Video";
import Comment from "../models/Comment";
import routes from "../router";
import moment from "moment";
import "moment-timezone";

export const videoHome = async (req, res) => {
  const video = await Video.find({});
  res.render("videoHome", { pageTitle: "videoHome", video });
};

export const getUpload = async (req, res) => {
  res.render("upload", { pageTitle: "upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  moment.tz.setDefault("Asia/Seoul");
  let today = moment().format("YYYY-MM-DD HH:mm:ss");
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
    createAt: today
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    video.views += 1;
    video.save();
    res.render("videoDetail", { pageTitle: "videoDetail", video });
  } catch (error) {
    console.log(error);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (req.user.id === String(video.creator)) {
      res.render("editVideo", { pageTitle: "editVideo", video });
    } else {
      res.redirect(routes.videoDetail(id));
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.videoDetail(id));
  }
};

export const postEditVideo = async (req, res) => {
  const {
    body: { title, description },
    params: { id }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.editVideo(id));
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (req.user.id === String(video.creator)) {
      await Video.findOneAndRemove({ _id: id });
      res.redirect(routes.video);
    } else {
      res.redirect(routes.videoDetail(id));
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.editVideo(id));
  }
};

export const postAddVideoComment = async (req, res) => {
  const {
    body: { comment },
    params: { id },
    user
  } = req;
  try {
    moment.tz.setDefault("Asia/Seoul");
    let today = moment().format("YYYY-MM-DD HH:mm:ss");
    const video = await Video.findById(id);
    const newVideoComment = await Comment.create({
      text: comment,
      createAt: today,
      creator: user.id
    });
    video.comments.push(newVideoComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
