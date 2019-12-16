'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _baseModel = require('../models/baseModel');

var _baseModel2 = _interopRequireDefault(_baseModel);

var _roleService = require('./roleService');

var _roleService2 = _interopRequireDefault(_roleService);

var _functionService = require('./functionService');

var _functionService2 = _interopRequireDefault(_functionService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context = 'user';
var adminContext = 'admin';
var roleUserContext = 'roleUser';
module.exports = {
    getUserByNameAndPwd: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(name, pwd) {
            var db, user;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context.sent;
                            user = db.find({ name: name, password: pwd }).value();
                            return _context.abrupt('return', user);

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function getUserByNameAndPwd(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }(),
    getUserById: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id) {
            var db, user;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context2.sent;
                            user = db.find({ id: id }).value();
                            return _context2.abrupt('return', user);

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function getUserById(_x3) {
            return _ref2.apply(this, arguments);
        };
    }(),
    getUserList: function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            var db, list;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context3.sent;
                            list = db.value();
                            return _context3.abrupt('return', list);

                        case 5:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function getUserList() {
            return _ref3.apply(this, arguments);
        };
    }(),
    getUserPagedList: function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(pageIndex, pageSize, sortBy, descending, filter) {
            var db, roleList, resultList, roleUserDb, roleUserList, totalCount, start, end;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context4.sent;
                            roleList = db.value();
                            resultList = JSON.parse((0, _stringify2.default)(roleList));

                            if (filter.name) {
                                resultList = _lodash2.default.filter(resultList, function (o) {
                                    return o.name.indexOf(filter.name) > -1 || o.trueName.indexOf(filter.name) > -1;
                                });
                            }
                            if (filter.email) {
                                resultList = _lodash2.default.filter(resultList, function (o) {
                                    return o.email.indexOf(filter.email) > -1;
                                });
                            }

                            if (!filter.roleId) {
                                _context4.next = 15;
                                break;
                            }

                            _context4.next = 10;
                            return _baseModel2.default.init(roleUserContext);

                        case 10:
                            roleUserDb = _context4.sent;
                            roleUserList = roleUserDb.filter({ roleId: filter.roleId }).value();

                            roleUserList = roleUserList.map(function (s) {
                                return s.userId;
                            });
                            resultList = _lodash2.default.map(resultList, function (item) {
                                if (roleUserList.indexOf(item.id) > -1) {
                                    item.isAdd = 1;
                                } else {
                                    item.isAdd = 2;
                                }
                                return item;
                            });
                            sortBy = "isAdd";

                        case 15:
                            totalCount = resultList.length;

                            if (sortBy) {
                                resultList = _lodash2.default.sortBy(resultList, [sortBy]);
                                if (descending === 'true') {
                                    resultList = resultList.reverse();
                                }
                            }
                            start = (pageIndex - 1) * pageSize;
                            end = pageIndex * pageSize;

                            resultList = _lodash2.default.slice(resultList, start, end);

                            return _context4.abrupt('return', {
                                totalCount: totalCount,
                                rows: resultList
                            });

                        case 21:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        }));

        return function getUserPagedList(_x4, _x5, _x6, _x7, _x8) {
            return _ref4.apply(this, arguments);
        };
    }(),
    delUser: function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(id) {
            var db, adminDb, admin;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context5.sent;
                            _context5.next = 5;
                            return _baseModel2.default.init(adminContext);

                        case 5:
                            adminDb = _context5.sent;
                            admin = adminDb.value();

                            if (!(admin.indexOf(id) > -1)) {
                                _context5.next = 9;
                                break;
                            }

                            return _context5.abrupt('return', {
                                success: false,
                                msg: "不能删除管理员账号"
                            });

                        case 9:
                            _context5.next = 11;
                            return db.remove({ id: id }).write();

                        case 11:
                            return _context5.abrupt('return', {
                                success: true,
                                msg: ""
                            });

                        case 12:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        }));

        return function delUser(_x9) {
            return _ref5.apply(this, arguments);
        };
    }(),
    saveUser: function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(user) {
            var db, exist, exist1;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context6.sent;
                            exist = db.find({ name: user.name }).value();

                            if (!(exist && exist.id != user.id)) {
                                _context6.next = 6;
                                break;
                            }

                            return _context6.abrupt('return', {
                                success: false,
                                msg: "账号名称已经存在"
                            });

                        case 6:
                            exist1 = db.find({ email: user.email }).value();

                            if (!(exist1 && exist1.id != user.id)) {
                                _context6.next = 9;
                                break;
                            }

                            return _context6.abrupt('return', {
                                success: false,
                                msg: "用户邮箱已经存在"
                            });

                        case 9:
                            if (!user.id) {
                                _context6.next = 14;
                                break;
                            }

                            _context6.next = 12;
                            return db.find({ id: user.id }).assign(user).write();

                        case 12:
                            _context6.next = 17;
                            break;

                        case 14:
                            user.password = "123456";
                            _context6.next = 17;
                            return db.insert(user).write();

                        case 17:
                            return _context6.abrupt('return', {
                                success: true,
                                msg: ""
                            });

                        case 18:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined);
        }));

        return function saveUser(_x10) {
            return _ref6.apply(this, arguments);
        };
    }(),
    changePassWord: function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(user) {
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, undefined);
        }));

        return function changePassWord(_x11) {
            return _ref7.apply(this, arguments);
        };
    }(),
    editRoleUser: function () {
        var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(roleUser) {
            var roleUserDb;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.next = 2;
                            return _baseModel2.default.init(roleUserContext);

                        case 2:
                            roleUserDb = _context8.sent;

                            if (!(roleUser.action == 1)) {
                                _context8.next = 8;
                                break;
                            }

                            _context8.next = 6;
                            return roleUserDb.push({ userId: roleUser.userId, roleId: roleUser.roleId }).write();

                        case 6:
                            _context8.next = 10;
                            break;

                        case 8:
                            _context8.next = 10;
                            return roleUserDb.remove({ userId: roleUser.userId, roleId: roleUser.roleId }).write();

                        case 10:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, undefined);
        }));

        return function editRoleUser(_x12) {
            return _ref8.apply(this, arguments);
        };
    }(),
    getUserRole: function () {
        var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(userId) {
            var roleUserDb, roleUserList, roleIdList, roleList, roleCodeList;
            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            _context9.next = 2;
                            return _baseModel2.default.init(roleUserContext);

                        case 2:
                            roleUserDb = _context9.sent;
                            roleUserList = roleUserDb.filter({ userId: userId }).value();
                            roleIdList = roleUserList.map(function (s) {
                                return s.roleId;
                            });
                            _context9.next = 7;
                            return _roleService2.default.getRoleListByIdList(roleIdList);

                        case 7:
                            roleList = _context9.sent;
                            roleCodeList = roleList.map(function (s) {
                                return s.code;
                            });
                            return _context9.abrupt('return', roleCodeList);

                        case 10:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, undefined);
        }));

        return function getUserRole(_x13) {
            return _ref9.apply(this, arguments);
        };
    }(),
    getUserPermission: function () {
        var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(userId) {
            var roleUserDb, roleUserList, roleIdList, roleFunctions, functionIds, functionList, functionCodeList;
            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            _context10.next = 2;
                            return _baseModel2.default.init(roleUserContext);

                        case 2:
                            roleUserDb = _context10.sent;
                            roleUserList = roleUserDb.filter({ userId: userId }).value();
                            roleIdList = roleUserList.map(function (s) {
                                return s.roleId;
                            });
                            _context10.next = 7;
                            return _roleService2.default.getRoleFuntionsByRoleIds(roleIdList);

                        case 7:
                            roleFunctions = _context10.sent;
                            functionIds = roleFunctions.map(function (s) {
                                return s.functionId;
                            });
                            _context10.next = 11;
                            return _functionService2.default.getFunctionListByIds(functionIds);

                        case 11:
                            functionList = _context10.sent;
                            functionCodeList = functionList.map(function (s) {
                                return s.code;
                            });
                            return _context10.abrupt('return', functionCodeList);

                        case 14:
                        case 'end':
                            return _context10.stop();
                    }
                }
            }, _callee10, undefined);
        }));

        return function getUserPermission(_x14) {
            return _ref10.apply(this, arguments);
        };
    }(),
    isAdmin: function () {
        var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(userId) {
            var adminDb, admin;
            return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            _context11.next = 2;
                            return _baseModel2.default.init(adminContext);

                        case 2:
                            adminDb = _context11.sent;
                            admin = adminDb.value();

                            if (!(admin.indexOf(userId) > -1)) {
                                _context11.next = 6;
                                break;
                            }

                            return _context11.abrupt('return', true);

                        case 6:
                            return _context11.abrupt('return', false);

                        case 7:
                        case 'end':
                            return _context11.stop();
                    }
                }
            }, _callee11, undefined);
        }));

        return function isAdmin(_x15) {
            return _ref11.apply(this, arguments);
        };
    }()
};