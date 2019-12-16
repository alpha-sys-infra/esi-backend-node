'use strict';

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _index = require('../controllers/index.js');

var _index2 = _interopRequireDefault(_index);

var _PermissionCheck = require('../middleware/PermissionCheck');

var _PermissionCheck2 = _interopRequireDefault(_PermissionCheck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.get('/public/get', function (ctx, next) {
  ctx.body = '禁止访问！';
}) // 以/public开头则不用经过权限认证
.post('/auth/login', _index2.default.auth.login).post('/auth/logout', _index2.default.auth.logout).get('/menu', (0, _PermissionCheck2.default)({ permission: ["menu_view"] }), _index2.default.menu.getMenuList).get('/menu/getaccessmenu', _index2.default.menu.getAccessMenuList).get('/menu/menufunctions', _index2.default.menu.getMenuFunctions).post('/menu/savemenu', (0, _PermissionCheck2.default)({ permission: ["menu_edit"] }), _index2.default.menu.saveMenu).post('/menu/delmenu', (0, _PermissionCheck2.default)({ permission: ["menu_del"] }), _index2.default.menu.delMenu).get('/function/pagedlist', (0, _PermissionCheck2.default)({ permission: ["function_view"], role: ["test"] }), _index2.default.function.getFunctionPagedList).del('/function/del', (0, _PermissionCheck2.default)({ permission: ["function_del"] }), _index2.default.function.delFuntion).del('/function/batchdel', (0, _PermissionCheck2.default)({ permission: ["function_del"] }), _index2.default.function.delFuntions).post('/function/save', (0, _PermissionCheck2.default)({ permission: ["function_edit"] }), _index2.default.function.saveFuntion).get('/role/pagedlist', (0, _PermissionCheck2.default)({ permission: ["role_view", "role_permission_view", "role_user_view"] }), _index2.default.role.getRolePagedList).del('/role/del', (0, _PermissionCheck2.default)({ permission: ["role_del"] }), _index2.default.role.delRole).del('/role/batchdel', (0, _PermissionCheck2.default)({ permission: ["role_del"] }), _index2.default.role.delRoles).post('/role/save', (0, _PermissionCheck2.default)({ permission: ["role_edit"] }), _index2.default.role.saveRole).post('/role/savepermission', (0, _PermissionCheck2.default)({ permission: ["role_permission_edit"] }), _index2.default.role.savePermission).get('/user/pagedlist', (0, _PermissionCheck2.default)({ permission: ["user_view", "user_role_view"] }), _index2.default.user.getUserPagedList).get('/user/info', _index2.default.user.getUserInfo).del('/user/del', (0, _PermissionCheck2.default)({ permission: ["user_del"] }), _index2.default.user.delUser).del('/user/batchdel', (0, _PermissionCheck2.default)({ permission: ["user_del"] }), _index2.default.user.delUsers).post('/user/save', (0, _PermissionCheck2.default)({ permission: ["user_edit"] }), _index2.default.user.saveUser).post('/user/editroleuser', (0, _PermissionCheck2.default)({ permission: ["role_user_edit", "user_role_edit"] }), _index2.default.user.editRoleUser).get('/requestlog/pagedlist', _index2.default.requestlog.getRequestLogPagedList).get('/post/pagedlist', (0, _PermissionCheck2.default)({ permission: ["post_view"] }), _index2.default.post.getPostPagedList).get('/post/top', _index2.default.post.getTopPost).get('/post/:id', _index2.default.post.getPost).post('/post/save', (0, _PermissionCheck2.default)({ permission: ["post_edit"] }), _index2.default.post.savePost).post('/resetdb', _index2.default.system.resetDb).all('/upload', _index2.default.upload.default).get('/api/:name', _index2.default.api.Get).post('/api/:name', _index2.default.api.Post).put('/api/:name', _index2.default.api.Put).del('/api/:name', _index2.default.api.Delect);

module.exports = router;