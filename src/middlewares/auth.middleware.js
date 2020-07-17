const { UserModel } = require('../models');

const { JwtUtil } = require('../utils');

module.exports = {
  jwt: (req, res, next) => {
    let token;
    if (req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];
        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        } else {
          return next('INVALID_GRANT');
        }
      }
    } else {
      return next();
    }

    return JwtUtil.verify(token)
      .then((tokenPayload) => {
        if (tokenPayload && tokenPayload.auth) {
          return UserModel.findOne(
            { _id: tokenPayload.auth },
            { _id: 1, email: 1, profilePic: 1 }
          ).lean();
        }
        return next(new Error('INVALID_GRANT'));
      })
      .then((user) => {
        if (user) {
          req.user = user;
          return next();
        }
        return next(new Error('INVALID_GRANT'));
      })
      .catch(err => next(err));
  }
};
