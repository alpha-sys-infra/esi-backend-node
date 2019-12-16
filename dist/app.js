'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _koaStatic = require('koa-static2');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koa2Cors = require('koa2-cors');

var _koa2Cors2 = _interopRequireDefault(_koa2Cors);

var _config = require('./config');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mainRoutes = require('./routes/main-routes');

var _mainRoutes2 = _interopRequireDefault(_mainRoutes);

var _ErrorRoutesCatch = require('./middleware/ErrorRoutesCatch');

var _ErrorRoutesCatch2 = _interopRequireDefault(_ErrorRoutesCatch);

var _errorRoutes = require('./routes/error-routes');

var _errorRoutes2 = _interopRequireDefault(_errorRoutes);

var _ParseUserInfo = require('./middleware/ParseUserInfo');

var _ParseUserInfo2 = _interopRequireDefault(_ParseUserInfo);

var _RequestLog = require('./middleware/RequestLog');

var _RequestLog2 = _interopRequireDefault(_RequestLog);

var _koaJwt = require('koa-jwt');

var _koaJwt2 = _interopRequireDefault(_koaJwt);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import PluginLoader from './lib/PluginLoader'

var app = new _koa2.default();
var env = process.env.NODE_ENV || 'development'; // Current mode

var publicKey = _fs2.default.readFileSync(_path2.default.join(__dirname, '../publicKey.pub'));

app.use((0, _koa2Cors2.default)());
if (env === 'development') {
  // logger
  app.use(function (ctx, next) {
    var start = new Date();
    return next().then(function () {
      var ms = new Date() - start;
      console.log(ctx.ip + ' ' + ctx.method + ' ' + decodeURI(ctx.url) + ' - ' + ms + 'ms');
    });
  });
}
// .use((ctx, next) => {
//   if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
//     ctx.set('Access-Control-Allow-Origin', '*')
//   } else {
//     ctx.set('Access-Control-Allow-Origin', SystemConfig.HTTP_server_host)
//   }
//   ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
//   //ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
//   if (ctx.method === 'OPTIONS') {
//     ctx.status = 204
//   } else {
//     return next()
//   }
// })
app.use((0, _ErrorRoutesCatch2.default)()).use((0, _koaStatic2.default)('assets', _path2.default.resolve(__dirname, '../assets'))) // Static resource
.use((0, _koaJwt2.default)({ secret: publicKey }).unless({ path: [/^\/public|\/auth\/login|\/assets/] })).use((0, _ParseUserInfo2.default)());
if (env === 'production') {
  app.use((0, _RequestLog2.default)());
}
app.use((0, _koaBody2.default)({
  multipart: true,
  strict: false,
  formidable: {
    uploadDir: _path2.default.join(__dirname, '../assets/uploads/tmp')
  },
  jsonLimit: '10mb',
  formLimit: '10mb',
  textLimit: '10mb'
})) // Processing request
// .use(PluginLoader(SystemConfig.System_plugin_path))
.use(_mainRoutes2.default.routes()).use(_mainRoutes2.default.allowedMethods());
//.use(ErrorRoutes())

app.listen(_config.System.API_server_port);

console.log('Now start API server on port ' + _config.System.API_server_port + '...');

exports.default = app;