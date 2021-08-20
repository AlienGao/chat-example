const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  io.emit('login message', socket.handshake.issued + '登录了');
  socket.on('chat message', msg => {
    // 广播消息
    io.emit('chat message', msg);
  });
  // 溜了
  socket.on("disconnect", (reason) => {
    io.emit("user has left", socket.handshake.issued);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
