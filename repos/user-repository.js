const passwordHash = require('password-hash');
const mongoHelper = require('../helpers/mongo-helper');
const tokenHelper = require('../helpers/token-helper');
const responseCodes = require('../response-codes');
const User = require('../models/user');
const LoginCredentials = require('../models/login-credential');

var getUserProfile = function (user) {
    return new Promise((resolve, reject) => {
        mongoHelper.searchOneInMongoCollection('users', {
            email: user.email
        }).then((resp) => {
            resolve(resp);
        }).catch((err) => {
            reject(responseCodes.internalServerError);
        });
    });
};

var registerNewUser = function (registerRequest) {
    var error = null;
    return new Promise((resolve, reject) => {
        mongoHelper.searchOneInMongoCollection('users', {
            phNo: registerRequest.phNo
        }).then((resp) => {
            if (resp) {
                error = responseCodes.phoneNoAlreadyExist;
            } else {
                return mongoHelper.insertIntoMongoCollection('users', registerRequest);
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

module.exports = {
    registerNewUser,
    getUserProfile
}