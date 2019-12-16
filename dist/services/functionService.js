'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _baseModel = require('../models/baseModel');

var _baseModel2 = _interopRequireDefault(_baseModel);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context = 'function';

module.exports = {
    getFunctionPagedList: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(pageIndex, pageSize, sortBy, descending, filter) {
            var db, functionList, resultList, totalCount, start, end;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context.sent;
                            functionList = db.value();
                            resultList = functionList;

                            if (filter.module) {
                                resultList = _lodash2.default.filter(resultList, function (o) {
                                    return o.module.indexOf(filter.module) > -1;
                                });
                            }
                            if (filter.name) {
                                resultList = _lodash2.default.filter(resultList, function (o) {
                                    return o.name.indexOf(filter.name) > -1;
                                });
                            }
                            if (filter.code) {
                                resultList = _lodash2.default.filter(resultList, function (o) {
                                    return o.code.indexOf(filter.code) > -1;
                                });
                            }
                            totalCount = resultList.length;

                            if (sortBy) {
                                resultList = _lodash2.default.sortBy(resultList, [sortBy]);
                                if (descending === 'true') {
                                    resultList = resultList.reverse();
                                }
                            } else {
                                resultList = _lodash2.default.sortBy(resultList, ["module", "name"]);
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

                        case 14:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function getFunctionPagedList(_x, _x2, _x3, _x4, _x5) {
            return _ref.apply(this, arguments);
        };
    }(),
    getFunctionList: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var db;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context2.sent;
                            return _context2.abrupt('return', db.value());

                        case 4:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function getFunctionList() {
            return _ref2.apply(this, arguments);
        };
    }(),
    getFunctionListByIds: function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ids) {
            var db, list, functions;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context3.sent;
                            list = db.value();
                            functions = list.filter(function (s) {
                                return ids.indexOf(s.id) > -1;
                            });
                            return _context3.abrupt('return', functions);

                        case 6:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function getFunctionListByIds(_x6) {
            return _ref3.apply(this, arguments);
        };
    }(),
    delFuntion: function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(id) {
            var db;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context4.sent;
                            _context4.next = 5;
                            return db.remove({ id: id }).write();

                        case 5:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        }));

        return function delFuntion(_x7) {
            return _ref4.apply(this, arguments);
        };
    }(),
    saveFunction: function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(func) {
            var db, exist, exist1;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context5.sent;
                            exist = db.find({ code: func.code }).value();

                            if (!(exist && exist.id != func.id)) {
                                _context5.next = 6;
                                break;
                            }

                            return _context5.abrupt('return', {
                                success: false,
                                msg: "功能编码已经存在"
                            });

                        case 6:
                            exist1 = db.find({ moduleId: func.moduleId, name: func.name }).value();

                            if (!(exist1 && exist1.id != func.id)) {
                                _context5.next = 9;
                                break;
                            }

                            return _context5.abrupt('return', {
                                success: false,
                                msg: "当前模块功能名称已经存在"
                            });

                        case 9:
                            if (!func.id) {
                                _context5.next = 14;
                                break;
                            }

                            _context5.next = 12;
                            return db.find({ id: func.id }).assign(func).write();

                        case 12:
                            _context5.next = 16;
                            break;

                        case 14:
                            _context5.next = 16;
                            return db.insert(func).write();

                        case 16:
                            return _context5.abrupt('return', {
                                success: true,
                                msg: ""
                            });

                        case 17:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        }));

        return function saveFunction(_x8) {
            return _ref5.apply(this, arguments);
        };
    }()
};