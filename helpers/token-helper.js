var jwt = require('jsonwebtoken');
var configHelper = require('../helpers/config-helper');

var generateToken = function(data){
    return jwt.sign(data, configHelper.getConfigValue('token-encryption-key'));
}

var validateToken = function(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, configHelper.getConfigValue('token-encryption-key'), function (err, decoded) {
            if(err){
                reject(err);
            }else{
                resolve(decoded);
            }
        });
    });    
}

module.exports = {
    generateToken,
    validateToken
}