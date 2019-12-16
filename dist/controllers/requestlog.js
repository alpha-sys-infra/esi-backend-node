'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRequestLogPagedList = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _requestLogService = require('../services/requestLogService');

var _requestLogService2 = _interopRequireDefault(_requestLogService);

var _responseTemplate = require('../lib/responseTemplate');

var responseTemplate = _interopRequireWildcard(_responseTemplate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRequestLogPagedList = exports.getRequestLogPagedList = function () {
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
                        return _requestLogService2.default.getRequestLogPagedList(pageIndex, pageSize, sortBy, descending);

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

    return function getRequestLogPagedList(_x) {
        return _ref.apply(this, arguments);
    };
}();