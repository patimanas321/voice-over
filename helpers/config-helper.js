var appConfig = require('../app-config.json');

var getConfigValue = function(key){
    return appConfig[key];
}

module.exports = {
    getConfigValue
};