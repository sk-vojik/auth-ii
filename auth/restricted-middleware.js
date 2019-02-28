const secrets = require("../config/secrets")
const jwt = require('jsonwebtoken');

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // record the event, because the token was manipulated
        res.status(401).json({ you: "shall not pass, you're a bad hacker"})
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({ you: "shall not pass "})
  }
}

module.exports = restricted;
