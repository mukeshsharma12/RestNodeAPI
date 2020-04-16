import Sequelize from 'sequelize';
import sequelize from '../../config/database';

const getGroupInfo = async (where) => {
  var group = Promise.resolve(await sequelize.query(`SELECT * FROM groups WHERE ${where} `, { type: Sequelize.QueryTypes.SELECT }));
  return group;
};

async function addGroup(insert_qry, roles,callback) {
  var insert_group = Promise.resolve(await sequelize.query(`INSERT INTO groups SET
  ${insert_qry} `, { type: Sequelize.QueryTypes.INSERT }));
  if (insert_group._rejectionHandler0.length === 0)
  callback(insert_group._rejectionHandler0);
  else {
    var i = 1;
    roles.forEach(async function (element) {
      var groupRole = `role_id=${element},group_id=${insert_group._rejectionHandler0[0]}`
      var group_role = Promise.resolve(await sequelize.query(`INSERT INTO groups_roles SET
    ${groupRole} `, { type: Sequelize.QueryTypes.INSERT }));
      if (roles.length == i)
       callback(group_role._rejectionHandler0[0]);

      i++;
    });

  }

}

const groupUpdateDetails = async (update_arr, where) => {
  var updateGroup = Promise.resolve(await sequelize.query(`UPDATE groups SET
  ${update_arr} WHERE ${where} `, { type: Sequelize.QueryTypes.UPDATE }));
  return updateGroup;
};

async function checkGroupAlreadyExists(where) {
  var groupData = Promise.resolve(await sequelize.query(`SELECT count(g.id) as group_counts 
  FROM groups g 
  WHERE ${where} `, { type: Sequelize.QueryTypes.SELECT }));
  if (groupData._rejectionHandler0[0].group_counts > 0)
    return groupData._rejectionHandler0[0].group_counts;
  else
    return 0;
}



module.exports = {
  getGroupInfo: getGroupInfo,
  addGroup: addGroup,
  checkGroupAlreadyExists: checkGroupAlreadyExists,
  groupUpdateDetails: groupUpdateDetails,
}