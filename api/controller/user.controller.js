import userModel from '../model/user.model';

async function getUserInfo(req, res) {
    var where = '';
    if (req.params.user_id != undefined && req.params.user_id != null && req.params.user_id != "") {
        where += `id=${req.params.user_id} AND `;
    }
    where+=`status=1 AND is_deleted=0`;
    const user = await userModel.getUserInfo(where);
    if (user.length === 0) {
        res.json({ 'status': 'failed', 'message': 'User not find' });
        res.end();
    } else {
        res.json({ 'status': 'success', 'users': user });
        res.end();
    }
}


async function registerUser(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var timezone_id = req.body.timezone_id;
    var role=req.body.roles;
    var insert_arr = '';
    var where = `u.email='${email}' AND u.status='1'`
    var exists_user = await userModel.checkUserAlreadyExists(where);
    if (exists_user > 0) {
        res.json({ 'status': 'failed', 'message': 'User is already exist with this email id.' });
        res.end();
        return;
    }
    insert_arr += `name='${name}',
                    email='${email}',
                    timezone_id='${timezone_id}'`;
   userModel.registerUser(insert_arr,role, (data)=>{
        if (data) {
            res.json({ 'status': 'success', 'message': "User added successfuly ", 'data': data });
        } else {
            res.json({ 'status': 'failed', 'message': 'Could not inserted!' });
        }
        res.end();
    }); 
  
}

async function updateUser(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var timezone_id = req.body.timezone_id;
    var user_id = req.body.user_id;
    var status = req.body.status;
    var deleted = req.body.deleted;
    var update_arr = '';
    update_arr += `name='${name}',
                    email='${email}',
                    timezone_id='${timezone_id}',
                    status='${status}',
                    is_deleted='${deleted}',
                    modified_on=CURRENT_TIMESTAMP`;
    var where = '';
    where += `id=${user_id}`
    var user = await userModel.userUpdateDetails(update_arr, where);

    if (user) {
        res.json({ 'status': 'success', 'message': "User updated successfuly "});
    } else {
        res.json({ 'status': 'failed', 'message': 'Could not updated!' });
    }
    res.end();
}

async function getTimezone(req,res){
    const timezone = await userModel.getTimezone();
    if (timezone.length === 0) {
        res.json({ 'status': 'failed', 'message': 'Timezone not find' });
        res.end();
    } else {
        res.json({ 'status': 'success', 'timezones': timezone });
        res.end();
    }
}


module.exports = {
    getUserInfo: getUserInfo,
    registerUser: registerUser,
    updateUser: updateUser,
    getTimezone:getTimezone
}
