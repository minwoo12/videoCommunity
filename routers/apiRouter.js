import express from "express";
import routes from "../router";
import { postAddComment } from "../controllers/communityControllers";
import { postAddVideoComment } from "../controllers/videoControllers";

const apiRouter = express.Router();

apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.addCommentVideo, postAddVideoComment);

export default apiRouter;
