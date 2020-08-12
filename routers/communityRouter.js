import express from "express";
import routes from "../router";
import {
  community,
  boardDetail,
  getWrite,
  postWrite,
  getEditBoard,
  postEditBoard,
  deleteBoard
} from "../controllers/communityControllers";
import { onlyPrivate } from "../middleware";

const communityRouter = express.Router();

communityRouter.get(routes.communityMain(), community);

communityRouter.get(routes.write, onlyPrivate, getWrite);
communityRouter.post(routes.write, onlyPrivate, postWrite);

communityRouter.get(routes.boardDetail(), boardDetail);

communityRouter.get(routes.editBoard(), onlyPrivate, getEditBoard);
communityRouter.post(routes.editBoard(), onlyPrivate, postEditBoard);

communityRouter.get(routes.deleteBoard(), onlyPrivate, deleteBoard);

export default communityRouter;
