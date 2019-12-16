'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var publicKey = _fs2.default.readFileSync(_path2.default.join(__dirname, '../../publicKey.pub'));

module.exports = function () {
    return function (ctx, next) {
        if (ctx.request.header.authorization) {
            var token = ctx.header.authorization.split(' ')[1];
            if (token && token !== 'undefined') {
                var decoded = _jsonwebtoken2.default.verify(token, publicKey);
                if (decoded.userId) {
                    ctx.user = {
                        token: token,
                        userId: decoded.userId
                    };
                }
            }
        }
        return next();
    };
};