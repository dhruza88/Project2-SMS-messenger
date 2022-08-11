// https://github.com/bradtraversy/chatcord/blob/master/public/js/main.js socket.io emit/receive



// const messageForm = document.getElementById('message-form');
// const chatMessages = document.querySelector('.chat-messages');
// const roomName = document.getElementById('room-name');
// const userList = document.getElementById('users');

// // Get username and room from URL
// const { username, room } = Qs.parse(location.search, {
//   ignoreQueryPrefix: true,
// });

// const socket = io();


// // Get room and users
// socket.on('roomUsers', ({ room, users }) => {
//     outputRoomName(room);
//     outputUsers(users);
// });

// // Message from server
// socket.on('message', (message) => {
//     console.log(message);
//     outputMessage(message);
// });
// // Output message to DOM
// function outputMessage(message) {
//     const div = document.createElement('div');
//     div.classList.add('message');
//     const p = document.createElement('p');
//     p.classList.add('meta');
//     p.innerText = message.username;
//     p.innerHTML += `<span>${message.time}</span>`;
//     div.appendChild(p);
//     const para = document.createElement('p');
//     para.classList.add('text');
//     para.innerText = message.text;
//     div.appendChild(para);
//     document.querySelector('.chat-messages').appendChild(div);
// }

// // Send message
// messageForm.addEventListener('submit', (e) => {
//     e.preventDefault();  
//     // Get message text
//     let msg = e.target.elements.msg.value;
//     msg = msg.trim();
//     if (!msg) {
//         return false;
//     }
//     // Emit message to server
//     socket.emit('chatMessage', msg);
//     // Clear input
//     e.target.elements.msg.value = '';
//     e.target.elements.msg.focus();
// });

// // Get room and users
// socket.on('roomUsers', ({ room, users }) => {
//     outputRoomName(room);
//     outputUsers(users);
// });
// // Add room name to DOM
// function outputRoomName(room) {
//     roomName.innerText = room;
// }
//   // Add users to DOM
//   function outputUsers(users) {
//     userList.innerHTML = '';
//     users.forEach((user) => {
//       const li = document.createElement('li');
//       li.innerText = user.username;
//       userList.appendChild(li);
//     });
//   }

// const path = require('path');
const express = require('express');

const app = express();
const  createServer = require('http');
const server = createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

  io.on("connection", socket => {
    socket.join("some room");
  });

  io.on("connection", socket => {
    socket.on("private message", (anotherSocketId, msg) => {
      socket.to(anotherSocketId).emit("private message", socket.id, msg);
    });
  });
