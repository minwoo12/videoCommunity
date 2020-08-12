import axios from "axios";
const addVideoCommentForm = document.getElementById("jsvideoAddComment");
const videoCommentList = document.getElementById("jsvideoCommentList");
const videoCommentNumber = document.getElementById("jsVideoNumber");

const increaseNumber = () => {
  videoCommentNumber.innerHTML = parseInt(videoCommentNumber.innerHTML) + 1;
};

const addVideoComment = comment => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  li.appendChild(span);
  span.innerHTML = comment;
  videoCommentList.prepend(li);
  increaseNumber();
};

const sendVideoComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/videoComment`,
    method: "POST",
    data: {
      comment
    }
  });
  console.log(response);
  if (response.status === 200) {
    addVideoComment(comment);
  }
};

const handleVideoSubmit = event => {
  event.preventDefault();
  const commentInput = addVideoCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendVideoComment(comment);
  commentInput.value = "";
};

function init() {
  addVideoCommentForm.addEventListener("submit", handleVideoSubmit);
}

if (addVideoCommentForm) {
  init();
}
