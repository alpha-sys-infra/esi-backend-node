'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.savePermission = exports.saveRole = exports.delRoles = exports.delRole = exports.getRolePagedList = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _roleService = require('../services/roleService');

var _roleService2 = _interopRequireDefault(_roleService);

var _memuService = require('../services/memuService');

var _memuService2 = _interopRequireDefault(_memuService);

var _functionService = require('../services/functionService');

var _functionService2 = _interopRequireDefault(_functionService);

var _responseTemplate = require('../lib/responseTemplate');

var responseTemplate = _interopRequireWildcard(_responseTemplate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRolePagedList = exports.getRolePagedList = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
        var pageIndex, pageSize, sortBy, descending, filter, pagedList;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        pageIndex = ctx.query.pageIndex;
                        pageSize = ctx.query.pageSize;
                        sortBy = ctx.query.sortBy;
                        descending = ctx.query.descending;
                        filter = JSON.parse(ctx.query.filter);
                        _context.next = 7;
                        return _roleService2.default.getRolePagedList(pageIndex, pageSize, sortBy, descending, filter);

                    case 7:
                        pagedList = _context.sent;

                        responseTemplate.success(ctx, pagedList);
                        return _context.abrupt('return', next());

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getRolePagedList(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var delRole = exports.delRole = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
        var id;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        id = ctx.query.id;
                        _context2.next = 3;
                        return _roleService2.default.delRole(id);

                    case 3:
                        return _context2.abrupt('return', responseTemplate.success(ctx, null));

                    case 4:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function delRole(_x3) {
        return _ref2.apply(this, arguments);
    };
}();

var delRoles = exports.delRoles = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx) {
        var ids, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, id;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        ids = JSON.parse(ctx.query.ids);
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context3.prev = 4;
                        _iterator = (0, _getIterator3.default)(ids);

                    case 6:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context3.next = 13;
                            break;
                        }

                        id = _step.value;
                        _context3.next = 10;
                        return _roleService2.default.delRole(id);

                    case 10:
                        _iteratorNormalCompletion = true;
                        _context3.next = 6;
                        break;

                    case 13:
                        _context3.next = 19;
                        break;

                    case 15:
                        _context3.prev = 15;
                        _context3.t0 = _context3['catch'](4);
                        _didIteratorError = true;
                        _iteratorError = _context3.t0;

                    case 19:
                        _context3.prev = 19;
                        _context3.prev = 20;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 22:
                        _context3.prev = 22;

                        if (!_didIteratorError) {
                            _context3.next = 25;
                            break;
                        }

                        throw _iteratorError;

                    case 25:
                        return _context3.finish(22);

                    case 26:
                        return _context3.finish(19);

                    case 27:
                        return _context3.abrupt('return', responseTemplate.success(ctx, null));

                    case 28:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[4, 15, 19, 27], [20,, 22, 26]]);
    }));

    return function delRoles(_x4) {
        return _ref3.apply(this, arguments);
    };
}();

var saveRole = exports.saveRole = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx) {
        var func, result;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        func = ctx.request.body;

                        if (!(func.name == "")) {
                            _context4.next = 3;
                            break;
                        }

                        return _context4.abrupt('return', responseTemplate.businessError(ctx, "名称不能为空!"));

                    case 3:
                        if (!(func.code == "")) {
                            _context4.next = 5;
                            break;
                        }

                        return _context4.abrupt('return', responseTemplate.businessError(ctx, "编码不能为空!"));

                    case 5:
                        _context4.next = 7;
                        return _roleService2.default.saveRole(func);

                    case 7:
                        result = _context4.sent;

                        if (result.success) {
                            _context4.next = 10;
                            break;
                        }

                        return _context4.abrupt('return', responseTemplate.businessError(ctx, result.msg));

                    case 10:
                        return _context4.abrupt('return', responseTemplate.success(ctx, null));

                    case 11:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function saveRole(_x5) {
        return _ref4.apply(this, arguments);
    };
}();

var savePermission = exports.savePermission = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx) {
        var data, functionList, menuWithChildren, menuIds;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        data = ctx.request.body;
                        functionList = [];

                        if (!(data.moduleId == 0)) {
                            _context5.next = 6;
                            break;
                        }

                        _context5.next = 5;
                        return _functionService2.default.getFunctionList();

                    case 5:
                        functionList = _context5.sent;

                    case 6:
                        data.permissions = data.permissions.map(function (s) {
                            //react-antd-admin
                            if (data.moduleId == 0) {
                                var f = functionList.filter(function (p) {
                                    return p.id == s;
                                });
                                var permission = {};
                                permission.id = s;
                                permission.moduleId = f.length > 0 ? f[0].moduleId : 0;
                                return permission;
                            } else {
                                //vue-quasar-admin
                                s = JSON.parse(s);
                                return s;
                            }
                        });
                        _context5.next = 9;
                        return _memuService2.default.getMenuFunctions(data.moduleId);

                    case 9:
                        menuWithChildren = _context5.sent;
                        menuIds = menuWithChildren.map(function (s) {
                            return s.id;
                        });
                        _context5.next = 13;
                        return _roleService2.default.savePermission(menuIds, data.roleId, data.permissions);

                    case 13:
                        return _context5.abrupt('return', responseTemplate.success(ctx, null));

                    case 14:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function savePermission(_x6) {
        return _ref5.apply(this, arguments);
    };
}();