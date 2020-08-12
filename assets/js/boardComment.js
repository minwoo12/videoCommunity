import axios from "axios";
const addCommentForm = document.getElementById("jsboardAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsBoardNumber");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML) + 1;
};

const addComment = comment => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  li.appendChild(span);
  span.innerHTML = comment;
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async comment => {
  const boardId = window.location.href.split("/community/")[1];
  const response = await axios({
    url: `/api/${boardId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  console.log(response);
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
