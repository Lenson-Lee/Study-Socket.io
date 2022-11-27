// WebSocket : 자바스크립트 내장 객체, 생성자 함수에 인자로 접속하고자 하는 URL을 전달.
// window.location.host : 접속한 URL의 호스트를 반환해 주는 속성. 이걸로 PC뿐 아니라 모바일 접속도 확인 가능.

const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value });
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

//========================================================
// const socket = new WebSocket(`ws://${window.location.host}`);
// const messageList = document.querySelector("ul");
// const messageForm = document.querySelector("#message");
// const nickForm = document.querySelector("#nick");

// socket.addEventListener("open", () => {
//   console.log("connected to server");
// });

// socket.addEventListener("message", (message) => {
//   //   console.log("just go this", message.data, "from the server");
//   // 메시지가 전송될 때마다 li요소를 통해 메시지를 ul 안으로 넣음
//   const li = document.createElement("li");
//   li.innerText = message.data;
//   messageList.append(li);
// });

// socket.addEventListener("close", () => {
//   console.log("disconnected from server");
// });

// function makeMessage(type, payload) {
//   const msg = { type, payload };
//   return JSON.stringify(msg);
// }

// function handleSubmit(event) {
//   event.preventDefault();
//   const input = messageForm.querySelector("input");
//   //   socket.send(input.value);
//   socket.send(makeMessage("new_message", input.value));
//   input.value = "";
// }

// function handleNickSubmit(event) {
//   event.preventDefault();
//   const input = nickForm.querySelector("input");
//   socket.send(makeMessage("nickname", input.value));
//   input.value = "";
// }

// messageForm.addEventListener("submit", handleSubmit);
// nickForm.addEventListener("submit", handleNickSubmit);

//========================================================
