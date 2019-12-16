'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.Post = exports.CheckAuth = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _responseTemplate = require('../lib/responseTemplate');

var responseTemplate = _interopRequireWildcard(_responseTemplate);

var _userService = require('../services/userService');

var _userService2 = _interopRequireDefault(_userService);

var _tokenService = require('../services/tokenService');

var _tokenService2 = _interopRequireDefault(_tokenService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var publicKey = _fs2.default.readFileSync(_path2.default.join(__dirname, '../../publicKey.pub'));

var CheckAuth = exports.CheckAuth = function CheckAuth(ctx) {
  var token = ctx.request.header.authorization;
  try {
    var decoded = _jsonwebtoken2.default.verify(token.substr(7), publicKey);
    if (decoded.userInfo) {
      return {
        status: 1,
        result: decoded.userInfo
      };
    } else {
      return {
        status: 403,
        result: {
          errInfo: '没有授权'
        }
      };
    }
  } catch (err) {
    return {
      status: 503,
      result: {
        errInfo: '解密错误'
      }
    };
  }
};

var Post = exports.Post = function Post(ctx) {
  switch (ctx.params.action) {
    case 'check':
      return CheckAuth(ctx).then(function (result) {
        ctx.body = result;
      });
    default:
      return CheckAuth(ctx).then(function (result) {
        ctx.body = result;
      });
  }
};

var login = exports.login = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    var name, pwd, user, token;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = ctx.request.body.username;
            pwd = ctx.request.body.password;

            if (!(!name || !pwd)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt('return', responseTemplate.businessError(ctx, '请输入账号密码!'));

          case 4:
            _context.next = 6;
            return _userService2.default.getUserByNameAndPwd(name, pwd);

          case 6:
            user = _context.sent;

            if (user) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', responseTemplate.businessError(ctx, '账号或密码错误!'));

          case 9:
            token = _jsonwebtoken2.default.sign({
              userId: user.id // 你要保存到token的数据
            }, publicKey, { expiresIn: '7d' });
            //await tokenService.add(token)

            return _context.abrupt('return', responseTemplate.success(ctx, {
              accessToken: token
            }));

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function login(_x) {
    return _ref.apply(this, arguments);
  };
}();

var logout = exports.logout = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
    var user;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = ctx.user;

            if (!(!user || !user.token)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt('return', responseTemplate.success(ctx, null));

          case 3:
            _context2.next = 5;
            return _tokenService2.default.remove(user.token);

          case 5:
            return _context2.abrupt('return', responseTemplate.success(ctx, null));

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function logout(_x2) {
    return _ref2.apply(this, arguments);
  };
}();