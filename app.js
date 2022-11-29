// WebSocket : 자바스크립트 내장 객체, 생성자 함수에 인자로 접속하고자 하는 URL을 전달.
// window.location.host : 접속한 URL의 호스트를 반환해 주는 속성. 이걸로 PC뿐 아니라 모바일 접속도 확인 가능.

const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#name input");
  const value = input.value;
  socket.emit("nickname", value);
  input.value = "";
}
function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", value, roomName, () => {
    addMessage(`you : ${value}`);
  });
  input.value = "";
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  const nameForm = room.querySelector("#name");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nameForm.addEventListener("submit", handleNicknameSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  //socket.emit: 이벤트를 발생(emit)시키는 역할. 이벤트명을 임의로 지정(enter_room), 서버에서 발생시킨 이벤트명만 알면 처리가능.
  //첫 번째 인자: 이벤트명, 두 번째 인자: 전송할 데이터(객체가능), 세 번째 인자: 서버에서 호출할 콜백 함수.
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (userNickName) => {
  addMessage(`${userNickName} arrived`);
});

socket.on("bye", (userNickName) => {
  addMessage(`${userNickName} left`);
});

socket.on("new_message", (msg) => {
  addMessage(msg);
});

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
