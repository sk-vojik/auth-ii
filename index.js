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


//GENERATE TOKEN

function generateToken(user) {
  const payload = {
    subject: user.id,   //subject is the identity of the token, what its about
    username: user.username
  };

  const options = {
    expiresIn: '1d',
  }

  return jwt.sign(payload, secret, options);
}

//LOGIN POST
server.post('/api/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}!`, token})
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
  
});



//GET users
server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
  
});







server.get('/', (req, res) => {
  res.send("It's workingGgGgGgGgGgGGGG!!!!11")
});


const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));