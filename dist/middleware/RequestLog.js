'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _requestLogService = require('../services/requestLogService');

var _requestLogService2 = _interopRequireDefault(_requestLogService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
    var _this = this;

    return function (ctx, next) {
        if (ctx.url.indexOf("/requestlog/pagedlist") > -1) {
            return next();
        }
        var start = new Date();
        return next().then((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var ms, userId, ip, log;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            ms = new Date() - start;
                            userId = ctx.user && ctx.user.userId ? ctx.user.userId : '';
                            ip = ctx.ip.split(":").pop();
                            log = {
                                ip: ip,
                                method: ctx.method,
                                request: ctx.url.split("?")[0],
                                time: ms,
                                createdBy: userId,
                                createdDate: start.getTime()
                            };
                            _context.next = 6;
                            return _requestLogService2.default.addLog(log);

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        })));
    };
};