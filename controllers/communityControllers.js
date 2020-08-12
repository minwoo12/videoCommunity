import Board from "../models/Board";
import Comment from "../models/Comment";
import routes from "../router";
import moment from "moment";
import "moment-timezone";

export const community = async (req, res) => {
  const {
    params: { id }
  } = req;
  const board = await Board.find({})
    .sort({ createAt: -1 })
    .populate("creator");
  const pages = Math.floor(board.length / 10 + 1);
  res.render("community", { pageTitle: "Community", board, pages, id });
};

export const getWrite = (req, res) => {
  res.render("write");
};

export const postWrite = async (req, res) => {
  const {
    body: { title, content }
  } = req;
  const boards = await Board.find({});
  const pages = Math.floor(boards.length / 10 + 1);
  //한국시간 moment 이용
  moment.tz.setDefault("Asia/Seoul");
  let today = moment().format("YYYY-MM-DD HH:mm:ss");
  try {
    const newBoard = await Board.create({
      number: boards.length + 1,
      title,
      content,
      creator: req.user.id,
      createAt: today,
      pages
    });
    req.user.boards.push(newBoard.id);
    req.user.save();
    res.redirect(routes.boardDetail(newBoard.id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.communityMain(pages));
  }
};

export const getEditBoard = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const board = await Board.findById(id);
    if (req.user.id === String(board.creator)) {
      res.render("editBoard", { pageTitle: "Board Edit", board });
    } else {
      res.status(400);
      res.redirect(routes.boardDetail(id));
    }
  } catch (error) {
    console.log(error);
  }
};

export const postEditBoard = async (req, res) => {
  const {
    body: { title, content },
    params: { id }
  } = req;
  try {
    await Board.findOneAndUpdate({ _id: id }, { title, content });
    res.redirect(routes.boardDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.community);
  }
};

export const boardDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const board = await Board.findById(id)
      .populate("creator")
      .populate("comments");
    board.views += 1;
    board.save();
    res.render("boardDetail", { pageTitle: "Board Detail", board });
  } catch (error) {
    console.log(error);
  }
};

export const boardPage = async (req, res) => {
  res.render("community");
};

export const deleteBoard = async (req, res) => {
  const {
    params: { id }
  } = req;
  let boardArray = [];
  const board = await Board.findById(id);
  const boards = await Board.find({});
  boardArray = boards;
  try {
    if (req.user.id === String(board.creator)) {
      await Board.findOneAndRemove({ _id: id });
      for (let i = 1; i <= board.length; i++) {
        await Board.findOneAndUpdate(
          { _id: boardArray[i].id },
          { number: boardArray[i].number - 1 }
        );
      }
      if (board.pages === 1) {
        for (let i = board.pages * 10 - 1; i <= boards.length; i++) {
          if (i % 10 === 0) {
            if (boardArray[i] === undefined) {
              break;
            } else {
              await Board.findOneAndUpdate(
                { _id: boardArray[i].id },
                { pages: boardArray[i].pages - 1 }
              );
            }
          }
        }
      } else {
        for (let i = board.pages * 10; i <= boards.length; i++) {
          if (i % 10 === 0) {
            if (boardArray[i] === undefined) {
              break;
            } else {
              await Board.findOneAndUpdate(
                { _id: boardArray[i].id },
                { pages: boardArray[i].pages - 1 }
              );
            }
          }
        }
      }
      res.redirect(routes.home);
    } else {
      res.redirect(routes.editBoard(id));
    }
  } catch (error) {
    console.log(error);
  }
};

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  moment.tz.setDefault("Asia/Seoul");
  let today = moment().format("YYYY-MM-DD HH:mm:ss");
  try {
    const board = await Board.findById(id);
    const newComment = await Comment.create({
      text: comment,
      createAt: today,
      creator: user.id
    });
    board.comments.push(newComment.id);
    board.save();
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};
