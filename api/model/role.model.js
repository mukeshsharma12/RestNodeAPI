import Sequelize from 'sequelize';
import sequelize from '../../config/database';

const getRoleInfo = async (where) => {
  var role = Promise.resolve(await sequelize.query(`SELECT * FROM roles WHERE ${where} `, { type: Sequelize.QueryTypes.SELECT }));
  return role;
};

async function addRole(insert_qry) {
  var insert_role = Promise.resolve(await sequelize.query(`INSERT INTO roles SET
  ${insert_qry} `, { type: Sequelize.QueryTypes.INSERT }));
  if (insert_role._rejectionHandler0.length === 0)
    return insert_role._rejectionHandler0;
  else
    return insert_role._rejectionHandler0[0];
}

const roleUpdateDetails = async (update_arr, where) => {
  var updateRole = Promise.resolve(await sequelize.query(`UPDATE roles SET
  ${update_arr} WHERE ${where} `, { type: Sequelize.QueryTypes.UPDATE }));
  return updateRole;
};

async function checkRoleAlreadyExists(where) {
  var roleData = Promise.resolve(await sequelize.query(`SELECT count(r.id) as role_counts 
  FROM roles r 
  WHERE ${where} `, { type: Sequelize.QueryTypes.SELECT }));
  if (roleData._rejectionHandler0[0].role_counts > 0)
    return roleData._rejectionHandler0[0].role_counts;
  else
    return 0;
}

const getUserRoles = async (where) => {
  var user = Promise.resolve(await sequelize.query(`SELECT u.id AS user_id,u.name,r.role,r.id AS role_id
     FROM user_role AS ur
    INNER JOIN users AS u ON u.id=ur.user_id 
    INNER JOIN roles AS r ON r.id=ur.role_id
    WHERE ${where} `, { type: Sequelize.QueryTypes.SELECT }));
  return user;
};


const getGroupRoles = async (where) => {
  var user = Promise.resolve(await sequelize.query(`SELECT g.id AS group_id,g.group_nm,r.role,r.id AS role_id
    FROM groups_roles AS gr
    INNER JOIN groups AS g ON g.id=gr.group_id
    INNER JOIN roles AS r ON r.id=gr.role_id
    WHERE ${where} `, { type: Sequelize.QueryTypes.SELECT }));
  return user;
};

async function checkRoleResourcesExists(where) {
  var roleResourceData = Promise.resolve(await sequelize.query(`SELECT count(rr.id) as role_resource_counts 
  FROM resources_role rr 
  WHERE ${where} `, { type: Sequelize.QueryTypes.SELECT }));
  if (roleResourceData._rejectionHandler0[0].role_resource_counts > 0)
    return roleResourceData._rejectionHandler0[0].role_resource_counts;
  else
    return 0;
}

async function addRoleResources(insert_qry) {
  var insert_role_resource = Promise.resolve(await sequelize.query(`INSERT INTO resources_role SET
  ${insert_qry} `, { type: Sequelize.QueryTypes.INSERT }));
  if (insert_role_resource._rejectionHandler0.length === 0)
    return insert_role_resource._rejectionHandler0;
  else
    return insert_role_resource._rejectionHandler0[0];
}


const getRoleResorceInfo = async (where) => {
  var user = Promise.resolve(await sequelize.query(`SELECT re.id AS resource_id,re.resources_nm,r.role,r.id AS role_id
    FROM resources_role AS rr
    INNER JOIN resources AS re ON re.id=rr.resources_id 
    INNER JOIN roles AS r ON r.id=rr.role_id
    WHERE ${where} `, { type: Sequelize.QueryTypes.SELECT }));
  return user;
};


module.exports = {
  getRoleInfo: getRoleInfo,
  addRole: addRole,
  checkRoleAlreadyExists: checkRoleAlreadyExists,
  roleUpdateDetails: roleUpdateDetails,
  getUserRoles: getUserRoles,
  getGroupRoles:getGroupRoles,
  checkRoleResourcesExists:checkRoleResourcesExists,
  addRoleResources:addRoleResources,
  getRoleResorceInfo:getRoleResorceInfo
}