var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
    //Route specific validations 
    next();
});

router.use('/register', (req, res, next) => {
    //validate model
    next();
}).post('/register', (req, res) => {
    console.log(req.body);
    res.send('Register Works!');
});

router.use('/login', (req, res, next) => {
    //validate model
    next();
}).post('/login', (req, res) => {
    console.log(req.body);
    res.send('Login Works!');
});

router.use('/token/validate', (req, res, next) => {
    //validate model
    next();
}).post('/token/validate', (req, res) => {
    console.log(req.body);
    res.send('Validate Token Works!');
});

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