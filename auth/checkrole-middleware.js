module.exports = checkRole;

function checkRole(role) {
  return function(req, res, next) {
    if (req.decodedJwt.roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ you: "you cannot be here" })
    }
  }
}
