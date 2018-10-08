const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {createJWT, verifyJWT} = require('../server/auth/auth');
const Schema = mongoose.Schema;
router.use(express.json());

const UserSchema = new Schema({
  id: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
});
const User = mongoose.model("User",UserSchema,"Users");

router.get('/', (req, res) => {
  User.findOne({email:req.header('email'), password:req.header('password')}, (err, user) => {
    if(user)
    {
      const token = createJWT(user._id);
      res.status(200).send({email: user.email, token: token});
    }
    else
      res.status(404).send('Not Found');
    if(err)
      res.status(400).send(err);
  })
  })
router.post('/', (req, res) => {
    const data = verifyJWT(req.headers.authorization);
    data ? res.status(200).send(data) : res.status(401).send('Not a valid JWT');
  })

  module.exports = router
  //z8LzAyjpdk4tXpOI