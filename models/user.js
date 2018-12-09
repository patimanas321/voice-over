let User = function (data) {
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.fullName = data.fullName;
    this.phNo = data.phNo;
    this.picture = data.picture;

    /**
     * Validate if all required properties are present
     */
    this.validate = function () {
        if (this.phNo) {
            return true;
        } else {
            return false;
        }
    };
};

module.exports = User;