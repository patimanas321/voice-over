const errorCodes = {
    phoneNoAlreadyExist: {
        code: '0001',
        message: 'Phone number already registered.'
    },
    internalServerError: {
        code: '0002',
        message: 'Internal Server Error.'
    },
    invalidCredentials: {
        code: '0003',
        message: 'Invalid login credentials.'
    },
    invalidToken: {
        code: '0004',
        message: 'Invalid token.'
    },
    userSuccessfullyRegistered: {
        message: 'User registration successful.'
    }
};

module.exports = errorCodes;