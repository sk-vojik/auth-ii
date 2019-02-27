require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./database/dbConfig.js');
const Users = require('./users/users-helpers');

const secret = process.env.JWT_SECRET;

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());



//REGISTER
server.post('/api/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    })
});







server.get('/', (req, res) => {
  res.send("It's workingGgGgGgGgGgGGGG!!!!11")
});


const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));