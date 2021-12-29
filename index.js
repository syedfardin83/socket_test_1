const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {cors:{origin:"*"}});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on("connection",(socket) => {
    console.log("User Joined: "+socket.id);

    socket.on("message", (data) => {
        socket.broadcast.emit('message', data);
        // document.querySelector('h1').value = data;
    });
})
