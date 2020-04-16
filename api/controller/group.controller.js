import groupModel from '../model/group.model';

async function getGroupInfo(req, res) {
    var where = '';
    if (req.params.group_id != undefined && req.params.group_id != null && req.params.group_id != "") {
        where += `id=${req.params.group_id} AND `;
    }
    where += `status=1 AND is_deleted=0`;
    const group = await groupModel.getGroupInfo(where);
    if (group.length === 0) {
        res.json({ 'status': 'failed', 'message': 'Group not find' });
        res.end();
    } else {
        res.json({ 'status': 'success', 'groups': group });
        res.end();
    }
}

async function addGroup(req, res) {
    var group_nm = req.body.name;
    var description = req.body.description;
    var roles = req.body.roles;
    var insert_arr = '';
    var where = `g.	group_nm='${group_nm}' AND g.status='1' AND g.is_deleted='0'`;
    var exists_group = await groupModel.checkGroupAlreadyExists(where);
    if (exists_group > 0) {
        res.json({ 'status': 'failed', 'message': 'Group is already exist' });
        res.end();
        return;
    }
    insert_arr += `	group_nm='${group_nm}',
                  description='${description}'`;
    groupModel.addGroup(insert_arr, roles, (data) => {
        if (data) {
            res.json({ 'status': 'success', 'message': "Group added successfuly ", 'data': data });
        } else {
            res.json({ 'status': 'failed', 'message': 'Could not inserted!' });
        }
        res.end();
    });

}

async function updateGroup(req, res) {
    var group_nm = req.body.name;
    var description = req.body.description;
    var group_id = req.body.group_id;
    var status = req.body.status;
    var deleted = req.body.deleted;
    var update_arr = '';
  
    update_arr += `group_nm='${group_nm}',
                    description='${description}',
                    status='${status}',
                    is_deleted='${deleted}',
                    modified_on=CURRENT_TIMESTAMP`;
    var where = '';
    
    where += `id=${group_id}`
    var group = await groupModel.groupUpdateDetails(update_arr, where);

    if (group) {
        res.json({ 'status': 'success', 'message': "Group updated successfuly"});
    } else {
        res.json({ 'status': 'failed', 'message': 'Could not updated!' });
    }
    res.end();
}


module.exports = {
    getGroupInfo: getGroupInfo,
    addGroup: addGroup,
    updateGroup: updateGroup
}
