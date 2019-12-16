'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.editRoleUser = exports.saveUser = exports.delUsers = exports.delUser = exports.getUserPagedList = exports.getUserInfo = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _userService = require('../services/userService');

var _userService2 = _interopRequireDefault(_userService);

var _responseTemplate = require('../lib/responseTemplate');

var responseTemplate = _interopRequireWildcard(_responseTemplate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserInfo = exports.getUserInfo = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        var user, _ref2, _ref3, userInfo, userRole, permissions, isAdmin;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        user = ctx.user;

                        if (!(!user || !user.userId)) {
                            _context.next = 3;
                            break;
                        }

                        return _context.abrupt('return', responseTemplate.businessError(ctx, '获取用户信息失败!'));

                    case 3:
                        _context.next = 5;
                        return _promise2.default.all([_userService2.default.getUserById(user.userId), _userService2.default.getUserRole(user.userId), _userService2.default.getUserPermission(user.userId), _userService2.default.isAdmin(user.userId)]);

                    case 5:
                        _ref2 = _context.sent;
                        _ref3 = (0, _slicedToArray3.default)(_ref2, 4);
                        userInfo = _ref3[0];
                        userRole = _ref3[1];
                        permissions = _ref3[2];
                        isAdmin = _ref3[3];

                        if (userInfo) {
                            _context.next = 13;
                            break;
                        }

                        return _context.abrupt('return', responseTemplate.businessError(ctx, '获取用户信息失败!'));

                    case 13:
                        return _context.abrupt('return', responseTemplate.success(ctx, {
                            userName: userInfo.name,
                            userRole: userRole,
                            userPermission: permissions,
                            isAdmin: isAdmin ? 1 : 0,
                            avatarUrl: 'https://api.adorable.io/avatars/85/abott@adorable.png'
                        }));

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getUserInfo(_x) {
        return _ref.apply(this, arguments);
    };
}();

var getUserPagedList = exports.getUserPagedList = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
        var pageIndex, pageSize, sortBy, descending, filter, pagedList;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        pageIndex = ctx.query.pageIndex;
                        pageSize = ctx.query.pageSize;
                        sortBy = ctx.query.sortBy;
                        descending = ctx.query.descending;
                        filter = JSON.parse(ctx.query.filter);
                        _context2.next = 7;
                        return _userService2.default.getUserPagedList(pageIndex, pageSize, sortBy, descending, filter);

                    case 7:
                        pagedList = _context2.sent;
                        return _context2.abrupt('return', responseTemplate.success(ctx, pagedList));

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function getUserPagedList(_x2) {
        return _ref4.apply(this, arguments);
    };
}();

var delUser = exports.delUser = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx) {
        var id, result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        id = ctx.query.id;
                        _context3.next = 3;
                        return _userService2.default.delUser(id);

                    case 3:
                        result = _context3.sent;

                        if (result.success) {
                            _context3.next = 6;
                            break;
                        }

                        return _context3.abrupt('return', responseTemplate.businessError(ctx, result.msg));

                    case 6:
                        return _context3.abrupt('return', responseTemplate.success(ctx, null));

                    case 7:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function delUser(_x3) {
        return _ref5.apply(this, arguments);
    };
}();

var delUsers = exports.delUsers = function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx) {
        var ids, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, id;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        ids = JSON.parse(ctx.query.ids);
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context4.prev = 4;
                        _iterator = (0, _getIterator3.default)(ids);

                    case 6:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context4.next = 13;
                            break;
                        }

                        id = _step.value;
                        _context4.next = 10;
                        return _userService2.default.delUser(id);

                    case 10:
                        _iteratorNormalCompletion = true;
                        _context4.next = 6;
                        break;

                    case 13:
                        _context4.next = 19;
                        break;

                    case 15:
                        _context4.prev = 15;
                        _context4.t0 = _context4['catch'](4);
                        _didIteratorError = true;
                        _iteratorError = _context4.t0;

                    case 19:
                        _context4.prev = 19;
                        _context4.prev = 20;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 22:
                        _context4.prev = 22;

                        if (!_didIteratorError) {
                            _context4.next = 25;
                            break;
                        }

                        throw _iteratorError;

                    case 25:
                        return _context4.finish(22);

                    case 26:
                        return _context4.finish(19);

                    case 27:
                        return _context4.abrupt('return', responseTemplate.success(ctx, null));

                    case 28:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[4, 15, 19, 27], [20,, 22, 26]]);
    }));

    return function delUsers(_x4) {
        return _ref6.apply(this, arguments);
    };
}();

var saveUser = exports.saveUser = function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx) {
        var func, result;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        func = ctx.request.body;

                        if (!(func.name == "")) {
                            _context5.next = 3;
                            break;
                        }

                        return _context5.abrupt('return', responseTemplate.businessError(ctx, "账号不能为空!"));

                    case 3:
                        _context5.next = 5;
                        return _userService2.default.saveUser(func);

                    case 5:
                        result = _context5.sent;

                        if (result.success) {
                            _context5.next = 8;
                            break;
                        }

                        return _context5.abrupt('return', responseTemplate.businessError(ctx, result.msg));

                    case 8:
                        return _context5.abrupt('return', responseTemplate.success(ctx, null));

                    case 9:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function saveUser(_x5) {
        return _ref7.apply(this, arguments);
    };
}();

var editRoleUser = exports.editRoleUser = function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(ctx) {
        var roleUser;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        roleUser = ctx.request.body;
                        _context6.next = 3;
                        return _userService2.default.editRoleUser(roleUser);

                    case 3:
                        return _context6.abrupt('return', responseTemplate.success(ctx, null));

                    case 4:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function editRoleUser(_x6) {
        return _ref8.apply(this, arguments);
    };
}();