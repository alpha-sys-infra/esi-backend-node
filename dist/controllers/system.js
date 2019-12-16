'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resetDb = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _systemService = require('../services/systemService');

var _systemService2 = _interopRequireDefault(_systemService);

var _responseTemplate = require('../lib/responseTemplate');

var responseTemplate = _interopRequireWildcard(_responseTemplate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var resetDb = exports.resetDb = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return fs.copyFileSync(_path2.default.join(__dirname, '../db/db_backup.json'), _path2.default.join(__dirname, '../db/db.json'));

                    case 3:
                        _context.next = 5;
                        return _systemService2.default.resetDb();

                    case 5:
                        return _context.abrupt('return', responseTemplate.success(ctx, "初始化成功"));

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);

                        console.log(_context.t0);
                        return _context.abrupt('return', responseTemplate.businessError(ctx, "初始化失败"));

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 8]]);
    }));

    return function resetDb(_x) {
        return _ref.apply(this, arguments);
    };
}();