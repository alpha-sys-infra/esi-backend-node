'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _requestLogModel = require('../models/requestLogModel');

var _requestLogModel2 = _interopRequireDefault(_requestLogModel);

var _functionService = require('./functionService');

var _functionService2 = _interopRequireDefault(_functionService);

var _userService = require('./userService');

var _userService2 = _interopRequireDefault(_userService);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context = 'requestLog';

var requestLogService = {
    addLog: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(log) {
            var db;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _requestLogModel2.default.init(context);

                        case 2:
                            db = _context.sent;
                            _context.next = 5;
                            return db.insert(log).write();

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function addLog(_x) {
            return _ref.apply(this, arguments);
        };
    }(),
    getRequestLogPagedList: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(pageIndex, pageSize, sortBy, descending) {
            var db, list, resultList, totalCount, start, end, userList, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _requestLogModel2.default.init(context);

                        case 2:
                            db = _context2.sent;
                            list = db.value();
                            resultList = list;
                            totalCount = resultList.length;

                            if (sortBy) {
                                resultList = _lodash2.default.sortBy(resultList, [sortBy]);
                                if (descending === 'true') {
                                    resultList = resultList.reverse();
                                }
                            } else {
                                resultList = _lodash2.default.sortBy(resultList, ["createdDate"]);
                                if (descending === 'true') {
                                    resultList = resultList.reverse();
                                }
                            }
                            start = (pageIndex - 1) * pageSize;
                            end = pageIndex * pageSize;

                            resultList = _lodash2.default.slice(resultList, start, end);
                            _context2.next = 12;
                            return _userService2.default.getUserList();

                        case 12:
                            userList = _context2.sent;
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context2.prev = 16;

                            _loop = function _loop() {
                                var item = _step.value;

                                var user = userList.filter(function (s) {
                                    return s.id == item.createdBy;
                                });
                                if (user.length > 0) {
                                    item.createdByName = user[0].name;
                                } else {
                                    item.createdByName = item.createdBy;
                                }
                            };

                            for (_iterator = (0, _getIterator3.default)(resultList); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                _loop();
                            }
                            _context2.next = 25;
                            break;

                        case 21:
                            _context2.prev = 21;
                            _context2.t0 = _context2['catch'](16);
                            _didIteratorError = true;
                            _iteratorError = _context2.t0;

                        case 25:
                            _context2.prev = 25;
                            _context2.prev = 26;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 28:
                            _context2.prev = 28;

                            if (!_didIteratorError) {
                                _context2.next = 31;
                                break;
                            }

                            throw _iteratorError;

                        case 31:
                            return _context2.finish(28);

                        case 32:
                            return _context2.finish(25);

                        case 33:
                            return _context2.abrupt('return', {
                                totalCount: totalCount,
                                rows: resultList
                            });

                        case 34:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[16, 21, 25, 33], [26,, 28, 32]]);
        }));

        return function getRequestLogPagedList(_x2, _x3, _x4, _x5) {
            return _ref2.apply(this, arguments);
        };
    }()
};
module.exports = requestLogService;