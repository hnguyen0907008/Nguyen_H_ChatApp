const express = require('express');
const path = require('path');

const messenger = require('socket.io')();

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 5050;

app.get("/", (req, res) => {
    //join two values together
    //localhost:3000/index.html
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "chat.html"));
});

const server = app.listen(port, () => {
    console.log(`app is running on ${port}`);
});

//make sure socket use the same server
messenger.attach(server);

//make connection to the socket - the caller
messenger.on('connection', (socket) => {
    //need `` only when passing sth dynamic
    console.log(`a user connected: ${socket.id}`);
    //create custom event. sID = maked name
    //send the connected user their assigned ID
    socket.emit('connected', {sID: `${socket.id}`, message: 'new connection'});
    
    socket.on('chatmessage', function(msg){
        console.log(msg);
        messenger.emit('nickname', {id: socket.id, nickname: msg});
        messenger.emit('message', {id: socket.id, message: msg});
    });

    //() is (socket)
    socket.on('disconnect', () => {
        console.log('an user has disconnected');
    })

    
});