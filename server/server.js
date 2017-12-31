const express = require('express');
const http =require('http');
const path = require('path');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'svetlio',
        text: 'hey',
        createdAt: new Date()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});

server.listen(port, () =>  {
    console.log(`Started on port ${port}`);
});


