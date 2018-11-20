const express = require('express');
const router = express.Router();

const RegisterRequest = require('../models/register-request');
const LoginRequest = require('../models/login-request');

const userRepository = require('../repos/user-repository');

router.use((req, res, next) => {
    //Route specific validations 
    next();
});

router.use('/register', (req, res, next) => {
    //validate model
    var regReq = new RegisterRequest(req.body);

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

router.use('/login', (req, res, next) => {
    //validate model
    var logingReq = new LoginRequest(req.body);

    if (!logingReq.validate()) {
        res.status(400).send();
    } else {
        req.body = logingReq;
    }
    next();
}).post('/login', (req, res) => {
    userRepository.login(req.body).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

/*
router.use('/token/validate', (req, res, next) => {
    //validate model
    if (!req.get('Authorization')) {
        res.status(400).send();
    }
    next();
}).post('/token/validate', (req, res) => {
    userRepository.validateToken(req.get('Authorization')).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send(err);
    });
});
*/

router.use('/token/refresh', (req, res, next) => {
    //validate model
    next();
}).post('/token/refresh', (req, res) => {
    console.log(req.body);
    res.send('Refresh Token Works!');
});

router.get('/details', (req, res) => {
    res.send('Get User details Works!');
});

router.use('/details', (req, res, next) => {
    //validate model
    next();
}).post('/details', (req, res) => {
    console.log(req.body);
    res.send('Update user details Works!');
});

module.exports = router