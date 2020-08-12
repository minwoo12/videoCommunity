const routes = {
  //Global
  home: "/",
  join: "/join",
  login: "/login",
  search: "/search",
  //community
  community: "/community",
  communityMain: id => {
    if (id) {
      return `/community/Main/${id}`;
    } else {
      return "/Main/:id";
    }
  },
  boardDetail: id => {
    if (id) {
      return `/community/${id}`;
    } else {
      return "/:id";
    }
  },
  write: "/write",
  editBoard: id => {
    if (id) {
      return `/community/${id}/edit`;
    } else {
      return "/:id/edit";
    }
  },
  deleteBoard: id => {
    if (id) {
      return `/community/${id}/delete`;
    } else {
      return "/:id/delete";
    }
  },
  //video
  video: "/videos",
  videoDetail: id => {
    if (id) {
      return `/videos/${id}`;
    } else {
      return "/:id";
    }
  },
  editVideo: id => {
    if (id) {
      return `/videos/${id}/editVideo`;
    } else {
      return "/:id/editVideo";
    }
  },
  upload: "/upload",
  deleteVideo: id => {
    if (id) {
      return `/videos/${id}/deleteVideo`;
    } else {
      return "/:id/deleteVideo";
    }
  },
  //user
  logout: "/logout",
  api: "/api",
  addComment: "/:id/comment",
  addCommentVideo: "/:id/videoComment"
};

export default routes;
