'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _baseModel = require('../models/baseModel');

var _baseModel2 = _interopRequireDefault(_baseModel);

var _functionService = require('./functionService');

var _functionService2 = _interopRequireDefault(_functionService);

var _userService = require('./userService');

var _userService2 = _interopRequireDefault(_userService);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context = 'menu';
var buildMenu = function buildMenu(parentMenu, menuList) {
    var _parentMenu$children;

    parentMenu.children = [];
    var children = menuList.filter(function (item) {
        return item.parentId == parentMenu.id;
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var menu = _step.value;

            buildMenu(menu, menuList);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    (_parentMenu$children = parentMenu.children).push.apply(_parentMenu$children, (0, _toConsumableArray3.default)(children));
};
var buildAccessMenu = function buildAccessMenu(parentMenu, menuList, userPermission) {
    var _parentMenu$children2;

    parentMenu.children = [];
    var children = menuList.filter(function (item) {
        return item.parentId == parentMenu.id && (!item.functionCode || userPermission.indexOf(item.functionCode) > -1);
    });
    //父级没有权限访问，子级也不能访问
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = (0, _getIterator3.default)(children), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var menu = _step2.value;

            buildAccessMenu(menu, menuList, userPermission);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    (_parentMenu$children2 = parentMenu.children).push.apply(_parentMenu$children2, (0, _toConsumableArray3.default)(children));
};
var checkAccssMenu = function checkAccssMenu(accessMenuList, menuList) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = (0, _getIterator3.default)(accessMenuList), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var item = _step3.value;

            if (item.children) {
                checkAccssMenu(item.children, menuList);
            }
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    _lodash2.default.remove(accessMenuList, function (item) {
        return item.children.length == 0 && menuList.some(function (s) {
            return s.parentId == item.id;
        });
    });
};
var menuService = {
    getMenuList: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var db, menuList, parentMenuList, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, menu;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context.sent;
                            menuList = JSON.parse((0, _stringify2.default)(db.value()));

                            menuList = _lodash2.default.sortBy(menuList, ["sort"]);
                            parentMenuList = menuList.filter(function (item) {
                                return item.parentId === 0;
                            });
                            _iteratorNormalCompletion4 = true;
                            _didIteratorError4 = false;
                            _iteratorError4 = undefined;
                            _context.prev = 9;

                            for (_iterator4 = (0, _getIterator3.default)(parentMenuList); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                menu = _step4.value;

                                buildMenu(menu, menuList);
                            }
                            _context.next = 17;
                            break;

                        case 13:
                            _context.prev = 13;
                            _context.t0 = _context['catch'](9);
                            _didIteratorError4 = true;
                            _iteratorError4 = _context.t0;

                        case 17:
                            _context.prev = 17;
                            _context.prev = 18;

                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }

                        case 20:
                            _context.prev = 20;

                            if (!_didIteratorError4) {
                                _context.next = 23;
                                break;
                            }

                            throw _iteratorError4;

                        case 23:
                            return _context.finish(20);

                        case 24:
                            return _context.finish(17);

                        case 25:
                            return _context.abrupt('return', parentMenuList);

                        case 26:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[9, 13, 17, 25], [18,, 20, 24]]);
        }));

        return function getMenuList() {
            return _ref.apply(this, arguments);
        };
    }(),
    getAccessMenuList: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(userId) {
            var db, menuList, parentMenuList, isAdmin, userPermission, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, menu, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _menu;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context2.sent;
                            menuList = JSON.parse((0, _stringify2.default)(db.value()));

                            menuList = _lodash2.default.sortBy(menuList, ["sort"]);
                            parentMenuList = menuList.filter(function (item) {
                                return item.parentId == 0 && !item.isLock;
                            });
                            _context2.next = 8;
                            return _userService2.default.isAdmin(userId);

                        case 8:
                            isAdmin = _context2.sent;
                            _context2.next = 11;
                            return _userService2.default.getUserPermission(userId);

                        case 11:
                            userPermission = _context2.sent;

                            if (!isAdmin) {
                                _context2.next = 34;
                                break;
                            }

                            _iteratorNormalCompletion5 = true;
                            _didIteratorError5 = false;
                            _iteratorError5 = undefined;
                            _context2.prev = 16;

                            for (_iterator5 = (0, _getIterator3.default)(parentMenuList); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                menu = _step5.value;

                                buildMenu(menu, menuList);
                            }
                            _context2.next = 24;
                            break;

                        case 20:
                            _context2.prev = 20;
                            _context2.t0 = _context2['catch'](16);
                            _didIteratorError5 = true;
                            _iteratorError5 = _context2.t0;

                        case 24:
                            _context2.prev = 24;
                            _context2.prev = 25;

                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                _iterator5.return();
                            }

                        case 27:
                            _context2.prev = 27;

                            if (!_didIteratorError5) {
                                _context2.next = 30;
                                break;
                            }

                            throw _iteratorError5;

                        case 30:
                            return _context2.finish(27);

                        case 31:
                            return _context2.finish(24);

                        case 32:
                            _context2.next = 53;
                            break;

                        case 34:
                            _iteratorNormalCompletion6 = true;
                            _didIteratorError6 = false;
                            _iteratorError6 = undefined;
                            _context2.prev = 37;

                            for (_iterator6 = (0, _getIterator3.default)(parentMenuList); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                _menu = _step6.value;

                                buildAccessMenu(_menu, menuList, userPermission);
                            }
                            _context2.next = 45;
                            break;

                        case 41:
                            _context2.prev = 41;
                            _context2.t1 = _context2['catch'](37);
                            _didIteratorError6 = true;
                            _iteratorError6 = _context2.t1;

                        case 45:
                            _context2.prev = 45;
                            _context2.prev = 46;

                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                _iterator6.return();
                            }

                        case 48:
                            _context2.prev = 48;

                            if (!_didIteratorError6) {
                                _context2.next = 51;
                                break;
                            }

                            throw _iteratorError6;

                        case 51:
                            return _context2.finish(48);

                        case 52:
                            return _context2.finish(45);

                        case 53:
                            checkAccssMenu(parentMenuList, menuList);
                            return _context2.abrupt('return', parentMenuList);

                        case 55:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[16, 20, 24, 32], [25,, 27, 31], [37, 41, 45, 53], [46,, 48, 52]]);
        }));

        return function getAccessMenuList(_x) {
            return _ref2.apply(this, arguments);
        };
    }(),
    saveMenu: function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(menu) {
            var db, exist;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context3.sent;
                            _context3.next = 5;
                            return db.find({ name: menu.name }).value();

                        case 5:
                            exist = _context3.sent;

                            if (!(exist && exist.id != menu.id)) {
                                _context3.next = 8;
                                break;
                            }

                            return _context3.abrupt('return', {
                                success: false,
                                msg: "名称已经存在"
                            });

                        case 8:
                            if (!menu.id) {
                                _context3.next = 13;
                                break;
                            }

                            _context3.next = 11;
                            return db.find({ id: menu.id }).assign(menu).write();

                        case 11:
                            _context3.next = 15;
                            break;

                        case 13:
                            _context3.next = 15;
                            return db.insert(menu).write();

                        case 15:
                            return _context3.abrupt('return', {
                                success: true,
                                msg: ""
                            });

                        case 16:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function saveMenu(_x2) {
            return _ref3.apply(this, arguments);
        };
    }(),
    delMenu: function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id) {
            var db, exist, removeId, removePids, _ref5, curId;

            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context4.sent;
                            exist = db.find({ id: id }).value();
                            removeId = id;
                            removePids = [removeId];

                            if (exist) {
                                _context4.next = 10;
                                break;
                            }

                            return _context4.abrupt('return', {
                                success: false,
                                msg: "不存在删除的菜单"
                            });

                        case 10:
                            if (!(removeId = removePids.shift())) {
                                _context4.next = 26;
                                break;
                            }

                            _context4.next = 13;
                            return db.find({ parentId: removeId }).value();

                        case 13:
                            _context4.t0 = _context4.sent;

                            if (_context4.t0) {
                                _context4.next = 16;
                                break;
                            }

                            _context4.t0 = {};

                        case 16:
                            _ref5 = _context4.t0;
                            curId = _ref5.id;

                            if (curId) {
                                _context4.next = 20;
                                break;
                            }

                            return _context4.abrupt('continue', 10);

                        case 20:
                            console.log("删除项目的id", curId);
                            removePids.push(curId);
                            _context4.next = 24;
                            return db.remove({ parentId: removeId }).write();

                        case 24:
                            _context4.next = 10;
                            break;

                        case 26:
                            _context4.next = 28;
                            return db.remove({ id: id }).write();

                        case 28:
                            return _context4.abrupt('return', {
                                success: true,
                                msg: ""
                            });

                        case 29:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        }));

        return function delMenu(_x3) {
            return _ref4.apply(this, arguments);
        };
    }(),
    getMenuWithChildren: function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(menuId) {
            var db, menuList, menuWithChildren, menu, forFn, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, m;

            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context5.sent;
                            menuList = JSON.parse((0, _stringify2.default)(db.value()));
                            menuWithChildren = [];
                            menu = menuList.filter(function (s) {
                                return s.parentId == 0 && menuId == 0 || s.id == menuId;
                            });

                            forFn = function forFn(parentId) {
                                var children = menuList.filter(function (s) {
                                    return s.parentId == parentId;
                                });
                                if (children.length > 0) {
                                    menuWithChildren.push.apply(menuWithChildren, (0, _toConsumableArray3.default)(children));
                                    var _iteratorNormalCompletion7 = true;
                                    var _didIteratorError7 = false;
                                    var _iteratorError7 = undefined;

                                    try {
                                        for (var _iterator7 = (0, _getIterator3.default)(children), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                            var child = _step7.value;

                                            forFn(child.id);
                                        }
                                    } catch (err) {
                                        _didIteratorError7 = true;
                                        _iteratorError7 = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                                _iterator7.return();
                                            }
                                        } finally {
                                            if (_didIteratorError7) {
                                                throw _iteratorError7;
                                            }
                                        }
                                    }
                                }
                            };

                            if (!(menu.length > 0)) {
                                _context5.next = 28;
                                break;
                            }

                            menuWithChildren.push.apply(menuWithChildren, (0, _toConsumableArray3.default)(menu));
                            _iteratorNormalCompletion8 = true;
                            _didIteratorError8 = false;
                            _iteratorError8 = undefined;
                            _context5.prev = 12;
                            for (_iterator8 = (0, _getIterator3.default)(menu); !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                m = _step8.value;

                                forFn(m.id);
                            }
                            _context5.next = 20;
                            break;

                        case 16:
                            _context5.prev = 16;
                            _context5.t0 = _context5['catch'](12);
                            _didIteratorError8 = true;
                            _iteratorError8 = _context5.t0;

                        case 20:
                            _context5.prev = 20;
                            _context5.prev = 21;

                            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                _iterator8.return();
                            }

                        case 23:
                            _context5.prev = 23;

                            if (!_didIteratorError8) {
                                _context5.next = 26;
                                break;
                            }

                            throw _iteratorError8;

                        case 26:
                            return _context5.finish(23);

                        case 27:
                            return _context5.finish(20);

                        case 28:
                            return _context5.abrupt('return', menuWithChildren);

                        case 29:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined, [[12, 16, 20, 28], [21,, 23, 27]]);
        }));

        return function getMenuWithChildren(_x4) {
            return _ref6.apply(this, arguments);
        };
    }(),
    getMenuFunctions: function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(menuId) {
            var menuList, functionList, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _loop, _iterator9, _step9;

            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return menuService.getMenuWithChildren(menuId);

                        case 2:
                            menuList = _context6.sent;
                            _context6.next = 5;
                            return _functionService2.default.getFunctionList();

                        case 5:
                            functionList = _context6.sent;

                            functionList = _lodash2.default.sortBy(functionList, ["name"]);
                            _iteratorNormalCompletion9 = true;
                            _didIteratorError9 = false;
                            _iteratorError9 = undefined;
                            _context6.prev = 10;

                            _loop = function _loop() {
                                var menu = _step9.value;

                                menu.functions = functionList.filter(function (s) {
                                    return s.moduleId == menu.id;
                                });
                            };

                            for (_iterator9 = (0, _getIterator3.default)(menuList); !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                _loop();
                            }
                            _context6.next = 19;
                            break;

                        case 15:
                            _context6.prev = 15;
                            _context6.t0 = _context6['catch'](10);
                            _didIteratorError9 = true;
                            _iteratorError9 = _context6.t0;

                        case 19:
                            _context6.prev = 19;
                            _context6.prev = 20;

                            if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                _iterator9.return();
                            }

                        case 22:
                            _context6.prev = 22;

                            if (!_didIteratorError9) {
                                _context6.next = 25;
                                break;
                            }

                            throw _iteratorError9;

                        case 25:
                            return _context6.finish(22);

                        case 26:
                            return _context6.finish(19);

                        case 27:
                            return _context6.abrupt('return', menuList);

                        case 28:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined, [[10, 15, 19, 27], [20,, 22, 26]]);
        }));

        return function getMenuFunctions(_x5) {
            return _ref7.apply(this, arguments);
        };
    }()
};
module.exports = menuService;