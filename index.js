const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');
moment().format('LTS');
const app = express();
let users = [];

app.use(bodyParser.json())
app.use(express.static(__dirname))
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{
    console.log("Working on port " + PORT);
});
const io = socketio(server);



io.on('connection', socket=>{
    socket.on('join', (username)=>{
        socket.broadcast.emit('broadcast', `${username} has joined the chat`);
        users.push({username: username, id: socket.id});
    })
    
    
    socket.on('disconnect', ()=>{
        let user = users.find(user=>user.id===socket.id);
        if(user) socket.broadcast.emit('broadcast', `${user.username} has left the chat`)
    })

    socket.on('chatMessage', (username, msg)=>{
        let time = moment().format('h:mm a');
        socket.broadcast.emit('chatMessage', username, msg, time);
        socket.emit('myMsg', username, msg, time)
    });
})