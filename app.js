const chatBody = document.querySelector(".chat-body");
const txtInput = document.querySelector("#txtInput");
const send = document.querySelector(".send");
flag = true;

send.addEventListener("click", () => renderUserMessage());

txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    renderUserMessage();
  }
});

Image.addEventListener('click', () => {
  HideChat();
  // 👇️ removes the element from the DOM
  // box.style.display = 'none';
});


function HideChat()
{
  const Container = document.getElementsByClassName('container')[0];
  // 👇️ hides element (still takes up space on the page)
  Container.style.visibility = 'hidden';
}

function ShowChat()
{
  const Container = document.getElementsByClassName('container')[0];
  const Show = document.getElementsByClassName('open-chat')[0];
  Container.style.visibility = 'visible';
  Show.style.visibility = 'visible';
   
}

Image.onclick = function(){
  const Container = document.getElementsByClassName('Container')[0];
  // 👇️ hides element (still takes up space on the page)
  if(flag == false)
  {
    Container.style.visibility = 'visible';
    flag = true;
  }
  else
  {
    
    Container.style.visibility = 'hidden';
  }

};





const renderUserMessage = () => {
  const userInput = txtInput.value;
  renderMessageEle(userInput, "user");
  txtInput.value = "";
  setTimeout(() => {
    renderChatbotResponse(userInput);
    setScrollPosition();
  }, 600);
};

const renderChatbotResponse = (userInput) => {
  const res = getChatbotResponse(userInput);
  renderMessageEle(res);
};

const renderMessageEle = (txt, type) => {
  let className = "user-message";
  if (type !== "user") {
    className = "chatbot-message";
  }
  const messageEle = document.createElement("div");
  const txtNode = document.createTextNode(txt);
  messageEle.classList.add(className);
  messageEle.append(txtNode);
  chatBody.append(messageEle);
};

const getChatbotResponse = (userInput) => {
  return responseObj[userInput] == undefined
    ? "Please try something else"
    : responseObj[userInput];
};

const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};