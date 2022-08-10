# Project2-SMS-messenger

![welcome image](/welcome.JPG)

## Description
Use our simple messenger app for quick messaging enabled by Socket.IO.  Socket.IO facilitates real-time, bidirectional, and event-based communcation from your device to our server, allowing for real-time text communication between you and your friends.

## Install
1.  Access our deployed app here: http://

or

1.  Run the 'server.js' file in Node to set up a local development environment for the app.

## How to Use
1.  Create an account through the sign-up form by inputting your name, email address, and your password.
2.  Login!
3.  Click on "Join Chatroom" to start chatting.

## Directory Structure
```
.
├── config
│   └── connection.js
│
├── db
│   └── schema.sql
│
├── models
│   ├── Chatroom.js
│   ├── Message.js
│   ├── User.js
│   └── index.js
│  
├── node_modules
│ 
├── public
│   └── css
│       ├── reset.css
│       └── style.css
│
│   └── js
│       ├── chatroom.js
│       └── login.js
│
├── routes
│   ├── api
│       ├── Chat-routes.js
│       ├── Message-routes.js
│       ├── index.js
│       └── user-routes.js
│   ├── frontend
│       └── index.js
│   └── index.js
│
├── seeds
│   ├── chatroom.Data.json
│   ├── message.json
│   ├── seed.js
│   └── userData.json
│
├── utils
│   ├── auth.js
│   └── helpers.js
│
├── views
│   ├── layouts
│       └── main.hbs
│   ├── chatroom.hbs
│   ├── login.hbs
│   └── profile.hbs
│ 
├── package.json
├── package-lock.json
└── server.js
```


## Resources
Socket.IO -- https://socket.io
Midjourney -- https://midjourney.gitbook.io/docs/
Bootstrap -- https://getbootstrap.com

## Collaborators
Santana Fernandez, Michael Ha, Jiaje He, David Hruza

## Screenshot
<img src="./">
