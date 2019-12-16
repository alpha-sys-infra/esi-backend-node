'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTopPost = exports.savePost = exports.getPost = exports.getPostPagedList = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _postService = require('../services/postService');

var _postService2 = _interopRequireDefault(_postService);

var _responseTemplate = require('../lib/responseTemplate');

var responseTemplate = _interopRequireWildcard(_responseTemplate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPostPagedList = exports.getPostPagedList = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        var pageIndex, pageSize, sortBy, descending, pagedList;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        pageIndex = ctx.query.pageIndex;
                        pageSize = ctx.query.pageSize;
                        sortBy = ctx.query.sortBy;
                        descending = ctx.query.descending;
                        _context.next = 6;
                        return _postService2.default.getPostPagedList(pageIndex, pageSize, sortBy, descending);

                    case 6:
                        pagedList = _context.sent;
                        return _context.abrupt('return', responseTemplate.success(ctx, pagedList));

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getPostPagedList(_x) {
        return _ref.apply(this, arguments);
    };
}();
var getPost = exports.getPost = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
        var id, post;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        id = ctx.params.id;
                        _context2.next = 3;
                        return _postService2.default.getPost(id);

                    case 3:
                        post = _context2.sent;

                        if (post) {
                            _context2.next = 6;
                            break;
                        }

                        return _context2.abrupt('return', responseTemplate.businessError(ctx, "文章不存在"));

                    case 6:
                        return _context2.abrupt('return', responseTemplate.success(ctx, post));

                    case 7:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function getPost(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var savePost = exports.savePost = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx) {
        var entity, result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        entity = ctx.request.body;

                        if (!(entity.title == "")) {
                            _context3.next = 3;
                            break;
                        }

                        return _context3.abrupt('return', responseTemplate.businessError(ctx, "标题不能为空!"));

                    case 3:
                        if (!(entity.shortContent == "")) {
                            _context3.next = 5;
                            break;
                        }

                        return _context3.abrupt('return', responseTemplate.businessError(ctx, "简述不能为空!"));

                    case 5:
                        if (!(entity.mdContent == "")) {
                            _context3.next = 7;
                            break;
                        }

                        return _context3.abrupt('return', responseTemplate.businessError(ctx, "内容不能为空!"));

                    case 7:
                        if (!(entity.catelog == "")) {
                            _context3.next = 9;
                            break;
                        }

                        return _context3.abrupt('return', responseTemplate.businessError(ctx, "分类不能为空!"));

                    case 9:
                        entity.updatedDate = new Date().getTime();
                        if (entity.publishedDate) {
                            entity.isTimePublish = 1;
                        } else {
                            entity.isTimePublish = 0;
                        }
                        entity.tags = entity.tags.join(",");
                        entity.keyWord = entity.keyWord.join(",");
                        _context3.next = 15;
                        return _postService2.default.savePost(entity);

                    case 15:
                        result = _context3.sent;

                        if (result.success) {
                            _context3.next = 18;
                            break;
                        }

                        return _context3.abrupt('return', responseTemplate.businessError(ctx, result.msg));

                    case 18:
                        return _context3.abrupt('return', responseTemplate.success(ctx, null));

                    case 19:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function savePost(_x3) {
        return _ref3.apply(this, arguments);
    };
}();

var getTopPost = exports.getTopPost = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx) {
        var catelog, status, query, post, result;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        catelog = ctx.query.catelog;
                        status = ctx.query.status;
                        query = {};

                        if (catelog) {
                            query.catelog = catelog;
                        }
                        if (status) {
                            query.status = parseInt(status);
                        }
                        _context4.next = 7;
                        return _postService2.default.getTopPost(query);

                    case 7:
                        post = _context4.sent;
                        result = null;

                        if (post) {
                            result = {};
                            result.title = post.title;
                            result.catelog = post.catelog;
                            result.tags = post.tags;
                            result.keyWord = post.keyWord;
                            result.htmlContent = post.htmlContent;
                        }
                        return _context4.abrupt('return', responseTemplate.success(ctx, result));

                    case 11:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function getTopPost(_x4) {
        return _ref4.apply(this, arguments);
    };
}();