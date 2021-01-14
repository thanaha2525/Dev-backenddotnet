const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socket = require('socket.io');
const port = 5000;
const { joinRoom, getUserInRoom, leaveRoom } = require('./room')

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')))

const io = socket(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.get('/', (req, res) => {
    res.send('Hi');
})

//Call when connected.
io.on('connection', (socket) => {
    //Call when user joinRoom.
    socket.on('joinRoom', ({ username, roomId }) => {
        const user = joinRoom(socket.id, username, roomId);
        console.log(user);
        socket.join(user.roomId);
    });

    //Call when message has been send.
    socket.on('sendMessage', (msg) => {
        //find user has connected.
        const user = getUserInRoom(socket.id);

        //send message to chat room.
        io.to(user.roomId).emit('retriveMessage', {
            username: user.username,
            msg: msg
        });
    });

    //Call when user left chat.
    socket.on('disconnect', () => {
        const user = leaveRoom(socket.id);
        if (user) {
            console.log(`${user.username} has left chat.`);
        }
    });
});

http.listen(port, () => {
    console.log(`Server listen on http://localhost:${port}/`);
});