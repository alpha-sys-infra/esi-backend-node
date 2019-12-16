'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _userService = require('../services/userService');

var _userService2 = _interopRequireDefault(_userService);

var _responseTemplate = require('../lib/responseTemplate');

var responseTemplate = _interopRequireWildcard(_responseTemplate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_ref) {
    var _ref$permission = _ref.permission,
        permission = _ref$permission === undefined ? [] : _ref$permission,
        _ref$role = _ref.role,
        role = _ref$role === undefined ? [] : _ref$role;

    return function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
            var isAdmin, roles, r, userPermisssions, p;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!(!ctx.user || !ctx.user.userId)) {
                                _context.next = 2;
                                break;
                            }

                            return _context.abrupt('return', responseTemplate.businessError(ctx, "没有访问权限"));

                        case 2:
                            if (!(permission.length == 0 && role.length == 0)) {
                                _context.next = 4;
                                break;
                            }

                            return _context.abrupt('return', next());

                        case 4:
                            _context.next = 6;
                            return _userService2.default.isAdmin(ctx.user.userId);

                        case 6:
                            isAdmin = _context.sent;

                            if (!isAdmin) {
                                _context.next = 9;
                                break;
                            }

                            return _context.abrupt('return', next());

                        case 9:
                            _context.next = 11;
                            return _userService2.default.getUserRole(ctx.user.userId);

                        case 11:
                            roles = _context.sent;
                            r = roles.filter(function (s) {
                                return role.indexOf(s) > -1;
                            });

                            if (!(r && r.length > 0)) {
                                _context.next = 15;
                                break;
                            }

                            return _context.abrupt('return', next());

                        case 15:
                            _context.next = 17;
                            return _userService2.default.getUserPermission(ctx.user.userId);

                        case 17:
                            userPermisssions = _context.sent;
                            p = userPermisssions.filter(function (s) {
                                return permission.indexOf(s) > -1;
                            });

                            if (!(p && p.length > 0)) {
                                _context.next = 21;
                                break;
                            }

                            return _context.abrupt('return', next());

                        case 21:
                            return _context.abrupt('return', responseTemplate.businessError(ctx, "没有访问权限"));

                        case 22:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x, _x2) {
            return _ref2.apply(this, arguments);
        };
    }();
};