const jwt = require('jsonwebtoken');
const secrets = require("../config/secrets");

module.exports = {
  generateToken
}

function generateToken(user) {
  const payload = {
    subject: user.id,    //subject is the identity of the token, what its about
    username: user.username,
    roles: ['Student'],     //normally would come from DB, hard coded for demo
  };

  const options = {
    expiresIn: '1d',
  }

  return jwt.sign(payload, secrets.jwtSecret, options);
}

