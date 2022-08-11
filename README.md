# Campfire Messenger

![welcome image](/public/img/1.png)

## Description
Use our simple messenger app for quick messaging enabled by Socket.IO.  Socket.IO facilitates real-time, bidirectional, and event-based communcation from your device to our server, allowing for real-time text communication between you and your friends.

## Install
### Access our deployed app:
1.  Open https://campfire-messenger.herokuapp.com/ in browser.

### Set up a local development environment:
1.  Download [zipped files](https://github.com/dhruza88/Project2-SMS-messenger/archive/refs/heads/dev.zip).
2.  Extract files onto local drive.
3.  Create a .env file in root directory of app files.  Copy paste the following into the .env file:
```
DB_NAME='user_db'
DB_USER='root'
DB_PASSWORD='password'
```
4.  Install Node dependencies and run MySQL.
5.  Run the 'server.js' file in Node.

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

## Screenshots
![welcome image](/public/img/3.png)
![welcome image](/public/img/4.png)



## Resources
Socket.IO -- https://socket.io
Midjourney -- https://midjourney.gitbook.io/docs/
Bootstrap -- https://getbootstrap.com

## Collaborators
Santana Fernandez, Michael Ha, Jiaje He, David Hruza
