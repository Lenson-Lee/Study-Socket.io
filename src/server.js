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
  //   console.log(socket);
  socket.on("enter_room", (roomName) => {
    console.log(roomName);
  });
});
const handleListen = () => {
  console.log("Listening on http://localhot:3000");
};
httpServer.listen(3000, handleListen);
