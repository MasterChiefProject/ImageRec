const chatBody = document.querySelector(".chat-body");
const txtInput = document.querySelector("#txtInput");
const send = document.querySelector(".send");

///////////////////////////////////////////////////////////////

const toggleBtn = document.getElementById("toggle-btn");
const myDiv = document.getElementById("my-div");

toggleBtn.addEventListener("click", function() {
  if (myDiv.style.display === "none") {
    myDiv.style.display = "block";
  } else {
    myDiv.style.display = "none";
  }
});