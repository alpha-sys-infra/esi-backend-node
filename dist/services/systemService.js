'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _baseModel = require('../models/baseModel');

var _baseModel2 = _interopRequireDefault(_baseModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
   resetDb: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
         return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
               switch (_context.prev = _context.next) {
                  case 0:
                     _context.next = 2;
                     return _baseModel2.default.read();

                  case 2:
                  case 'end':
                     return _context.stop();
               }
            }
         }, _callee, undefined);
      }));

      return function resetDb() {
         return _ref.apply(this, arguments);
      };
   }()
};