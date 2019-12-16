'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _baseModel = require('../models/baseModel');

var _baseModel2 = _interopRequireDefault(_baseModel);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var context = 'post';

var service = {
    getPostPagedList: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(pageIndex, pageSize, sortBy, descending) {
            var db, list, resultList, totalCount, start, end;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context.sent;
                            list = db.value();
                            resultList = JSON.parse((0, _stringify2.default)(list));
                            totalCount = resultList.length;

                            if (sortBy) {
                                resultList = _lodash2.default.sortBy(resultList, [sortBy]);
                                if (descending === 'true') {
                                    resultList = resultList.reverse();
                                }
                            } else {
                                resultList = _lodash2.default.sortBy(resultList, ["updatedDate"]);
                                if (descending === 'true') {
                                    resultList = resultList.reverse();
                                }
                            }
                            start = (pageIndex - 1) * pageSize;
                            end = pageIndex * pageSize;

                            resultList = _lodash2.default.slice(resultList, start, end);

                            resultList = resultList.map(function (s) {
                                s.tags = s.tags.split(",");
                                s.mdContent = "";
                                s.htmlContent = "";

                                return s;
                            });

                            return _context.abrupt('return', {
                                totalCount: totalCount,
                                rows: resultList
                            });

                        case 12:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function getPostPagedList(_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
        };
    }(),
    getPost: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id) {
            var db, post;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context2.sent;
                            post = db.find({ id: id }).value();
                            return _context2.abrupt('return', post);

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function getPost(_x5) {
            return _ref2.apply(this, arguments);
        };
    }(),
    savePost: function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(entity) {
            var db, exist;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context3.sent;
                            exist = db.find({ title: entity.title }).value();

                            if (!(exist && exist.id != entity.id)) {
                                _context3.next = 6;
                                break;
                            }

                            return _context3.abrupt('return', {
                                success: false,
                                msg: "标题已经存在"
                            });

                        case 6:
                            if (!entity.id) {
                                _context3.next = 12;
                                break;
                            }

                            delete entity.createdDate;
                            _context3.next = 10;
                            return db.find({ id: entity.id }).assign(entity).write();

                        case 10:
                            _context3.next = 15;
                            break;

                        case 12:
                            entity.createdDate = new Date().getTime();
                            _context3.next = 15;
                            return db.insert(entity).write();

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

        return function savePost(_x6) {
            return _ref3.apply(this, arguments);
        };
    }(),
    getTopPost: function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(query) {
            var db, post;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _baseModel2.default.init(context);

                        case 2:
                            db = _context4.sent;
                            post = db.filter(query).sortBy('sort').take(1).value();

                            if (!(post.length > 0)) {
                                _context4.next = 6;
                                break;
                            }

                            return _context4.abrupt('return', post[0]);

                        case 6:
                            return _context4.abrupt('return', null);

                        case 7:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        }));

        return function getTopPost(_x7) {
            return _ref4.apply(this, arguments);
        };
    }()
};
module.exports = service;