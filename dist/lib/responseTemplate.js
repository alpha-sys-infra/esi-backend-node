'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var businessError = exports.businessError = function businessError(ctx, msg) {
    ctx.body = {
        statusCode: 500,
        msg: msg,
        data: null
    };
};

var success = exports.success = function success(ctx, data) {
    ctx.body = {
        statusCode: 200,
        msg: '',
        data: data
    };
};