import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();

// __dirname : Node.js 기본 전역 변수
//   현재 실행하는 폴더의 경로/ nomard_zoom의 src 폴더 경로가 할당되어있음
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  // app.js에서 작성한 enter_room 이벤트 발생, 두 번째 인자: 프론트에서 emit로 전송한 객체를 받음, 세 번째 인자: 서버에서 호출할 콜백 함수
  //함수가 서버에서 호출하지만 정의된 곳은 프론트앤드인게 포인트.

  socket["nickname"] = "익명"; //입력전에는 익명으로 처리
  socket.on("enter_room", (roomName, done) => {
    done();
    console.log(socket.id);
    //join : 룸(room)단위로 사용자를 묶어줌
    //socket.id : 현재 소켓의 고유값
    //socket.rooms : rooms속성은 소켓이 현재 어떤 룸에 있는지 나타냄(복수 가능)
    //socket.to : 이벤트를 통해 데이터를 전달할 대상 지정(대상: 특정 채팅룸 혹은 특정 소켓)
    socket.join(roomName);
    console.log(socket.rooms); //join() 이전에는 socket.id 만 로그에 나오지만 이제는 방이름도나옴
    socket.to(roomName).emit("welcome", socket.nickname);
  });
  socket.on("disconnecting", () => {
    //rooms : 접속중인 채팅룸 목록을 뜻하는 Set객체
    socket.rooms.forEach((room) => {
      socket.to(room).emit("bye", socket.nickname);
    });
  });
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname} : ${msg}`);
    done();
  });

  socket.on("nickname", (nickname) => {
    socket["nickname"] = nickname;
  });
});
const handleListen = () => {
  console.log("Listening on http://localhost:3000");
};
httpServer.listen(3000, handleListen);
