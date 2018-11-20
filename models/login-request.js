let LoginRequest = function (data) {
    this.phNo = data.phNo;
    this.password = data.password;

    /**
     * Validate if all required properties are present
     */
    this.validate = function () {
        if (this.password && this.phNo) {
            return true;
        } else {
            return false;
        }
    };
};

module.exports = LoginRequest;