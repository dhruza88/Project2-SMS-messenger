const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 6689;

const helpers = require('./utils/helpers');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

console.log("PID", process.pid);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
const hbs = exphbs.create({ helpers })
app.engine('handlebars', hbs.engine);
app.set('view engine', "handlebars")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static((__dirname, '/public')));


// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//     io.emit('chat message', msg);
//   });
// });

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });


// app.get('/', (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
//   res.render('main', {layout : 'index'});
//   });

app.get('/chatroom', (req, res) => {

  try {
    res.render('chatroom', {layout : `${__dirname}/views/layouts/main`});
  } catch(err) {
    console.log(err);
  }
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('theodore', (msg) => {
    console.log('message: ' + msg);
    io.emit('theodore', msg);
  });
});
// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });

//   io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       io.emit('chat message', msg);
//     });
//   });

//   io.on("connection", socket => {
//     socket.join("some room");
//   });

//   io.on("connection", socket => {
//     socket.on("private message", (anotherSocketId, msg) => {
//       socket.to(anotherSocketId).emit("private message", socket.id, msg);
//     });
//   });


app.use(routes);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening on *:6689'));
});
