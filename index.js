require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const db = require('./databases/dbConfig.js');
// const Users = require('./users/user-helpers.js');

const secret = process.env.JWT_SECRET;

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send("It's workingGgGgGgGgGgGGGG!!!!11")
});


const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));