const express = require('express');

// const db = require('./database/dbConfig.js');
const configureMiddleware = require('./middleware.js');
const authRouter = require('../auth/auth-router')
const usersRouter = require('../users/users-router');




const server = express();

configureMiddleware(server);



server.get('/', (req, res) => {
  res.send("It's alive dude!");
});

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);







module.exports = server;