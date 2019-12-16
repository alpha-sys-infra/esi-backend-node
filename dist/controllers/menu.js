'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMenuFunctions = exports.delMenu = exports.saveMenu = exports.getAccessMenuList = exports.getMenuList = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _memuService = require('../services/memuService');

var _memuService2 = _interopRequireDefault(_memuService);

var _roleService = require('../services/roleService');

var _roleService2 = _interopRequireDefault(_roleService);

var _responseTemplate = require('../lib/responseTemplate');

var responseTemplate = _interopRequireWildcard(_responseTemplate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getMenuList = exports.getMenuList = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        var menuList;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _memuService2.default.getMenuList();

                    case 2:
                        menuList = _context.sent;
                        return _context.abrupt('return', responseTemplate.success(ctx, menuList));

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getMenuList(_x) {
        return _ref.apply(this, arguments);
    };
}();

var getAccessMenuList = exports.getAccessMenuList = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
        var menuList;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _memuService2.default.getAccessMenuList(ctx.user.userId);

                    case 2:
                        menuList = _context2.sent;
                        return _context2.abrupt('return', responseTemplate.success(ctx, menuList));

                    case 4:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function getAccessMenuList(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var saveMenu = exports.saveMenu = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx) {
        var menu, result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        menu = ctx.request.body;

                        if (!(menu.name == "")) {
                            _context3.next = 3;
                            break;
                        }

                        return _context3.abrupt('return', responseTemplate.businessError(ctx, "名称不能为空!"));

                    case 3:
                        if (!(menu.title == "")) {
                            _context3.next = 5;
                            break;
                        }

                        return _context3.abrupt('return', responseTemplate.businessError(ctx, "标题不能为空!"));

                    case 5:
                        if (!(menu.icon == "")) {
                            _context3.next = 7;
                            break;
                        }

                        return _context3.abrupt('return', responseTemplate.businessError(ctx, "请选择图标!"));

                    case 7:
                        _context3.next = 9;
                        return _memuService2.default.saveMenu(menu);

                    case 9:
                        result = _context3.sent;

                        if (result.success) {
                            _context3.next = 12;
                            break;
                        }

                        return _context3.abrupt('return', responseTemplate.businessError(ctx, result.msg));

                    case 12:
                        return _context3.abrupt('return', responseTemplate.success(ctx, null));

                    case 13:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function saveMenu(_x3) {
        return _ref3.apply(this, arguments);
    };
}();

var delMenu = exports.delMenu = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx) {
        var id, result;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        console.log(ctx.request.body, "body");
                        id = ctx.request.body.id;

                        if (!(typeof id === "undefined")) {
                            _context4.next = 4;
                            break;
                        }

                        return _context4.abrupt('return', responseTemplate.businessError(ctx, "必须传入删除菜单id!"));

                    case 4:
                        _context4.next = 6;
                        return _memuService2.default.delMenu(id);

                    case 6:
                        result = _context4.sent;

                        if (result.success) {
                            _context4.next = 9;
                            break;
                        }

                        return _context4.abrupt('return', responseTemplate.businessError(ctx, result.msg));

                    case 9:
                        return _context4.abrupt('return', responseTemplate.success(ctx, null));

                    case 10:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function delMenu(_x4) {
        return _ref4.apply(this, arguments);
    };
}();

var getMenuFunctions = exports.getMenuFunctions = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx) {
        var menuId, roleId, _ref6, _ref7, menuFunctions, roleFunctions;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        menuId = ctx.query.menuId;
                        roleId = ctx.query.roleId;
                        _context5.next = 4;
                        return _promise2.default.all([_memuService2.default.getMenuFunctions(menuId), _roleService2.default.getRoleFunctions(roleId)]);

                    case 4:
                        _ref6 = _context5.sent;
                        _ref7 = (0, _slicedToArray3.default)(_ref6, 2);
                        menuFunctions = _ref7[0];
                        roleFunctions = _ref7[1];
                        return _context5.abrupt('return', responseTemplate.success(ctx, {
                            menuFunctions: menuFunctions,
                            roleFunctions: roleFunctions
                        }));

                    case 9:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function getMenuFunctions(_x5) {
        return _ref5.apply(this, arguments);
    };
}();