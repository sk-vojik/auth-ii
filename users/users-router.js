const router = require('express').Router();
const Users = require("../users/users-helpers");

const restricted = require('../auth/restricted-middleware');
const checkRole = require('../auth/checkrole-middleware');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json({ users, decodedToken: req.decodedJwt });   //sending decoded token for demo purposes
    })
    .catch(err => res.send(err));
});

// server.get('/users', restricted, async (req, res) => {
//   try {
//     const users = await Users.find();

//     res.json(users);
//   } catch (error) {
//     res.send(error);
//   }
// });



module.exports = router;