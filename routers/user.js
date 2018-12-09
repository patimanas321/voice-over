const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const User = require('../models/user');
const userRepository = require('../repos/user-repository');

// Validate all requests
router.use(auth);

// Get user profile
router.get('/profile', (req, res) => {
    userRepository.getUserProfile(req.user).then((user) => {
        res.status(200).send(user);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// Register new User
router.use('/register', (req, res, next) => {
    //validate model
    var regReq = new User(req.body);

    if (!regReq.validate()) {
        res.status(400).send();
    } else {
        req.body = regReq;
    }
    next();
}).post('/register', (req, res) => {
    userRepository.registerNewUser(req.body).then((data) => {
        res.status(201).send(data);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

module.exports = router;