require('dotenv').config();

const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3001;

// socket io and http import
const socketio = require('socket.io');
const http = require('http');

// server setup and set socket instance
const server = http.createServer(app);
const io = socketio(server);

// import helper functions
const { addUser, removeUser, getUser, getUsersInRoom } = require('./helper/users.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// server listen
server.listen(port, () => console.log(`Server has started on port ${port}`));

// io connection with client side socket
io.on('connection', (socket) => {
  console.log("we have new connection");
  // server side socket listen to join event
  socket.on('join', ({ name, room }, callback) => {
    console.log("userName---", name);
    console.log("room-----", room);
    const { error, user } = addUser({ id: socket.id, name, room });
    
    if(error) return callback(error);

    // backend send message
    socket.emit('message', { user: 'BucketUp', text: `Hi, ${user.name}! Please wait the expert to answer your question`});

    // broadcast to all users that new user joined for frontend
    socket.broadcast.to(user.room).emit('message', { user: 'BucketUp', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    
    socket.join(user.room);

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  })

  // wait front end sendMessage event
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    // emit message from frontend
    console.log('user sendmessge~!!!!', user);
    // user.room = "BucketUp"
    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    console.log('User had left!!!');
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'BucketUp', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

const cookieSession = require("cookie-session");
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);

db.connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const categoriesRoutes = require("./routes/categories");
const usersRoutes = require("./routes/users");
const expensesRoutes = require("./routes/expenses");
const goalsRoutes = require("./routes/goals");
const budgetsRoutes = require("./routes/budgets");
const messagesRoutes = require("./routes/messages");
const analyticsRoutes = require("./routes/analytics");
const { Socket } = require('dgram');

app.use("/api/categories", categoriesRoutes(db));
app.use("/api/users", usersRoutes(db));
app.use("/api/expenses", expensesRoutes(db));
app.use("/api/goals", goalsRoutes(db));
app.use("/api/budgets", budgetsRoutes(db));
app.use("/api/messages", messagesRoutes(db));
app.use("/api/analytics", analyticsRoutes(db));


