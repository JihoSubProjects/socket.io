const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server);

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/', (req, res) => res.send('Hello'));

io.on('connection', (socket) => {
  console.log('a user connected: ' + socket.id);
  socket.emit('chat', 'Hello World!');

  socket.on('chat', (data) => {
    console.log(socket.id, 'says', `"${data}"`);
    socket.broadcast.emit('chat', data);
  });

  socket.on('disconnect', () => {
    console.log('disconnected from ', socket.id);
  });
});

server.listen(3000, () => console.log('listening on *:3000'));
