const rp = require('request-promise-native');
const googleApiUrl = 'https://www.googleapis.com/oauth2/v3/tokeninfo';

function auth(req, res, next) {
    req.user = null;

    let authHeader = req.get('Authorization');
    if (authHeader) {
        let tokenType = authHeader.substr(0, authHeader.indexOf(' '));
        let token = authHeader.substr(authHeader.indexOf(' ')).trim();

        if (tokenType.toLowerCase() == 'google') {
            let options = {
                uri: googleApiUrl,
                qs: {
                    id_token: token
                },
                json: true
            };

            rp(options)
                .then(function (resp) {
                    var userProfile = {
                        email: resp.email,
                        firstName: resp.given_name,
                        lastName: resp.family_name,
                        fullName: resp.name,
                        picture: resp.picture
                    };

                    req.user = userProfile;
                    next();
                })
                .catch(function (err) {
                    if (err.statusCode == 400) {
                        var err = new Error('Not authorized!');
                        err.status = 400;
                        return next(err);
                    } else {
                        var err = new Error('Internal Server Error.');
                        err.status = 500;
                        return next(err);
                    }
                });

        } else if (tokenType.toLowerCase() == 'fb') {

        }
    } else {
        var err = new Error('Not authorized!');
        err.status = 400;
        return next(err);
    }
}

module.exports = auth;