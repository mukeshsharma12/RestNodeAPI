import express from 'express';
const router = express.Router();
import userCtrl from '../api/controller/user.controller';
import groupCtrl from '../api/controller/group.controller';
import roleCtrl from '../api/controller/role.controller';
import eventCategoryCtrl from '../api/controller/eventCategory.controller';

// user 
router.route('/opr-web/admin/rest/10.01/user_object_list').post(userCtrl.registerUser);
router.route('/opr-web/admin/rest/10.01/user_object_list').put(userCtrl.updateUser);
router.route('/opr-web/admin/rest/10.01/time_zone_list').get(userCtrl.getTimezone);
router.route('/opr-web/admin/rest/10.01/user_object_list').get(userCtrl.getUserInfo);
router.route('/opr-web/admin/rest/10.01/user_object_list/:user_id').get(userCtrl.getUserInfo);

// group
router.route('/opr-web/admin/rest/10.01/user_group_list').get(groupCtrl.getGroupInfo);
router.route('/opr-web/admin/rest/10.01/user_group_list/:group_id').get(groupCtrl.getGroupInfo);
router.route('/opr-web/admin/rest/10.01/user_group_list').post(groupCtrl.addGroup);
router.route('/opr-web/admin/rest/10.01/user_group_list').put(groupCtrl.updateGroup);

// role
router.route('/opr-web/admin/rest/10.01/role_list').post(roleCtrl.addRole);
router.route('/opr-web/admin/rest/10.01/role_list').put(roleCtrl.updateRole);
router.route('/opr-web/admin/rest/10.01/role_list').get(roleCtrl.getRoleInfo);
router.route('/opr-web/admin/rest/10.01/role_list/:role_id').get(roleCtrl.getRoleInfo);
router.route('/opr-web/admin/rest/10.01/role_list/user/:user_id').get(roleCtrl.getUserRoleById);
router.route('/opr-web/admin/rest/10.01/role_list/user_group/:group_id').get(roleCtrl.getGroupRoleById);

router.route('/opr-web/admin/rest/10.01/auth_resource_list').post(roleCtrl.addRoleResources);
router.route('/opr-web/admin/rest/10.01/auth_resource_list/:role_id').get(roleCtrl.getRoleResorceInfo);

// event category
router.route('/opr-web/admin/rest/10.01/event_category_list').post(eventCategoryCtrl.addEventCategory);
router.route('/opr-web/admin/rest/10.01/event_category_list').get(eventCategoryCtrl.getEventCategoryInfo);
router.route('/opr-web/admin/rest/10.01/event_category_list/:event_id').get(eventCategoryCtrl.getEventCategoryInfo);

module.exports = router;
