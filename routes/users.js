const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.post('/register', (req, res, next) => {
  const { name, username, email, password } = req.body;
  const newUser = new User({
    name,
    username,
    email,
    password,
  });
  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, message: 'failed to register user' });
    } else {
      res.json({ success: true, message: 'user registered' });
    }
  });
});

router.post('/authenticate', (req, res, next) => {
  const { username, password } = req.body;
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'user not found' });
      return false;
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800,
        });
        res.json({
          success: true,
          token: `JWT ${token}`,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          },
        });
      } else {
        res.json({ success: false, message: 'wrong password' });
      }
    });
  });
});

router.get('/profile', passport.authenticate('jwt', { session:false }), (req, res, next) => {
  res.json({user: req.user });
});

module.exports = router;
