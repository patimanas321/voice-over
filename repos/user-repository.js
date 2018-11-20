const passwordHash = require('password-hash');
const mongoHelper = require('../helpers/mongo-helper');
const tokenHelper = require('../helpers/token-helper');
const responseCodes = require('../response-codes');
const User = require('../models/user');
const LoginCredentials = require('../models/login-credential');


var registerNewUser = function (registerRequest) {
    var error = null;
    return new Promise((resolve, reject) => {
        mongoHelper.searchOneInMongoCollection('users', {
            phNo: registerRequest.phNo
        }).then((resp) => {
            if (resp) {
                error = responseCodes.phoneNoAlreadyExist;
            } else {
                var user = new User(registerRequest);
                return mongoHelper.insertIntoMongoCollection('users', user);
            }
        }).then((data) => {
            if (!error) {
                var loginCredentials = new LoginCredentials(registerRequest);
                return mongoHelper.insertIntoMongoCollection('login', loginCredentials);
            }
        }).then((data) => {
            if (error) {
                reject(error);
            } else {
                resolve(responseCodes.userSuccessfullyRegistered);
            }
        }).catch((err) => {
            reject(responseCodes.internalServerError);
        });
    });
};

var login = function (loginRequest) {
    return new Promise((resolve, reject) => {
        mongoHelper.searchOneInMongoCollection('login', {
            phNo: loginRequest.phNo
        }).then((resp) => {
            if (resp && loginRequest.phNo === resp.phNo && passwordHash.verify(loginRequest.password, resp.password)) {
                resolve({
                    token: tokenHelper.generateToken({ uid: resp.phNo })
                });
            } else {
                reject(errorMessages.invalidCredentials);
            }
        }).catch((err) => {
            reject(errorMessages.internalServerError);
        });
    });
};

var validateToken = function (token) {
    return new Promise((resolve, reject) => {
        tokenHelper.validateToken(token).then(data => {
            resolve(data);
        }).catch(err => {
            reject(errorMessages.invalidToken);
        });
    });    
};

module.exports = {
    registerNewUser,
    login,
    validateToken
}