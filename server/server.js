const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');
const socket = require('socket.io');
const { /* passport, */ sign } = require('./auth');
const { User } = require('./models');

const app = express();
const port = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ msg: e.message });
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    // eslint-disable-next-line camelcase
    const { id, user_name } = user.dataValues;
    const token = sign({
      id,
      user_name,
    });
    res.json({ user, token });
  } catch (e) {
    // console.log(e);
    res.status(500).json({ msg: e.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { user_name, password } = req.body;
    const user = await User.findOne({
      where: {
        user_name,
      },
    });
    const passwordValid = await bcrypt.compare(password, user.password);
    const { id } = user;
    if (passwordValid) {
      const token = sign({
        id,
        user_name,
      });
      res.json({ token });
    } else {
      throw Error('Invalid credentials!');
    }
  } catch (e) {
    res.status(401).json({ msg: e.message });
  }
});

// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const io = socket(server);

io.on('connection', (socket) => {
  socket.join('main-room');

  socket.on('SEND_MESSAGE', (data) => {
    const newData = data;
    newData.userSocketID = socket.id;
    // eslint-disable-next-line no-console
    console.log(newData);
    io.emit('MESSAGE', newData);
  });
});

const nsp = io.of('/my-namespace');
nsp.on('connection', (socket) => {
  // eslint-disable-next-line no-console
  console.log('connection to namespace made');
});

const mainRoom = io.of('main-room');
mainRoom.on('connect', (socket) => {
  
});
