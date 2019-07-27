const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { passport, sign } = require('./auth');
const { User } = require('./models');

const app = express();
const port = 3001;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/users', async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: e.message });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
