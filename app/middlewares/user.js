let httpStatus = require('http-status');
let response = require('../helpers/response');

exports.isAdmin = (req, res, next) => {
    let user = req.authUser;

    if (!user.is_admin) {
        return response.errorResponseJSON(
            req,
            res,
            'Forbidden access, admin access only'
        );
    }

    return next();
};
