'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _baseModel = require('../models/baseModel');

var _baseModel2 = _interopRequireDefault(_baseModel);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context = 'role';
var permissionContext = "permission";
var roleUserContext = 'roleUser';
module.exports = {
    getRolePagedList: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(pageIndex, pageSize, sortBy, descending, filter) {
            var db, roleList, resultList, roleUserDb, roleUserList, totalCount, start, end;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context.sent;
                            roleList = db.value();
                            resultList = roleList;

                            if (filter.code) {
                                resultList = _lodash2.default.filter(resultList, function (o) {
                                    return o.code.indexOf(filter.code) > -1;
                                });
                            }
                            if (filter.name) {
                                resultList = _lodash2.default.filter(resultList, function (o) {
                                    return o.name.indexOf(filter.name) > -1;
                                });
                            }

                            if (!filter.userId) {
                                _context.next = 15;
                                break;
                            }

                            _context.next = 10;
                            return _baseModel2.default.init(roleUserContext);

                        case 10:
                            roleUserDb = _context.sent;
                            roleUserList = roleUserDb.filter({ userId: filter.userId }).value();

                            roleUserList = roleUserList.map(function (s) {
                                return s.roleId;
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

                            return _context.abrupt('return', {
                                totalCount: totalCount,
                                rows: resultList
                            });

                        case 21:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function getRolePagedList(_x, _x2, _x3, _x4, _x5) {
            return _ref.apply(this, arguments);
        };
    }(),
    delRole: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id) {
            var db;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context2.sent;
                            _context2.next = 5;
                            return db.remove({ id: id }).write();

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function delRole(_x6) {
            return _ref2.apply(this, arguments);
        };
    }(),
    saveRole: function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(role) {
            var db, exist, exist1;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context3.sent;
                            exist = db.find({ code: role.code }).value();

                            if (!(exist && exist.id != role.id)) {
                                _context3.next = 6;
                                break;
                            }

                            return _context3.abrupt('return', {
                                success: false,
                                msg: "角色编码已经存在"
                            });

                        case 6:
                            exist1 = db.find({ name: role.name }).value();

                            if (!(exist1 && exist1.id != role.id)) {
                                _context3.next = 9;
                                break;
                            }

                            return _context3.abrupt('return', {
                                success: false,
                                msg: "角色名称已经存在"
                            });

                        case 9:
                            if (!role.id) {
                                _context3.next = 14;
                                break;
                            }

                            _context3.next = 12;
                            return db.find({ id: role.id }).assign(role).write();

                        case 12:
                            _context3.next = 16;
                            break;

                        case 14:
                            _context3.next = 16;
                            return db.insert(role).write();

                        case 16:
                            return _context3.abrupt('return', {
                                success: true,
                                msg: ""
                            });

                        case 17:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function saveRole(_x7) {
            return _ref3.apply(this, arguments);
        };
    }(),
    getRoleFunctions: function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(roleId) {
            var db, list, roleFunctions;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _baseModel2.default.init(permissionContext);

                        case 2:
                            db = _context4.sent;
                            list = db.value();
                            roleFunctions = list.filter(function (s) {
                                return s.roleId == roleId;
                            });
                            return _context4.abrupt('return', roleFunctions);

                        case 6:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        }));

        return function getRoleFunctions(_x8) {
            return _ref4.apply(this, arguments);
        };
    }(),
    getRoleFuntionsByRoleIds: function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(roleIds) {
            var db, list, roleFunctions;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return _baseModel2.default.init(permissionContext);

                        case 2:
                            db = _context5.sent;
                            list = db.value();
                            roleFunctions = list.filter(function (s) {
                                return roleIds.indexOf(s.roleId) > -1;
                            });
                            return _context5.abrupt('return', roleFunctions);

                        case 6:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        }));

        return function getRoleFuntionsByRoleIds(_x9) {
            return _ref5.apply(this, arguments);
        };
    }(),
    savePermission: function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(menuIds, roleId, permissions) {
            var db, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, menuId, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, permission;

            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return _baseModel2.default.init(permissionContext);

                        case 2:
                            db = _context6.sent;
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context6.prev = 6;
                            _iterator = (0, _getIterator3.default)(menuIds);

                        case 8:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context6.next = 15;
                                break;
                            }

                            menuId = _step.value;
                            _context6.next = 12;
                            return db.remove({ moduleId: menuId, roleId: roleId }).write();

                        case 12:
                            _iteratorNormalCompletion = true;
                            _context6.next = 8;
                            break;

                        case 15:
                            _context6.next = 21;
                            break;

                        case 17:
                            _context6.prev = 17;
                            _context6.t0 = _context6['catch'](6);
                            _didIteratorError = true;
                            _iteratorError = _context6.t0;

                        case 21:
                            _context6.prev = 21;
                            _context6.prev = 22;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 24:
                            _context6.prev = 24;

                            if (!_didIteratorError) {
                                _context6.next = 27;
                                break;
                            }

                            throw _iteratorError;

                        case 27:
                            return _context6.finish(24);

                        case 28:
                            return _context6.finish(21);

                        case 29:
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context6.prev = 32;
                            _iterator2 = (0, _getIterator3.default)(permissions);

                        case 34:
                            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                _context6.next = 41;
                                break;
                            }

                            permission = _step2.value;
                            _context6.next = 38;
                            return db.insert({
                                roleId: roleId,
                                functionId: permission.id,
                                moduleId: permission.moduleId
                            }).write();

                        case 38:
                            _iteratorNormalCompletion2 = true;
                            _context6.next = 34;
                            break;

                        case 41:
                            _context6.next = 47;
                            break;

                        case 43:
                            _context6.prev = 43;
                            _context6.t1 = _context6['catch'](32);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context6.t1;

                        case 47:
                            _context6.prev = 47;
                            _context6.prev = 48;

                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }

                        case 50:
                            _context6.prev = 50;

                            if (!_didIteratorError2) {
                                _context6.next = 53;
                                break;
                            }

                            throw _iteratorError2;

                        case 53:
                            return _context6.finish(50);

                        case 54:
                            return _context6.finish(47);

                        case 55:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined, [[6, 17, 21, 29], [22,, 24, 28], [32, 43, 47, 55], [48,, 50, 54]]);
        }));

        return function savePermission(_x10, _x11, _x12) {
            return _ref6.apply(this, arguments);
        };
    }(),
    getRoleListByIdList: function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(idList) {
            var db, roleList, result;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context7.sent;
                            roleList = db.value();
                            result = roleList.filter(function (s) {
                                return idList.indexOf(s.id) > -1;
                            });
                            return _context7.abrupt('return', result);

                        case 6:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, undefined);
        }));

        return function getRoleListByIdList(_x13) {
            return _ref7.apply(this, arguments);
        };
    }()
};