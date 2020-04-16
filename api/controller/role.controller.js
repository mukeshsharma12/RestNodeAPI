import roleModel from '../model/role.model';

async function getRoleInfo(req, res) {
    var where = '';
    console.log(req.params.role_id)
    if (req.params.role_id != undefined && req.params.role_id != null && req.params.role_id != "") {
        where += `id=${req.params.role_id} AND `;
    }
    where += `status=1 AND is_deleted=0`;
    const role = await roleModel.getRoleInfo(where);
    if (role.length === 0) {
        res.json({ 'status': 'failed', 'message': 'Role not find' });
        res.end();
    } else {
        res.json({ 'status': 'success', 'roles': role });
        res.end();
    }
}

async function addRole(req, res) {
    var role = req.body.role;
    var insert_arr = '';
    var where = `r.role='${role}' AND r.status='1' AND r.is_deleted='0'`;
    var exists_role = await roleModel.checkRoleAlreadyExists(where);
    if (exists_role > 0) {
        res.json({ 'status': 'failed', 'message': 'Role is already exist' });
        res.end();
        return;
    }
    insert_arr += `role='${role}'`;
    var role = await roleModel.addRole(insert_arr);

    if (role > 0) {
        res.json({ 'status': 'success', 'message': "Role added successfuly ", 'data': role });
    } else {
        res.json({ 'status': 'failed', 'message': 'Could not inserted!' });
    }
    res.end();
}

async function updateRole(req, res) {
    var role = req.body.role;
    var role_id = req.body.role_id;
    var status = req.body.status;
    var update_arr = '';
  
    update_arr += `role='${role}',
                    status='${status}',
                    modified_on=CURRENT_TIMESTAMP`;
    var where = '';
    where += `id=${role_id}`
    var role = await roleModel.roleUpdateDetails(update_arr, where);

    if (role) {
        res.json({ 'status': 'success', 'message': "Role updated successfuly "});
    } else {
        res.json({ 'status': 'failed', 'message': 'Could not updated!' });
    }
    res.end();
}

async function getUserRoleById(req, res) {
    var where = '';
        where += `ur.id=${req.params.user_id} `;
    const userRole = await roleModel.getUserRoles(where);
    if (userRole.length === 0) {
        res.json({ 'status': 'failed', 'message': 'User roles not find' });
        res.end();
        return;
    } else {
        res.json({ 'status': 'success', 'userRole': userRole });
        res.end();
    }
}

async function getGroupRoleById(req, res) {
    var where = '';
        where += `gr.id=${req.params.group_id} `;
    const groupRole = await roleModel.getGroupRoles(where);
    if (groupRole.length === 0) {
        res.json({ 'status': 'failed', 'message': 'Group roles not find' });
        res.end();
    } else {
        res.json({ 'status': 'success', 'groupRole': groupRole });
        res.end();
    }
}

async function addRoleResources(req, res) {
    var role_id = req.body.role_id;
    var resources_id = req.body.resources_id;
    var insert_arr = '';
    var where = `rr.role_id='${role_id}' AND rr.resources_id='${resources_id}'`;
    var exists_role_resource = await roleModel.checkRoleResourcesExists(where);
    if (exists_role_resource > 0) {
        res.json({ 'status': 'failed', 'message': 'Resources already exist with in role' });
        res.end();
        return;
    }
    insert_arr += `role_id='${role_id}',resources_id='${resources_id}'`;
    var roleResource = await roleModel.addRoleResources(insert_arr);

    if (roleResource > 0) {
        res.json({ 'status': 'success', 'message': "Role resource added successfuly ", 'data': roleResource });
    } else {
        res.json({ 'status': 'failed', 'message': 'Could not inserted!' });
    }
    res.end();
}

async function getRoleResorceInfo(req, res) {
    var where = '';
    if (req.params.role_id != undefined && req.params.role_id != null && req.params.role_id != "") {
        where += `rr.role_id=${req.params.role_id}`;
    }
    const roleResource = await roleModel.getRoleResorceInfo(where);
    if (roleResource.length === 0) {
        res.json({ 'status': 'failed', 'message': 'Role Resource not find' });
        res.end();
    } else {
        res.json({ 'status': 'success', 'roleResource': roleResource });
        res.end();
    }
}

module.exports = {
    getRoleInfo: getRoleInfo,
    addRole: addRole,
    updateRole: updateRole,
    getUserRoleById:getUserRoleById,
    getGroupRoleById:getGroupRoleById,
    addRoleResources:addRoleResources,
    getRoleResorceInfo:getRoleResorceInfo
}
