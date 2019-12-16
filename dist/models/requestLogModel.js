'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var low = require('lowdb');
var lodashId = require('lodash-id');
var FileAsync = require('lowdb/adapters/FileAsync');
var dbFile = _path2.default.join(__dirname, '../db/request_log_db.json');
var adapter = new FileAsync(dbFile);
var instance = undefined;
module.exports = {
    init: function init(context) {
        return new _promise2.default(function (resolve, reject) {
            if (instance === undefined) {
                low(adapter).then(function (db) {
                    db._.mixin(lodashId);
                    instance = db;
                    resolve(db.get(context));
                });
            } else {
                resolve(instance.get(context));
            }
        });
    },
    read: function read() {
        return new _promise2.default(function (resolve, reject) {
            if (instance === undefined) {
                resolve();
            } else {
                instance.read().then(function () {
                    resolve();
                });
            }
        });
    }

};