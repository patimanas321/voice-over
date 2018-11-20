const passwordHash = require('password-hash');

let RegisterRequest = function (data) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.password = data.password ? passwordHash.generate(data.password.toString()) : null;
    this.email = data.email;
    this.phNo = data.phNo;

    /**
     * Validate if all required properties are present
     */
    this.validate = function () {
        if (this.firstName && this.password && this.phNo) {
            return true;
        } else {
            return false;
        }
    };
};

module.exports = RegisterRequest;